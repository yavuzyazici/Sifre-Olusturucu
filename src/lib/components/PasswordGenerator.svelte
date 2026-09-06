<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import {
		DEFAULT_LENGTH,
		DEFAULT_SETS,
		MAX_LENGTH,
		MIN_LENGTH,
		SCRAMBLE_POOL,
		STRENGTH_LABELS,
		calculateSecurityScore,
		generatePassword,
		type CharacterSets
	} from '$lib/password';

	/** .NET sürümüyle aynı anahtarlar: eski ziyaretçilerin tercihleri korunur. */
	const STORAGE_KEYS = {
		useUpper: 'useUpper',
		useLower: 'useLower',
		useNumber: 'useNumber',
		useSpecial: 'useSpecial',
		length: 'passwordLength'
	} as const;

	const characterOptions = [
		{ key: 'useUpper', label: 'ABC', description: 'Büyük harfler' },
		{ key: 'useLower', label: 'abc', description: 'Küçük harfler' },
		{ key: 'useNumber', label: '123', description: 'Rakamlar' },
		{ key: 'useSpecial', label: '#$&', description: 'Semboller' }
	] as const satisfies ReadonlyArray<{
		key: keyof CharacterSets;
		label: string;
		description: string;
	}>;

	/**
	 * app.html içindeki açılış betiği, SvelteKit paketi inmeden önce şifreyi
	 * üretip alana yazar. Burada o değeri devralıyoruz; böylece hidrasyon
	 * sırasında alan bir an boş kalmıyor ve ekranda hiçbir sıçrama olmuyor.
	 */
	const bootstrap = browser ? window.__sifreOnyukleme : undefined;

	let length = $state(bootstrap?.length ?? DEFAULT_LENGTH);
	let sets = $state<CharacterSets>({ ...(bootstrap?.sets ?? DEFAULT_SETS) });
	/** Kopyalanacak gerçek şifre. */
	let password = $state(bootstrap?.password ?? '');
	/** Ekranda görünen metin: animasyon sırasında karıştırılmış hâli. */
	let displayed = $state(bootstrap?.password ?? '');
	let scrambling = $state(false);

	const score = $derived(calculateSecurityScore(length));
	const strengthLabel = $derived(STRENGTH_LABELS[score - 1]);

	// --- Karıştırma ("kriptografi") animasyonu -------------------------------

	const SCRAMBLE_DURATION = 620;
	/** Karıştırılan karakterlerin tazelenme aralığı; her karede değişirse göz yorar. */
	const SCRAMBLE_TICK = 35;

	let animationFrame = 0;
	let safetyTimer = 0;

	function prefersReducedMotion(): boolean {
		return browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	function stopAnimation() {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
			animationFrame = 0;
		}
		if (safetyTimer) {
			clearTimeout(safetyTimer);
			safetyTimer = 0;
		}
		scrambling = false;
	}

	/**
	 * Şifreyi ekrana basar. `animate` true ise karakterler önce rastgele döner,
	 * sonra soldan sağa doğru kademeli olarak yerine oturur.
	 */
	function show(target: string, animate: boolean) {
		stopAnimation();

		// Arka plandaki sekmede requestAnimationFrame durur; animasyonu
		// başlatırsak alanda eski şifre asılı kalır ve kopyalanan değerden
		// ayrışır. Bu durumda doğrudan sonucu yazıyoruz.
		if (!animate || target === '' || prefersReducedMotion() || document.hidden) {
			displayed = target;
			return;
		}

		// rAF beklenmedik biçimde duraksarsa (sekme gizlenir, tarayıcı kısıtlar)
		// gösterilen metin nihai şifreye sabitlenir.
		safetyTimer = window.setTimeout(() => {
			stopAnimation();
			displayed = target;
		}, SCRAMBLE_DURATION + 400);

		const characters = [...target];
		// Her karakterin çözüleceği an: sıralı ilerler, üstüne biraz rastgelelik.
		const revealAt = characters.map(
			(_, index) =>
				(index / characters.length) * SCRAMBLE_DURATION * 0.7 +
				Math.random() * SCRAMBLE_DURATION * 0.3
		);

		const startedAt = performance.now();
		let lastTick = 0;
		let scrambled = characters.map(() => randomScrambleCharacter());
		scrambling = true;

		const step = (now: number) => {
			const elapsed = now - startedAt;

			if (elapsed - lastTick >= SCRAMBLE_TICK) {
				lastTick = elapsed;
				scrambled = scrambled.map(() => randomScrambleCharacter());
			}

			let output = '';
			let finished = true;
			for (let index = 0; index < characters.length; index++) {
				if (elapsed >= revealAt[index]) {
					output += characters[index];
				} else {
					output += scrambled[index];
					finished = false;
				}
			}

			displayed = output;

			if (finished) {
				animationFrame = 0;
				stopAnimation();
				return;
			}
			animationFrame = requestAnimationFrame(step);
		};

		animationFrame = requestAnimationFrame(step);
	}

	function randomScrambleCharacter(): string {
		return SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
	}

	// --- Bildirim ------------------------------------------------------------

	const TOAST_DURATION = 3000;

	/**
	 * Giriş ve çıkış tamamen CSS animasyonuyla yapılıyor, Svelte geçişiyle
	 * değil: geçiş kullanılırsa öğenin DOM'dan kalkması animasyonun bitmesine
	 * bağlanır ve sekme arka plandayken animasyon donduğu için bildirim ekranda
	 * asılı kalır. Burada zamanlayıcı öğeyi koşulsuz kaldırıyor.
	 */
	let toast = $state<{ message: string; kind: 'ok' | 'error'; id: number } | null>(null);
	let toastTimer = 0;
	let toastCounter = 0;

	function showToast(message: string, kind: 'ok' | 'error' = 'ok') {
		if (toastTimer) clearTimeout(toastTimer);
		// id değişince öğe yeniden oluşturulur ve animasyon baştan başlar.
		toast = { message, kind, id: ++toastCounter };
		toastTimer = window.setTimeout(() => {
			toast = null;
			toastTimer = 0;
		}, TOAST_DURATION);
	}

	// --- Ayarlar -------------------------------------------------------------

	function readStoredBoolean(key: string, fallback: boolean): boolean {
		const raw = localStorage.getItem(key);
		return raw === null ? fallback : raw === 'true';
	}

	function loadSettings() {
		try {
			const restored: CharacterSets = {
				useUpper: readStoredBoolean(STORAGE_KEYS.useUpper, DEFAULT_SETS.useUpper),
				useLower: readStoredBoolean(STORAGE_KEYS.useLower, DEFAULT_SETS.useLower),
				useNumber: readStoredBoolean(STORAGE_KEYS.useNumber, DEFAULT_SETS.useNumber),
				useSpecial: readStoredBoolean(STORAGE_KEYS.useSpecial, DEFAULT_SETS.useSpecial)
			};

			// Hiçbir tür seçili değilse şifre üretilemez; varsayılanlara dönülür.
			if (Object.values(restored).some(Boolean)) {
				sets = restored;
			}

			const storedLength = Number(localStorage.getItem(STORAGE_KEYS.length));
			if (Number.isInteger(storedLength) && storedLength >= MIN_LENGTH && storedLength <= MAX_LENGTH) {
				length = storedLength;
			}
		} catch {
			// Gizli sekme veya çerez/depolama engelliyse varsayılanlarla devam edilir.
		}
	}

	function saveSettings() {
		try {
			localStorage.setItem(STORAGE_KEYS.useUpper, String(sets.useUpper));
			localStorage.setItem(STORAGE_KEYS.useLower, String(sets.useLower));
			localStorage.setItem(STORAGE_KEYS.useNumber, String(sets.useNumber));
			localStorage.setItem(STORAGE_KEYS.useSpecial, String(sets.useSpecial));
			localStorage.setItem(STORAGE_KEYS.length, String(length));
		} catch {
			// Depolama kullanılamıyorsa sessizce geç.
		}
	}

	/** Ayarları saklar ve yeni bir şifre üretir. */
	function refresh(animate = true) {
		saveSettings();
		password = generatePassword(length, sets);
		show(password, animate);
	}

	function setLength(next: number) {
		const clamped = Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, next));
		if (clamped === length) return;
		length = clamped;
		// Kaydırıcı sürüklenirken her adımda animasyon başlatmak göz yorar.
		refresh(false);
	}

	function toggleSet(key: keyof CharacterSets, input: HTMLInputElement) {
		const next: CharacterSets = { ...sets, [key]: input.checked };

		// En az bir karakter türü seçili kalmalı.
		if (!Object.values(next).some(Boolean)) {
			input.checked = true;
			return;
		}

		sets = next;
		refresh();
	}

	async function copyPassword() {
		if (!password) return;
		try {
			await navigator.clipboard.writeText(password);
			showToast('Şifre panoya kopyalandı');
		} catch {
			// Pano API'si yalnızca güvenli bağlamda (HTTPS / localhost) çalışır.
			showToast('Kopyalanamadı, şifreyi elle seçebilirsiniz', 'error');
		}
	}

	onMount(() => {
		// Açılış betiği çalışmadıysa (devre dışı bırakılmış veya hata almış)
		// şifreyi burada üretiyoruz.
		if (!bootstrap) {
			loadSettings();
			refresh(false);
		}

		return () => {
			stopAnimation();
			if (toastTimer) clearTimeout(toastTimer);
		};
	});
