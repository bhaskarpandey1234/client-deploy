import { writable } from 'svelte/store';

export const LANGS = ['EN', 'RS', 'RU', 'TR', 'PL', 'IT'];
export const htmlLang = { 'EN': 'en', 'RS': 'sr', 'RU': 'ru', 'TR': 'tr', 'PL': 'pl', 'IT': 'it' };
const KEY = 'asteria_lang';

function readInitial() {
  if (typeof window === 'undefined') return 'EN';
  const fromStorage = localStorage.getItem(KEY);
  return LANGS.includes(fromStorage) ? fromStorage : 'EN';
}

export const lang = writable(readInitial());

export function setLang(next, { persist = true } = {}) {
  const L = (next || 'EN').toUpperCase();
  const val = LANGS.includes(L) ? L : 'EN';
  lang.set(val);
  if (typeof window !== 'undefined') {
    if (persist) localStorage.setItem(KEY, val);
    document.documentElement.setAttribute('lang', htmlLang[val] || 'en');
  }
}

function read() {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(sessionStorage.getItem('asteria_checkout') || 'null');
  } catch {
    return null;
  }
}

export const checkout = writable(
  read() || { lang: 'EN', country: null, price: null }
);

checkout.subscribe((val) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('asteria_checkout', JSON.stringify(val));
  }
});
