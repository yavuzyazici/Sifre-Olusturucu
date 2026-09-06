import { faq } from './faq';

/**
 * Kanonik adres www'ludur: sunucu `sifreolusturucu.com` isteklerini
 * `www.sifreolusturucu.com` adresine 301 ile yönlendiriyor. Kanonik etiketi,
 * og:url ve site haritası yönlendirilen değil yönlendirilen hedefi
 * göstermelidir, yoksa her kanonik adres bir 301 üzerinden geçer.
 */
export const SITE_URL = 'https://www.sifreolusturucu.com';
export const OG_IMAGE = `${SITE_URL}/resimler/sifre-olusturucu-og.png`;

export const GITHUB_URL = 'https://github.com/yavuzyazici/Sifre-Olusturucu';
export const AUTHOR_NAME = 'Yavuz Selim Yazıcı';
export const AUTHOR_TITLE = 'Yavuz Yazıcı';
export const AUTHOR_URL = 'https://www.yavuzyazici.com';

export const PAGE_TITLE = 'Şifre Oluşturucu, Güvenli ve Güvenilir Parola Oluştur';
export const PAGE_DESCRIPTION =
	'Şifre Oluşturucu uygulamamızı kullanarak en güçlü şifre oluşturun! Ücretsiz şifre oluşturucumuzla güvenli ve karmaşık şifre oluşturun.';

const softwareApplication = {
	'@context': 'https://schema.org',
	'@type': 'SoftwareApplication',
	name: 'Şifre Oluşturucu',
	operatingSystem: 'All',
	applicationCategory: 'Utility',
	offers: {
		'@type': 'Offer',
		price: '0.00',
		priceCurrency: 'USD'
	}
};

const webPage = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	name: 'Şifre Oluşturucu',
	description:
		'Rastgele Şifre Oluşturucu, çevrimiçi hesaplarınızı güvende tutmak için güçlü ve güvenli şifreler oluşturun.',
	author: {
		'@type': 'Person',
		name: AUTHOR_NAME,
		url: AUTHOR_URL
	},
	publisher: {
		'@type': 'Organization',
		name: 'Şifre Oluşturucu'
	}
};

const organization = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'Şifre Oluşturucu',
	url: SITE_URL,
	logo: `${SITE_URL}/sifre-olusturucu.svg`,
	sameAs: [GITHUB_URL, AUTHOR_URL]
};

const faqPage = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: faq.map((item) => ({
		'@type': 'Question',
		name: item.question,
		acceptedAnswer: {
			'@type': 'Answer',
			text: item.answer
		}
	}))
};

/**
 * schema.org verisini `<script type="application/ld+json">` etiketleri olarak
 * üretir. Svelte, `<svelte:head>` içinde doğrudan script etiketi kabul etmediği
 * için sonuç {@html} ile basılır; `<` kaçışlanarak etiketin erken kapanması
 * engellenir.
 */
export function structuredDataTags(): string {
	return [softwareApplication, webPage, organization, faqPage]
		.map(
			(schema) =>
				`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}<\/script>`
		)
		.join('');
}
