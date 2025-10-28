import { ALL_COUNTRIES } from './geo.js';

/** =========================
 *  PRICING MODEL (edit me)
 *  =========================
 *  Type 1 = One-time Reading (no chat)
 *  Type 2 = One-time Reading + 10-min chat
 *  Type 3 = Subscription (Monthly/Annual), includes 15h chat
 *
 *  Replace these starter numbers with your real prices.
 */

// Base one-time reading price per currency (Type 1)
export const ONE_TIME_BASE = {
  EUR: 19,  GBP: 17,  USD: 19,  RSD: 1590, INR: 799,
  BGN: 37,  CZK: 469, DKK: 145, HUF: 7490, PLN: 85, RON: 95, SEK: 219,
  // New currencies
  CAD: 25, ZAR: 349, SGD: 27, MYR: 89, HKD: 149, JPY: 2799, KRW: 24900, QAR: 69, AUD: 29, NZD: 31,
  BAM: 37, TWD: 599
};

// 10-min chat add-on (added to base for Type 2)
export const CHAT_ADDON_10MIN = {
  EUR: 6,   GBP: 5,   USD: 6,   RSD: 490,  INR: 249,
  BGN: 11,  CZK: 149, DKK: 45,  HUF: 2490, PLN: 27, RON: 29, SEK: 69,
  // New currencies
  CAD: 8, ZAR: 109, SGD: 8, MYR: 28, HKD: 47, JPY: 899, KRW: 7990, QAR: 22, AUD: 9, NZD: 10,
  BAM: 11, TWD: 189
};

// Subscription includes 15 hours chat
export const SUBSCRIPTION = {
  INCLUDED_CHAT_HOURS: 15,
  MONTHLY: {
    EUR: 29,  GBP: 25,  USD: 29,  RSD: 2990, INR: 1499,
    BGN: 55,  CZK: 699, DKK: 215, HUF: 10990, PLN: 129, RON: 139, SEK: 329,
    // New currencies
    CAD: 38, ZAR: 549, SGD: 41, MYR: 139, HKD: 229, JPY: 4299, KRW: 38900, QAR: 107, AUD: 44, NZD: 47,
    BAM: 55, TWD: 929
  },
  ANNUAL: {
    EUR: 290,  GBP: 249,  USD: 290,  RSD: 29990, INR: 14999,
    BGN: 550,  CZK: 6990, DKK: 2150, HUF: 109900, PLN: 1290, RON: 1390, SEK: 3290,
    // New currencies
    CAD: 380, ZAR: 5490, SGD: 410, MYR: 1390, HKD: 2290, JPY: 42990, KRW: 389000, QAR: 1070, AUD: 440, NZD: 470,
    BAM: 550, TWD: 9290
  }
};

// Optional: country-specific overrides (by country code)
export const COUNTRY_PRICE_OVERRIDE = {
  // Example:
  // US: { oneTimeBase: 21, chatAddon: 7, monthly: 31, annual: 310 }
};

// PAYMENT LINKS (Stripe or PSP)
// For each plan variant, you can set country-specific links or per-currency fallbacks.
// Replace '#' with live links (or keep # while integrating).
export const PAYMENT_LINKS = {
  ONE_TIME: {
    // Type 2 (with chat)
    WITH_CHAT: {
      BY_COUNTRY: {
        // US: 'https://buy.stripe.com/your-us-one-time-chat',
      },
      BY_CURRENCY: {
        EUR: '#', GBP: '#', USD: '#', RSD: '#', INR: '#',
        BGN: '#', CZK: '#', DKK: '#', HUF: '#', PLN: '#', RON: '#', SEK: '#',
        CAD: '#', ZAR: '#', SGD: '#', MYR: '#', HKD: '#', JPY: '#', KRW: '#', QAR: '#', AUD: '#', NZD: '#',
        BAM: '#', TWD: '#'
      }
    },
    // Type 1 (no chat)
    NO_CHAT: {
      BY_COUNTRY: {
        // US: 'https://buy.stripe.com/your-us-one-time-nochat',
      },
      BY_CURRENCY: {
        EUR: '#', GBP: '#', USD: '#', RSD: '#', INR: '#',
        BGN: '#', CZK: '#', DKK: '#', HUF: '#', PLN: '#', RON: '#', SEK: '#',
        CAD: '#', ZAR: '#', SGD: '#', MYR: '#', HKD: '#', JPY: '#', KRW: '#', QAR: '#', AUD: '#', NZD: '#',
        BAM: '#', TWD: '#'
      }
    }
  },
  SUBSCRIPTION: {
    MONTHLY: {
      BY_COUNTRY: {
        // US: 'https://buy.stripe.com/your-us-sub-monthly',
      },
      BY_CURRENCY: {
        EUR: '#', GBP: '#', USD: '#', RSD: '#', INR: '#',
        BGN: '#', CZK: '#', DKK: '#', HUF: '#', PLN: '#', RON: '#', SEK: '#',
        CAD: '#', ZAR: '#', SGD: '#', MYR: '#', HKD: '#', JPY: '#', KRW: '#', QAR: '#', AUD: '#', NZD: '#',
        BAM: '#', TWD: '#'
      }
    },
    ANNUAL: {
      BY_COUNTRY: {
        // US: 'https://buy.stripe.com/your-us-sub-annual',
      },
      BY_CURRENCY: {
        EUR: '#', GBP: '#', USD: '#', RSD: '#', INR: '#',
        BGN: '#', CZK: '#', DKK: '#', HUF: '#', PLN: '#', RON: '#', SEK: '#',
        CAD: '#', ZAR: '#', SGD: '#', MYR: '#', HKD: '#', JPY: '#', KRW: '#', QAR: '#', AUD: '#', NZD: '#',
        BAM: '#', TWD: '#'
      }
    }
  }
};

