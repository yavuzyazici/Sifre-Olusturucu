import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Site tamamen istemci tarafında çalışıyor: şifre tarayıcıda üretiliyor,
		// sunucuda tutulan hiçbir durum yok. Bu yüzden tüm sayfalar önceden
		// render edilip saf HTML/CSS/JS olarak yayınlanıyor.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			// Eşleşmeyen yollar için 404.html üretilir; statik sunucular
			// (IIS, Netlify, Cloudflare Pages, GitHub Pages) bunu otomatik sunar.
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: ['*']
		}
	}
};

export default config;
