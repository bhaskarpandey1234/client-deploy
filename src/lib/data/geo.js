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
  { code: 'IN', name: 'India', currency: 'INR' },
  // New markets
  { code: 'CA', name: 'Canada', currency: 'CAD' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
  { code: 'SG', name: 'Singapore', currency: 'SGD' },
  { code: 'MY', name: 'Malaysia', currency: 'MYR' },
  { code: 'HK', name: 'Hong Kong', currency: 'HKD' },
  { code: 'JP', name: 'Japan', currency: 'JPY' },
  { code: 'KR', name: 'South Korea', currency: 'KRW' },
  { code: 'QA', name: 'Qatar', currency: 'QAR' },
  { code: 'AU', name: 'Australia', currency: 'AUD' },
  { code: 'NZ', name: 'New Zealand', currency: 'NZD' },
  { code: 'BA', name: 'Bosnia and Herzegovina', currency: 'BAM' },
  { code: 'TW', name: 'Taiwan', currency: 'TWD' }
];

export const ALL_COUNTRIES = [...EU_COUNTRIES, ...EXTRA_COUNTRIES];

/** @type {(code: string) => typeof ALL_COUNTRIES[number] | undefined} */
export const byCode = (code) =>
  ALL_COUNTRIES.find((c) => c.code === String(code).toUpperCase());

/** @type {(lang: string) => string[]} */
export function countriesForLanguage(lang) {
  const L = String(lang || 'EN').toUpperCase();
  const EU = EU_COUNTRIES.map((c) => c.code);
  /** @type {(arr: string[]) => string[]} */
  const uniq = (arr) => [...new Set(arr)];
  
  // New market countries
  const NEW_MARKETS = ['CA', 'ZA', 'SG', 'MY', 'HK', 'JP', 'KR', 'QA', 'AU', 'NZ', 'BA', 'TW'];

  if (L === 'RS' || L === 'SR') return ['RS', 'HR'];
  if (L === 'HR') return ['RS', 'HR'];
  if (L === 'EN') return uniq([...EU, 'IN', 'RS', 'US', 'GB', ...NEW_MARKETS]);
  if (L === 'RU' || L === 'IT' || L === 'PL') return uniq([...EU, 'RS', 'US', 'GB', ...NEW_MARKETS]);

  return uniq([...EU, 'US', 'GB', ...NEW_MARKETS]);
}
