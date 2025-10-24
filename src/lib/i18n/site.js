export const LANGS = ['EN', 'RS', 'RU', 'TR', 'PL', 'IT'];

export function canonicalLang(L) {
  const x = String(L || '').toUpperCase();
  // Treat HR as RS (RS/HR combined)
  if (x === 'HR') return 'RS';
  return LANGS.includes(x) ? x : 'EN';
}
