import { SITE_URL } from '$lib/data/structuredData';
import type { RequestHandler } from './$types';

export const prerender = true;

const pages: Array<{ path: string; priority: string }> = [{ path: '/', priority: '1.0' }];

export const GET: RequestHandler = async () => {
	const urls = pages
		.map(
			(page) =>
				`\t<url>\n\t\t<loc>${SITE_URL}${page.path}</loc>\n\t\t<priority>${page.priority}</priority>\n\t</url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
};
