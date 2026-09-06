/**
 * Şifre üretimi ve güç hesabı.
 *
 * Tarayıcı tarafında çalışır; üretilen hiçbir şifre sunucuya gönderilmez.
 */

export const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const LOWER = 'abcdefghijklmnopqrstuvwxyz';
export const NUMBERS = '0123456789';
export const SPECIAL = '!@#$%^&*()_+~`|}{[]:;?><,./-';

export const MIN_LENGTH = 1;
export const MAX_LENGTH = 50;
export const DEFAULT_LENGTH = 18;

export type CharacterSets = {
	useUpper: boolean;
	useLower: boolean;
	useNumber: boolean;
	useSpecial: boolean;
};

/** Karıştırma animasyonunda dönen karakterler: seçili türlerden bağımsız. */
export const SCRAMBLE_POOL = UPPER + LOWER + NUMBERS + SPECIAL;

/** Güç seviyelerinin yazılı karşılığı (1–5). */
export const STRENGTH_LABELS = ['Çok zayıf', 'Zayıf', 'Orta', 'Güçlü', 'Çok güçlü'] as const;

export const DEFAULT_SETS: CharacterSets = {
	useUpper: true,
	useLower: true,
	useNumber: true,
	useSpecial: true
};

/** Seçili karakter türlerinden kullanılabilir karakter havuzunu kurar. */
export function characterPool(sets: CharacterSets): string {
	let pool = '';
	if (sets.useUpper) pool += UPPER;
	if (sets.useLower) pool += LOWER;
	if (sets.useNumber) pool += NUMBERS;
	if (sets.useSpecial) pool += SPECIAL;
	return pool;
}

/**
 * [0, max) aralığında kriptografik olarak güvenli bir tam sayı üretir.
 *
 * `crypto.getRandomValues` düzgün dağılmış 32 bitlik sayılar verir; havuz
 * uzunluğu 2^32'yi tam bölmediğinde doğrudan `% max` almak baştaki
 * karakterleri istatistiksel olarak öne çıkarır (modülo sapması). Bunu
 * önlemek için aralığın dışında kalan değerler eleniyor.
 */
function randomIndex(max: number): number {
	const limit = Math.floor(2 ** 32 / max) * max;
	const buffer = new Uint32Array(1);

	let value: number;
	do {
		crypto.getRandomValues(buffer);
		value = buffer[0];
	} while (value >= limit);

	return value % max;
}

/**
 * Verilen uzunlukta rastgele bir şifre üretir.
 * Hiçbir karakter türü seçili değilse boş dize döner.
 */
export function generatePassword(length: number, sets: CharacterSets): string {
	const pool = characterPool(sets);
	if (pool.length === 0 || length <= 0) return '';

	let password = '';
	for (let i = 0; i < length; i++) {
		password += pool[randomIndex(pool.length)];
	}
	return password;
}

/** Şifre uzunluğuna göre 1–5 arası güvenlik puanı. */
export function calculateSecurityScore(length: number): number {
	if (length < 5) return 1;
	if (length <= 7) return 2;
	if (length <= 9) return 3;
	if (length <= 11) return 4;
	return 5;
}
