import type { CharacterSets } from '$lib/password';

// Bkz. https://svelte.dev/docs/kit/types#app
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		/**
		 * app.html içindeki açılış betiğinin ürettiği ilk şifre ve ayarlar.
		 * Betik çalışmadıysa tanımsızdır.
		 */
		__sifreOnyukleme?: {
			password: string;
			length: number;
			sets: CharacterSets;
			score: number;
		};
	}
}

export {};
