import { ALL_COUNTRIES } from './geo.js';

export const BASE_PRICES = {
  EUR: 19,
  GBP: 17,
  USD: 19,
  RSD: 1590,
  INR: 799,
  BGN: 37,
  CZK: 469,
  DKK: 145,
  HUF: 7490,
  PLN: 85,
  RON: 95,
  SEK: 219
};

export const COUNTRY_PRICE_OVERRIDE = {};

export const PAYMENT_LINKS = {
  DEFAULT: {
    EUR: '#',
    GBP: '#',
    USD: '#',
    RSD: '#',
    INR: '#',
    BGN: '#',
    CZK: '#',
    DKK: '#',
    HUF: '#',
    PLN: '#',
    RON: '#',
    SEK: '#'
  }
};

export function priceForCountry(code) {
  const c = ALL_COUNTRIES.find((x) => x.code === code);
  if (!c) return null;
  const currency = c.currency;
  const amount = COUNTRY_PRICE_OVERRIDE[code] ?? BASE_PRICES[currency];
  return amount ? { amount, currency } : null;
}

export function formatCurrency(amount, currency, locale = 'en-GB') {
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

export function paymentLinkFor(code) {
  const c = ALL_COUNTRIES.find((x) => x.code === code);
  if (!c) return '#';
  return PAYMENT_LINKS[code] || PAYMENT_LINKS.DEFAULT[c.currency] || '#';
}