</script>

<section class="hero fs-container">
	<svg
		class="hero-art"
		viewBox="0 0 1200 600"
		preserveAspectRatio="xMidYMax slice"
		aria-hidden="true"
		focusable="false"
	>
		<defs>
			<radialGradient id="hero-ring-fade" cx="50%" cy="100%" r="80%">
				<stop offset="35%" stop-color="#ffffff" stop-opacity="0" />
				<stop offset="72%" stop-color="#ffffff" stop-opacity="0.16" />
				<stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
			</radialGradient>
			<mask id="hero-ring-mask">
				<rect width="1200" height="600" fill="url(#hero-ring-fade)" />
			</mask>
		</defs>
		<g mask="url(#hero-ring-mask)" fill="none" stroke="#343072" stroke-width="1">
			<circle cx="600" cy="640" r="430" />
			<circle cx="600" cy="640" r="560" />
			<circle cx="600" cy="640" r="690" />
		</g>
	</svg>

	<div
		class="mx-auto flex w-full max-w-[52rem] flex-col items-center px-4 text-center"
		class:is-scrambling={scrambling}
	>
		<span class="hero-badge mb-6">Tarayıcında üretilir, hiçbir yere gönderilmez</span>

		<h1 class="text-primary mb-5 text-5xl font-bold max-[540px]:text-4xl">Şifre Oluşturucu</h1>

		<p class="mb-10 text-lg text-[#343072] max-[540px]:text-base">
			<strong>
				<a
					href="#sifre-olusturucu"
					class="weight-600 hover-effect cursor-pointer text-lg font-bold"
					onclick={() => refresh()}
				>
					Şifre Oluşturucu
				</a>
			</strong>
			ile Hızlı ve Güvenli Şifreler Oluşturun. Hemen şifre oluşturmaya başla
		</p>

		<div class="strength-{score} flex w-full flex-col items-center gap-5">
			<div
				id="sifre-olusturucu"
				class="input-container flex w-full max-w-[47rem] items-center gap-1 rounded-full pe-2 ps-2"
			>
				<input
					type="text"
					id="generated-password"
					aria-label="Oluşturulan şifre"
					class="password-field text-primary min-w-0 flex-1 bg-transparent px-5 py-6 font-medium focus:outline-hidden"
					value={displayed}
					readonly
				/>

				<button
					type="button"
					class="icon-button"
					aria-label="Yeni şifre oluştur"
					title="Yeni şifre oluştur"
					onclick={() => refresh()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
						<path d="M21 3v5h-5" />
						<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
						<path d="M8 16H3v5" />
					</svg>
				</button>

				<button
					type="button"
					class="bg-primary text-white flex-none cursor-pointer rounded-full px-8 py-4 font-medium transition-opacity duration-200 hover:opacity-90 max-[480px]:px-4"
					aria-label="Şifreyi kopyala"
					onclick={copyPassword}
				>
					<span class="block max-[480px]:hidden">Kopyala</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="hidden max-[480px]:block"
						aria-hidden="true"
					>
						<rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
						<path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path>
						<path d="M16 4h2a2 2 0 0 1 2 2v4"></path>
						<path d="M21 14H11"></path>
						<path d="m15 10-4 4 4 4"></path>
					</svg>
				</button>
			</div>

			<p class="strength-label" aria-live="polite">
				Şifre gücü: {strengthLabel}
			</p>

			<div class="flex w-full max-w-[23rem] items-center justify-center gap-4">
				<button
					type="button"
					class="text-bg-primary-dark bg-bg-primary cursor-pointer rounded-md px-2.5 text-2xl font-bold"
					aria-label="Şifre uzunluğunu azalt"
					onclick={() => setLength(length - 1)}
				>
					-
				</button>

				<input
					type="range"
					id="length"
					min={MIN_LENGTH}
					max={MAX_LENGTH}
					value={length}
					class="password-length-element"
					aria-label="Şifre uzunluğu"
					oninput={(event) => setLength(Number(event.currentTarget.value))}
				/>

				<button
					type="button"
					class="text-bg-primary-dark bg-bg-primary cursor-pointer rounded-md px-2.5 text-2xl font-bold"
					aria-label="Şifre uzunluğunu artır"
					onclick={() => setLength(length + 1)}
				>
					+
				</button>

				<span
					id="password-length-display"
					class="mx-2 inline-block w-8 text-center text-sm font-bold text-[#343072]"
				>
					{length}
				</span>
			</div>

			<div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
				{#each characterOptions as option (option.key)}
					<label class="checkbox-label flex items-center justify-center gap-2">
						<input
							type="checkbox"
							class="checkbox"
							name={option.key}
							aria-label={option.description}
							checked={sets[option.key]}
							onchange={(event) => toggleSet(option.key, event.currentTarget)}
						/>
						<span class="checkbox-custom"></span>
						<span class="text-primary text-sm font-semibold">{option.label}</span>
					</label>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Engellemeyen geri bildirim: tıklamaları geçirir, 3 saniyede kaybolur -->
<div class="toast-anchor">
	{#if toast}
		{#key toast.id}
			<div class="toast" class:toast-error={toast.kind === 'error'} role="status" aria-live="polite">
			{#if toast.kind === 'ok'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M20 6 9 17l-5-5" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="M12 8v4" />
					<path d="M12 16h.01" />
				</svg>
			{/if}
				{toast.message}
			</div>
		{/key}
	{/if}
</div>
