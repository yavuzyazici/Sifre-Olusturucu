<script lang="ts">
	import type { FaqItem } from '$lib/data/faq';

	let { items }: { items: FaqItem[] } = $props();

	// .NET sürümünde bütün cevaplar açık geliyordu (içerik arama motorlarına ve
	// JavaScript'siz ziyaretçilere görünür kalsın diye). Aynı davranış korundu:
	// varsayılan açık, yalnızca kullanıcının kapattıkları burada tutulur.
	let toggled = $state<Record<number, boolean>>({});

	const isOpen = (index: number) => toggled[index] ?? true;
</script>

<div class="flex flex-col items-center justify-center gap-4 px-[100px] max-[630px]:px-[20px]">
	{#each items as item, index (item.question)}
		<div class="border-bg-primary w-full rounded-md border">
			<h3 class="text-xl font-semibold">
				<button
					type="button"
					class="accordion-header text-text-primary flex w-full cursor-pointer items-center justify-between gap-4 p-8 text-start"
					class:accordion-active={isOpen(index)}
					aria-expanded={isOpen(index)}
					aria-controls="faq-answer-{index}"
					onclick={() => (toggled[index] = !isOpen(index))}
				>
					{item.question}
					<img
						src="/resimler/arrow-down.svg"
						width="24"
						height="24"
						loading="lazy"
						class="accordion-icon size-6 shrink-0"
						class:accordion-active={isOpen(index)}
						alt=""
					/>
				</button>
			</h3>

			<div
				id="faq-answer-{index}"
				class="accordion-content"
				class:accordion-active={isOpen(index)}
			>
				<p>{item.answer}</p>
			</div>
		</div>
	{/each}
</div>
