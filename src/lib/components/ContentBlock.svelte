<script lang="ts">
	import type { ContentBlock } from '$lib/data/sections';

	let { block }: { block: ContentBlock } = $props();
</script>

<div class="flex flex-col items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-10">
	{#if block.imageFirst}
		<div class="w-full lg:w-1/2">
			<img
				src={block.image.src}
				alt={block.image.alt}
				title={block.image.title}
				width="523"
				height="326"
				loading="lazy"
				class="overflow-hidden object-cover"
			/>
		</div>
	{/if}

	<div class="flex w-full flex-col gap-4 text-start lg:w-1/2">
		<h3 class="mb-2 text-3xl">{block.title}</h3>
		{#each block.paragraphsHtml as paragraph (paragraph)}
			<!-- İçerik src/lib/data/sections.ts içinde sabit tanımlı; kullanıcı girdisi değil. -->
			<p class="text-text-muted">{@html paragraph}</p>
		{/each}
	</div>

	{#if !block.imageFirst}
		<div class="w-full lg:w-1/2">
			<img
				src={block.image.src}
				alt={block.image.alt}
				title={block.image.title}
				width="523"
				height="326"
				loading="lazy"
				class="overflow-hidden object-cover"
			/>
		</div>
	{/if}
</div>
