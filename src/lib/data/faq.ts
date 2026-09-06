/**
 * Sıkça sorulan sorular.
 *
 * Tek kaynak: hem sayfadaki akordiyon hem de schema.org FAQPage yapılandırılmış
 * verisi buradan üretilir. (.NET sürümünde aynı metinler iki ayrı yerde elle
 * yazılıydı ve zamanla birbirinden ayrışmıştı.)
 */

export type FaqItem = {
	question: string;
	answer: string;
};

export const faq: FaqItem[] = [
	{
		question: '8 Karakterli Şifre Nasıl Oluşturulur?',
		answer:
			'8 karakterli bir şifre oluşturmak için, büyük ve küçük harfler, rakamlar ve semboller kullanarak rastgele bir kombinasyon oluşturabilirsiniz. Örnek: "A1b@C2d#"'
	},
	{
		question: '6 Karakterli Şifre Nasıl Oluşturulur?',
		answer:
			'6 karakterli bir şifre oluşturmak için, büyük ve küçük harfler ile rakamları kullanarak karmaşık bir kombinasyon oluşturabilirsiniz. Örnek: "A1b2C3"'
	},
	{
		question: 'En İyi Şifre Nasıl Oluşturulur?',
		answer:
			'En iyi şifreler uzun, karmaşık ve benzersizdir. Büyük ve küçük harfler, rakamlar ve semboller içermelidir. Ayrıca, her hesap için farklı şifreler kullanmanız önerilir. Şifre Oluşturucumuzu kullanarak hemen şimdi üretime başlayabilirsiniz.'
	},
	{
		question: 'Dünyanın En Zor Şifresi Nedir?',
		answer:
			'Dünyanın en zor şifresi, uzun, rastgele ve tahmin edilmesi imkansız bir kombinasyon olmalıdır. Örneğin, 16 karakterden oluşan ve büyük/küçük harfler, rakamlar ve semboller içeren bir şifre çok güçlü kabul edilir. Örnek: "G4t$!k1p&L9m^7sW"'
	},
	{
		question: 'Şifre Nasıl Hazırlanır?',
		answer:
			'Şifre hazırlarken, büyük ve küçük harfler, rakamlar ve semboller kullanarak karmaşık bir kombinasyon oluşturun. Şifrenizin tahmin edilmesi zor ve en az 8-10 karakter uzunluğunda olması önemlidir.'
	},
	{
		question: 'Güvenli Bir Şifre Nasıl Oluşturulur?',
		answer:
			'Güvenli bir şifre oluşturmak için, en az 10 karakter uzunluğunda, büyük ve küçük harfler, rakamlar ve semboller içeren rastgele bir kombinasyon oluşturun. Şifrenizi sık sık değiştirin ve her hesap için benzersiz şifreler kullanın.'
	},
	{
		question: 'Şifre Oluşturucumuzu Kullanmak Güvenli mi?',
		answer:
			'Evet, şifre oluşturucumuzu kullanmak tamamen güvenlidir. Oluşturulan şifreler yalnızca sizin tarafınızdan görülebilir ve güvenliğiniz için kaydedilmez.'
	},
	{
		question: 'Neden Bir Şifre Oluşturucu Kullanmalıyım?',
		answer:
			'Bir şifre oluşturucu, tahmin edilmesi zor ve güvenli şifreler oluşturmanıza yardımcı olur. Bu, çevrimiçi hesaplarınızın güvenliğini artırır ve veri ihlallerine karşı korunmanızı sağlar.'
	},
	{
		question: 'Her Hesabım İçin Özgün Birer Şifre Kullanmam Gerekiyor mu?',
		answer:
			'Evet, her hesabınız için benzersiz şifreler kullanmanız önemlidir. Bu, bir hesabınızın güvenliği ihlal edilse bile diğer hesaplarınızın güvende kalmasını sağlar.'
	},
	{
		question: 'En Kötü 10 Şifre Hangileridir?',
		answer:
			'En kötü şifreler genellikle tahmin edilmesi kolay olanlardır. Örnekler: "123456", "password", "12345678", "qwerty", "abc123", "111111", "letmein", "monkey", "1234", "passw0rd".'
	},
	{
		question: 'En İyi Şifre Oluşturma Aracı Hangisidir?',
		answer:
			'En iyi şifre oluşturma aracı, güvenli ve rastgele şifreler oluşturabilen bir araçtır. Şifre oluşturucumuz, bu gereksinimleri karşılamakta ve kullanıcı dostu bir deneyim sunmaktadır.'
	},
	{
		question: 'Güçlü Bir Şifre İçin Gereklilikler Nelerdir?',
		answer:
			'Güçlü bir şifre, en az 10 karakter uzunluğunda olmalı, büyük ve küçük harfler, rakamlar ve semboller içermelidir. Şifreler ayrıca her hesap için benzersiz olmalıdır.'
	},
	{
		question: 'Nasıl Rastgele Oluşturulmuş Bir Şifre Elde Edebilirim?',
		answer:
			'Şifre oluşturucumuz, rastgele karakterler kullanarak güvenli şifreler oluşturur. Tek yapmanız gereken, istediğiniz şifre uzunluğunu ve karakter türlerini seçmek.'
	},
	{
		question: 'Şifre Oluşturucular Ele Geçirilebilir mi?',
		answer:
			'Güvenli şifre oluşturucular, çevrimiçi olarak şifrelerinizi kaydetmez ve yalnızca sizin tarafınızdan görülebilir. Bu, ele geçirilme riskini minimize eder.'
	},
	{
		question: 'Şifreleri Depolamanın Güvenli Bir Yolu Var mı?',
		answer:
			'Evet, şifre yöneticileri, şifrelerinizi güvenli bir şekilde saklamak için mükemmel bir yoldur. Bu araçlar, tüm şifrelerinizi şifrelenmiş bir biçimde saklar ve yalnızca ana şifrenizle erişilebilir kılar.'
	},
	{
		question: 'Bir Şifreyi Güvenli Yapan Nedir?',
		answer:
			'Güvenli bir şifre, uzun, karmaşık ve tahmin edilmesi zor olmalıdır. Büyük ve küçük harfler, rakamlar ve semboller içermeli ve her hesap için benzersiz olmalıdır.'
	}
];
