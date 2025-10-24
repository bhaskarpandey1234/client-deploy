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

export const SUBSCRIPTION_PRICES = {
  EUR: 9,
  GBP: 8,
  USD: 9,
  RSD: 750,
  INR: 399,
  BGN: 18,
  CZK: 235,
  DKK: 72,
  HUF: 3745,
  PLN: 42,
  RON: 47,
  SEK: 109
};

export const COUNTRY_PRICE_OVERRIDE = {};
export const COUNTRY_SUBSCRIPTION_OVERRIDE = {};

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

export const SUBSCRIPTION = 'SUBSCRIPTION';
export const ONE_TIME_WITH_CHAT = 'ONE_TIME_WITH_CHAT';
export const ONE_TIME_NO_CHAT = 'ONE_TIME_NO_CHAT';

export function priceForCountry(code) {
  const c = ALL_COUNTRIES.find((x) => x.code === code);
  if (!c) return null;
  const currency = c.currency;
  const amount = COUNTRY_PRICE_OVERRIDE[code] ?? BASE_PRICES[currency];
  return amount ? { amount, currency } : null;
}

export function oneTimePrice(code, options = {}) {
  const c = ALL_COUNTRIES.find((x) => x.code === code);
  if (!c) return null;
  const currency = c.currency;
  const baseAmount = COUNTRY_PRICE_OVERRIDE[code] ?? BASE_PRICES[currency];
  if (!baseAmount) return null;
  
  // Add chat cost if included
  const chatCost = options.includeChat ? (baseAmount * 0.3) : 0; // 30% more for chat
  const amount = Math.round(baseAmount + chatCost);
  
  return { amount, currency };
}

export function subscriptionPrice(code, cycle = 'MONTHLY') {
  const c = ALL_COUNTRIES.find((x) => x.code === code);
  if (!c) return null;
  const currency = c.currency;
  const baseAmount = COUNTRY_SUBSCRIPTION_OVERRIDE[code] ?? SUBSCRIPTION_PRICES[currency];
  if (!baseAmount) return null;
  
  // Annual gets 2 months free (10 months price for 12 months)
  const amount = cycle === 'ANNUAL' ? Math.round(baseAmount * 10) : baseAmount;
  
  return { amount, currency };
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
