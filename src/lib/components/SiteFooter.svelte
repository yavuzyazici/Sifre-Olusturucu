<script lang="ts">
	import { onMount } from 'svelte';
	import { GITHUB_URL, AUTHOR_NAME, AUTHOR_TITLE, AUTHOR_URL } from '$lib/data/structuredData';

	// Önceden render edilen HTML derleme yılını taşır; tarayıcıda güncel yılla
	// değiştirilir, böylece site yeniden derlenmese de yıl doğru kalır.
	let year = $state(new Date().getFullYear());

	onMount(() => {
		year = new Date().getFullYear();
	});
</script>

<footer class="fs-container bg-bg-primary w-full px-4 py-4">
	<div
		class="mx-auto flex w-full max-w-[70rem] flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center"
	>
		<a href="/" class="text-primary text-sm">
			©{year} sifreolusturucu.com Tüm hakları saklıdır.
		</a>

		<span class="text-primary text-sm">
			Geliştirici:
			<a
				href={AUTHOR_URL}
				title={AUTHOR_TITLE}
				class="hover-effect weight-600 text-sm"
				target="_blank"
				rel="noopener"
			>
				{AUTHOR_NAME}
			</a>
		</span>

		<a
			href={GITHUB_URL}
			title="Şifre Oluşturucu kaynak kodu GitHub'da"
			class="text-primary inline-flex items-center gap-1.5 text-sm"
			target="_blank"
			rel="noopener"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="size-4 shrink-0"
				aria-hidden="true"
			>
				<path
					d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.51 10.42.55.1.75-.24.75-.53v-1.9c-3.06.67-3.71-1.3-3.71-1.3-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.7-1.48-2.45-.28-5.02-1.22-5.02-5.45 0-1.2.43-2.19 1.13-2.96-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13a10.4 10.4 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.76 1.13 2.96 0 4.24-2.58 5.17-5.03 5.44.39.34.75 1.01.75 2.04v3.03c0 .29.2.64.76.53a10.53 10.53 0 0 0 7.5-10.42C23.01 5.24 18.27.5 12 .5Z"
				/>
			</svg>
			GitHub
		</a>
	</div>
</footer>
