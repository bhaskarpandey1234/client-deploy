export type CountryCode =
  | 'US' | 'GB' | 'IE' | 'IN' | 'RS' | 'DE' | 'FR' | 'ES' | 'IT' | 'NL' | 'SE' | 'DK'
  | 'AT' | 'BE' | 'CZ' | 'SK' | 'HU' | 'FI' | 'EE' | 'LV' | 'LT' | 'PL' | 'PT' | 'RO'
  | 'BG' | 'HR' | 'SI' | 'CY' | 'LU' | 'MT'
  | 'CA' | 'ZA' | 'SG' | 'MY' | 'HK' | 'JP' | 'KR' | 'QA' | 'AU' | 'NZ' | 'BA' | 'TW';

export const COUNTRY_META: Record<CountryCode, { name: string; currency: string; flag: string }> = {
  // Europe (EUR countries)
  AT: { name: 'Austria', currency: 'EUR', flag: '🇦🇹' },
  BE: { name: 'Belgium', currency: 'EUR', flag: '🇧🇪' },
  HR: { name: 'Croatia', currency: 'EUR', flag: '🇭🇷' },
  CY: { name: 'Cyprus', currency: 'EUR', flag: '🇨🇾' },
  EE: { name: 'Estonia', currency: 'EUR', flag: '🇪🇪' },
  FI: { name: 'Finland', currency: 'EUR', flag: '🇫🇮' },
  FR: { name: 'France', currency: 'EUR', flag: '🇫🇷' },
  DE: { name: 'Germany', currency: 'EUR', flag: '🇩🇪' },
  IE: { name: 'Ireland', currency: 'EUR', flag: '🇮🇪' },
  IT: { name: 'Italy', currency: 'EUR', flag: '🇮🇹' },
  LV: { name: 'Latvia', currency: 'EUR', flag: '🇱🇻' },
  LT: { name: 'Lithuania', currency: 'EUR', flag: '🇱🇹' },
  LU: { name: 'Luxembourg', currency: 'EUR', flag: '🇱🇺' },
  MT: { name: 'Malta', currency: 'EUR', flag: '🇲🇹' },
  NL: { name: 'Netherlands', currency: 'EUR', flag: '🇳🇱' },
  PT: { name: 'Portugal', currency: 'EUR', flag: '🇵🇹' },
  SK: { name: 'Slovakia', currency: 'EUR', flag: '🇸🇰' },
  SI: { name: 'Slovenia', currency: 'EUR', flag: '🇸🇮' },
  ES: { name: 'Spain', currency: 'EUR', flag: '🇪🇸' },

  // Europe (non-EUR)
  BG: { name: 'Bulgaria', currency: 'BGN', flag: '🇧🇬' },
  CZ: { name: 'Czechia', currency: 'CZK', flag: '🇨🇿' },
  DK: { name: 'Denmark', currency: 'DKK', flag: '🇩🇰' },
  HU: { name: 'Hungary', currency: 'HUF', flag: '🇭🇺' },
  PL: { name: 'Poland', currency: 'PLN', flag: '🇵🇱' },
  RO: { name: 'Romania', currency: 'RON', flag: '🇷🇴' },
  RS: { name: 'Serbia', currency: 'RSD', flag: '🇷🇸' },
  SE: { name: 'Sweden', currency: 'SEK', flag: '🇸🇪' },
  GB: { name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },

  // North America
  US: { name: 'United States', currency: 'USD', flag: '🇺🇸' },
  CA: { name: 'Canada', currency: 'CAD', flag: '🇨🇦' },

  // Asia & Middle East
  IN: { name: 'India', currency: 'INR', flag: '🇮🇳' },
  SG: { name: 'Singapore', currency: 'SGD', flag: '🇸🇬' },
  HK: { name: 'Hong Kong', currency: 'HKD', flag: '🇭🇰' },
  JP: { name: 'Japan', currency: 'JPY', flag: '🇯🇵' },
  KR: { name: 'South Korea', currency: 'KRW', flag: '🇰🇷' },
  QA: { name: 'Qatar', currency: 'QAR', flag: '🇶🇦' },

  // Oceania
  AU: { name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
  NZ: { name: 'New Zealand', currency: 'NZD', flag: '🇳🇿' },

  // Africa & Southeast Asia
  ZA: { name: 'South Africa', currency: 'ZAR', flag: '🇿🇦' },
  MY: { name: 'Malaysia', currency: 'MYR', flag: '🇲🇾' },
  BA: { name: 'Bosnia and Herzegovina', currency: 'BAM', flag: '🇧🇦' },
  TW: { name: 'Taiwan', currency: 'TWD', flag: '🇹🇼' }
};

export const COUNTRY_GROUPS: Record<'EN' | 'SR' | 'RU', CountryCode[]> = {
  EN: [
    'US', 'CA', 'GB', 'AU', 'NZ', // English-speaking
    'IE', 'AT', 'BE', 'HR', 'CY', 'DK', 'EE', 'FI', 'FR', 'DE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES', 'SE', // EU
    'BG', 'CZ', 'HU', 'PL', 'RO', 'IN', 'RS', 'HR', 'SG', 'HK', 'JP', 'KR', 'QA', 'ZA', 'MY', 'BA', 'TW' // Other markets
  ],
  SR: [
    'RS', 'HR', // Serbian/Croatian-speaking
    'DE', 'FR', 'ES', 'IT', 'NL', 'SE', 'DK', 'AT', 'BE', 'CZ', 'SK', 'HU', 'FI', 'EE', 'LV', 'LT', 'PL', 'PT', 'RO', 'BG', 'SI', 'CY', 'LU', 'MT', // EU
    'US', 'GB', 'IN', 'CA', 'AU', 'NZ', 'SG', 'HK', 'JP', 'KR', 'QA', 'ZA', 'MY', 'BA', 'TW' // Expat markets
  ],
  RU: [
    'DE', 'FR', 'ES', 'IT', 'NL', 'SE', 'DK', 'AT', 'BE', 'CZ', 'SK', 'HU', 'FI', 'EE', 'LV', 'LT', 'PL', 'PT', 'RO', 'BG', 'SI', 'CY', 'LU', 'MT', // EU
    'US', 'GB', 'IN', 'RS', 'CA', 'AU', 'NZ', 'SG', 'HK', 'JP', 'KR', 'QA', 'ZA', 'MY', 'BA', 'TW' // Expat markets
  ]
};
