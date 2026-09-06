<script lang="ts">
	import ContentBlock from '$lib/components/ContentBlock.svelte';
	import FaqAccordion from '$lib/components/FaqAccordion.svelte';
	import PasswordGenerator from '$lib/components/PasswordGenerator.svelte';
	import StrengthPillars from '$lib/components/StrengthPillars.svelte';
	import { faq } from '$lib/data/faq';
	import { contentBlocks } from '$lib/data/sections';
	import {
		OG_IMAGE,
		PAGE_DESCRIPTION,
		PAGE_TITLE,
		SITE_URL,
		structuredDataTags
	} from '$lib/data/structuredData';
</script>

<svelte:head>
	<title>{PAGE_TITLE}</title>
	<meta name="description" content={PAGE_DESCRIPTION} />
	<meta
		name="keywords"
		content="şifre oluşturucu, sifre oluşturucu, sifre olusturucu, sifre olustur, güçlü şifre oluşturucu, güvenli şifre oluşturucu, parola oluşturucu"
	/>
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={SITE_URL} />

	<!-- Open Graph -->
	<meta property="og:title" content={PAGE_TITLE} />
	<meta property="og:description" content={PAGE_DESCRIPTION} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="tr_TR" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={PAGE_TITLE} />
	<meta name="twitter:description" content={PAGE_DESCRIPTION} />
	<meta name="twitter:image" content={OG_IMAGE} />

	{@html structuredDataTags()}
</svelte:head>

<div class="flex flex-col items-center justify-center gap-24">
	<main class="w-full">
		<PasswordGenerator />
	</main>

	<section class="w-full">
		<h2 class="text-text-dark mb-8 text-center text-4xl font-medium max-[540px]:text-3xl">
			Bir parolayı güçlü yapan nedir?
		</h2>
		<p class="text-text-muted mb-16 text-center text-lg max-[540px]:text-base">
			Güçlü bir parola, en az 10 karakter uzunluğunda olmalı, büyük ve küçük harfler, <br /> rakamlar
			ve semboller içermeli ve her hesap için benzersiz olmalıdır.
		</p>

		<StrengthPillars />
	</section>

	<section class="mt-16 w-full">
		<h2 class="text-text-dark mb-8 text-center text-4xl font-medium max-[540px]:text-3xl">
			Neden Güçlü Bir Şifre Kullanmalısınız?
		</h2>
		<p class="text-text-muted mb-16 text-center text-lg max-[540px]:text-base">
			Güçlü bir şifre oluşturmak hesaplarınızı korumak için çok önemli bir adımdır. Şifrenizin eşsiz
			olması çok önemlidir.
		</p>

		<div
			class="flex flex-col items-center justify-center gap-20 px-[100px] max-[630px]:px-[20px]"
		>
			{#each contentBlocks as block (block.title)}
				<ContentBlock {block} />
			{/each}
		</div>
	</section>

	<section class="mb-16 w-full">
		<h2 class="text-text-dark mb-8 text-center text-4xl font-medium max-[540px]:text-3xl">
			Şifre Oluşturucu Sıkça Sorulan Sorular
		</h2>

		<FaqAccordion items={faq} />
	</section>
</div>
