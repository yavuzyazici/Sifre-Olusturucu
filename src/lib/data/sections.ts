/** "Neden Güçlü Bir Şifre Kullanmalısınız?" bölümündeki içerik blokları. */

export type ContentBlock = {
	title: string;
	/** Statik, proje içinde yazılmış metin. Bağlantı içerebildiği için {@html} ile basılır. */
	paragraphsHtml: string[];
	image: {
		src: string;
		alt: string;
		title?: string;
	};
	/** true ise görsel solda, metin sağda görünür. */
	imageFirst: boolean;
};

export const contentBlocks: ContentBlock[] = [
	{
		title: 'Şifre Uzunluğu: Hedeflerinizi Güvence Altına Alın',
		paragraphsHtml: [
			'Şifrenizin uzunluğu, güvenliğini artıran en önemli faktörlerden biridir. En az 10 karakter uzunluğunda olan şifreler, daha kısa şifrelere göre çok daha güvenlidir. Şifrenizi ne kadar uzun yaparsanız, kırılması o kadar zor olacaktır. Uzun şifreler, özellikle rastgele seçilmiş karakterlerle oluşturulduğunda, güvenliğinizi büyük ölçüde artırır.'
		],
		image: {
			src: '/resimler/sifreni-uzun-tut.webp',
			alt: 'Adam hedeflerini güvende tutmanın gururuyla işaretlediği hedefe bakıyor.'
		},
		imageFirst: false
	},
	{
		title: 'Karmaşıklık: Harflerden Sayılara Her Şeyi Kullanın',
		paragraphsHtml: [
			'Karmaşık şifreler, hem büyük hem de küçük harfleri, rakamları ve sembolleri içermelidir. Bu çeşitlilik, şifrenizi tahmin etmeyi zorlaştırır. Basit kelimeler yerine, rastgele seçilmiş karakterleri kullanmak şifrenizin güvenliğini artırır. Örneğin, "P@ssw0rd123!" gibi bir şifre, sadece "password" kelimesine göre çok daha güvenlidir.'
		],
		image: {
			src: '/resimler/karmasik-sifre-olustur.webp',
			alt: 'Karmaşık Şifreyi Özetleyen Sözlük Tutan bir kadın resmi'
		},
		imageFirst: true
	},
	{
		title: 'Benzersizlik: Her Hesap İçin Farklı Şifre Kullanın',
		paragraphsHtml: [
			'Her hesap için benzersiz şifreler kullanmak, güvenliğinizi artırmanın önemli bir yoludur. Bir şifre bir hesapta kırıldığında, diğer hesaplarınızın da tehlikeye girmemesi için her biri için farklı şifreler kullanmalısınız. Bu, özellikle aynı şifreyi birden fazla hesapta kullanma alışkanlığınız varsa, ciddi güvenlik risklerini azaltır.',
			'Bu işlem hepimizin bildiği gibi bazen yönetmesi zor olabiliyor. Bu gibi durumlar için şifre yönetim uygulamaları kullanabilirsiniz. Örn: <a class="weight-600 italic hover-effect" href="https://passbolt.com" target="_blank" rel="noopener noreferrer">Passbolt</a>, <a class="weight-600 italic hover-effect" href="https://lastpass.com" target="_blank" rel="noopener noreferrer">Lastpass</a>, <a class="weight-600 italic hover-effect" href="https://bitwarden.com/" target="_blank" rel="noopener noreferrer">Bitwarden</a> vb.'
		],
		image: {
			src: '/resimler/her-hesaba-yeni-sifre-olustur.webp',
			alt: 'Kullanıcı şifre oluşturduğu adetini simgeleyen sayılara bakıyor',
			title: 'Güvenlik İçin Her Hesaba Farklı Şifre Oluştur'
		},
		imageFirst: false
	},
	{
		title: 'Anlaşılabilirlik: Şifrenizi Anlamlı Hale Getirin',
		paragraphsHtml: [
			'Şifrenizin kolayca hatırlanabilir olmasına rağmen başkaları tarafından tahmin edilemeyecek şekilde olması önemlidir. Rastgele kelimeler veya anlamsız karakter dizileri yerine, anlamlı fakat tahmin edilmesi zor kelimeler kullanabilirsiniz. Örneğin, "BüyükElma3!" gibi bir şifre hem hatırlanabilir hem de güvenlidir.'
		],
		image: {
			src: '/resimler/anlasilabilir-sifre-olustur.webp',
			alt: 'Genç elinde büyüteçle soru işaretleri anlamlandırmaya çalışıyor.',
			title: 'Anlaşılabilir Şifre Oluşturmak Hatırlanabilir Kılar'
		},
		imageFirst: true
	},
	{
		title: 'Karmaşıklık: Farklı Karakter Tiplerini Kullanın',
		paragraphsHtml: [
			'Şifrenizde büyük ve küçük harflerin yanı sıra rakamlar ve semboller kullanmak, güvenliğini artırmanın en etkili yollarından biridir. Karmaşık şifreler, kırılması çok daha zor olan şifrelerdir. Farklı karakter tiplerini kullanarak, şifrenizin güvenliğini maksimum seviyeye çıkarabilirsiniz.'
		],
		image: {
			src: '/resimler/sifre-olustururken-karmasikliga-dikkat-et.webp',
			alt: 'Kadın karmaşık olan şifreyi temsil eden nesneleri inceliyor.',
			title: 'Şifre Oluştururken Karmaşıklığa Dikkat Et'
		},
		imageFirst: false
	},
	{
		title: 'Güvenli Gezinme: İnternette Güvende Kalın',
		paragraphsHtml: [
			'Güçlü şifreler kullanmak, çevrimiçi hesaplarınızın güvenliğini sağlamak için sadece bir adımdır. Aynı zamanda güvenli bir internet bağlantısı kullanmak, iki faktörlü kimlik doğrulama gibi ek güvenlik önlemlerini kullanmak da önemlidir. İnternette güvenli bir şekilde gezinmek, çevrimiçi varlığınızı korumanın en etkili yollarından biridir.'
		],
		image: {
			src: '/resimler/sifre-olusturucu-ile-guvenli-gezin.webp',
			alt: 'Adam Şifre Oluştur uygulamasını kullanmanın rahatlığıyla keyiflice internette surf yapıyor..',
			title: 'Şifre Oluşturucu Sayesinde Güvenli Şifrelere Sahip Ol'
		},
		imageFirst: true
	}
];