/* ===== Helpers ===== */

export function currencyForCountry(code: string) {
  const c = ALL_COUNTRIES.find((x) => x.code === code);
  return c?.currency || null;
}

export function countryOverride(code: string) {
  return COUNTRY_PRICE_OVERRIDE[code] || null;
}

export function oneTimePrice(code: string, { includeChat = true } = {}) {
  const curr = currencyForCountry(code);
  if (!curr) return null;

  const ov = countryOverride(code);
  const base = ov?.oneTimeBase ?? ONE_TIME_BASE[curr as keyof typeof ONE_TIME_BASE];
  const addon = ov?.chatAddon ?? CHAT_ADDON_10MIN[curr as keyof typeof CHAT_ADDON_10MIN];
  if (base == null) return null;

  const amount = includeChat ? base + (addon ?? 0) : base;
  return { amount, currency: curr, includeChat };
}

export function subscriptionPrice(code: string, cycle: 'MONTHLY'|'ANNUAL' = 'MONTHLY') {
  const CYCLE = String(cycle || 'MONTHLY').toUpperCase() as 'MONTHLY'|'ANNUAL';
  const curr = currencyForCountry(code);
  if (!curr) return null;

  const ov = countryOverride(code);
  const monthly = ov?.monthly ?? SUBSCRIPTION.MONTHLY[curr as keyof typeof SUBSCRIPTION.MONTHLY];
  const annual  = ov?.annual  ?? SUBSCRIPTION.ANNUAL[curr as keyof typeof SUBSCRIPTION.ANNUAL];

  const amount = CYCLE === 'ANNUAL' ? annual : monthly;
  if (amount == null) return null;

  return { amount, currency: curr, cycle: CYCLE, includedChatHours: SUBSCRIPTION.INCLUDED_CHAT_HOURS };
}

export function paymentLinkForOneTime(code: string, { includeChat = true } = {}) {
  const curr = currencyForCountry(code);
  if (!curr) return '#';
  const section = includeChat ? PAYMENT_LINKS.ONE_TIME.WITH_CHAT : PAYMENT_LINKS.ONE_TIME.NO_CHAT;
  return section.BY_COUNTRY[code] || section.BY_CURRENCY[curr as keyof typeof section.BY_CURRENCY] || '#';
}

export function paymentLinkForSubscription(code: string, cycle: 'MONTHLY'|'ANNUAL' = 'MONTHLY') {
  const CYCLE = String(cycle || 'MONTHLY').toUpperCase() as 'MONTHLY'|'ANNUAL';
  const curr = currencyForCountry(code);
  if (!curr) return '#';

  const section = PAYMENT_LINKS.SUBSCRIPTION[CYCLE] || PAYMENT_LINKS.SUBSCRIPTION.MONTHLY;
  return section.BY_COUNTRY[code] || section.BY_CURRENCY[curr as keyof typeof section.BY_CURRENCY] || '#';
}

export function formatCurrency(amount: number, currency: string, locale = 'en') {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: ['RSD', 'HUF'].includes(currency) ? 0 : 2
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

// Back-compat (not used by new page, kept so other code doesn't break)
export function priceForCountry(code: string) {
  const curr = currencyForCountry(code);
  if (!curr) return null;
  const base = ONE_TIME_BASE[curr as keyof typeof ONE_TIME_BASE];
  return base ? { amount: base, currency: curr } : null;
}

export function paymentLinkFor(code: string) {
  const c = ALL_COUNTRIES.find((x) => x.code === code);
  if (!c) return '#';
  return PAYMENT_LINKS.ONE_TIME.WITH_CHAT.BY_CURRENCY[c.currency as keyof typeof PAYMENT_LINKS.ONE_TIME.WITH_CHAT.BY_CURRENCY] || '#';
}
