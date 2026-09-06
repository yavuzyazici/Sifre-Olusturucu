<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} — Sayfa bulunamadı | Şifre Oluşturucu</title>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="page-404">
	<div class="four-zero-four-bg"></div>

	<div class="content-box-404">
		<h3 class="text-2xl font-semibold">Kaybolmuşa benziyorsun</h3>
		<p>Aradığın sayfa bulunmuyor!</p>
		<a href="/" class="link-404">Şifre Oluşturucuya ilerle</a>
	</div>
</section>

<style>
	.page-404 {
		padding: 40px 0;
		text-align: center;
	}

	.four-zero-four-bg {
		height: 650px;
		background-image: url('/resimler/404-page.gif');
		background-position: center;
		background-repeat: no-repeat;
	}

	.content-box-404 {
		margin-top: -50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.link-404 {
		color: #fff;
		padding: 10px 20px;
		background: var(--primary);
		margin: 20px 0;
		display: inline-block;
		border-radius: 20px;
	}

	.link-404:hover {
		color: #fff;
		background: var(--text-primary);
	}
</style>
