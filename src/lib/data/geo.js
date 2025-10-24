export const EU_COUNTRIES = [
  { code: 'AT', name: 'Austria', currency: 'EUR' },
  { code: 'BE', name: 'Belgium', currency: 'EUR' },
  { code: 'BG', name: 'Bulgaria', currency: 'BGN' },
  { code: 'HR', name: 'Croatia', currency: 'EUR' },
  { code: 'CY', name: 'Cyprus', currency: 'EUR' },
  { code: 'CZ', name: 'Czechia', currency: 'CZK' },
  { code: 'DK', name: 'Denmark', currency: 'DKK' },
  { code: 'EE', name: 'Estonia', currency: 'EUR' },
  { code: 'FI', name: 'Finland', currency: 'EUR' },
  { code: 'FR', name: 'France', currency: 'EUR' },
  { code: 'DE', name: 'Germany', currency: 'EUR' },
  { code: 'GR', name: 'Greece', currency: 'EUR' },
  { code: 'HU', name: 'Hungary', currency: 'HUF' },
  { code: 'IE', name: 'Ireland', currency: 'EUR' },
  { code: 'IT', name: 'Italy', currency: 'EUR' },
  { code: 'LV', name: 'Latvia', currency: 'EUR' },
  { code: 'LT', name: 'Lithuania', currency: 'EUR' },
  { code: 'LU', name: 'Luxembourg', currency: 'EUR' },
  { code: 'MT', name: 'Malta', currency: 'EUR' },
  { code: 'NL', name: 'Netherlands', currency: 'EUR' },
  { code: 'PL', name: 'Poland', currency: 'PLN' },
  { code: 'PT', name: 'Portugal', currency: 'EUR' },
  { code: 'RO', name: 'Romania', currency: 'RON' },
  { code: 'SK', name: 'Slovakia', currency: 'EUR' },
  { code: 'SI', name: 'Slovenia', currency: 'EUR' },
  { code: 'ES', name: 'Spain', currency: 'EUR' },
  { code: 'SE', name: 'Sweden', currency: 'SEK' }
];

export const EXTRA_COUNTRIES = [
  { code: 'RS', name: 'Serbia', currency: 'RSD' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
  { code: 'US', name: 'United States', currency: 'USD' },
  { code: 'IN', name: 'India', currency: 'INR' }
];

export const ALL_COUNTRIES = [...EU_COUNTRIES, ...EXTRA_COUNTRIES];

export const byCode = (code) =>
  ALL_COUNTRIES.find((c) => c.code === String(code).toUpperCase());

export function countriesForLanguage(lang) {
  const L = String(lang || 'EN').toUpperCase();
  const EU = EU_COUNTRIES.map((c) => c.code);
  const uniq = (arr) => [...new Set(arr)];

  if (L === 'RS' || L === 'SR') return ['RS', 'HR'];
  if (L === 'HR') return ['RS', 'HR'];
  if (L === 'EN') return uniq([...EU, 'IN', 'RS', 'US', 'GB']);
  if (L === 'RU' || L === 'IT' || L === 'PL') return uniq([...EU, 'RS', 'US', 'GB']);

  return uniq([...EU, 'US', 'GB']);
}
