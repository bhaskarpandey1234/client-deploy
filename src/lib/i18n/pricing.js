import { canonicalLang } from './site.js';

const STRINGS = {
  EN: {
    hero: { title: 'Pricing', sub: 'Choose your plan and billing country.' },
    countrySearch: 'Search country…',
    footnote: 'Prices include VAT where applicable. Your card\'s billing country must match your selection.',
    summary: { title: 'Summary', language: 'Language', country: 'Billing Country', price: 'Price' },
    actions: { continue: 'Continue to checkout', selectCountryFirst: 'Select a country to continue' },
    empty: function(q) { return `No countries match "${q}".`; },
    tba: 'TBA',
    oneTime: {
      title: 'One‑time Reading',
      toggle: 'Include 10‑minute chat',
      withChat: 'Reading + 10‑min chat',
      noChat: 'Reading only'
    },
    subscription: {
      title: 'Subscription',
      monthly: 'Monthly',
      annual: 'Annual',
      includes: function(hours) { return `Includes ${hours} hours of chat`; },
      billedMonthly: 'Billed monthly',
      billedAnnually: 'Billed annually'
    }
  },
  SR: {
    hero: { title: 'Cenovnik', sub: 'Izaberite plan i državu naplate.' },
    countrySearch: 'Pretraga države…',
    footnote: 'Cene uključuju porez gde je primenljivo. Zemlja kartice mora da se poklapa.',
    summary: { title: 'Pregled', language: 'Jezik', country: 'Država naplate', price: 'Cena' },
    actions: { continue: 'Nastavi na plaćanje', selectCountryFirst: 'Izaberite državu da nastavite' },
    empty: function(q) { return `Nema rezultata za „${q}".`; },
    tba: 'Uskoro',
    oneTime: {
      title: 'Jednokratno čitanje',
      toggle: 'Uključiti 10 min razgovora',
      withChat: 'Čitanje + 10 min razgovora',
      noChat: 'Samo čitanje'
    },
    subscription: {
      title: 'Pretplata',
      monthly: 'Mesečno',
      annual: 'Godišnje',
      includes: function(h) { return `Uključuje ${h} sati razgovora`; },
      billedMonthly: 'Naplaćuje se mesečno',
      billedAnnually: 'Naplaćuje se godišnje'
    }
  },
  RU: {
    hero: { title: 'Цены', sub: 'Выберите план и страну оплаты.' },
    countrySearch: 'Поиск страны…',
    footnote: 'Цены включают НДС, где применимо. Страна карты должна совпадать.',
    summary: { title: 'Сводка', language: 'Язык', country: 'Страна оплаты', price: 'Цена' },
    actions: { continue: 'Перейти к оплате', selectCountryFirst: 'Выберите страну, чтобы продолжить' },
    empty: function(q) { return `Нет стран по запросу «${q}».`; },
    tba: 'Скоро',
    oneTime: {
      title: 'Разовое чтение',
      toggle: 'Добавить 10-минутный чат',
      withChat: 'Чтение + чат 10 мин',
      noChat: 'Только чтение'
    },
    subscription: {
      title: 'Подписка',
      monthly: 'Ежемесячно',
      annual: 'Ежегодно',
      includes: function(h) { return `Включает ${h} часов чата`; },
      billedMonthly: 'Ежемесячная оплата',
      billedAnnually: 'Ежегодная оплата'
    }
  },
  TR: {
    hero: { title: 'Fiyatlandırma', sub: 'Planı ve fatura ülkesini seçin.' },
    countrySearch: 'Ülke ara…',
    footnote: 'Fiyatlara uygun yerlerde KDV dahildir. Kart ülkeniz seçimle eşleşmelidir.',
    summary: { title: 'Özet', language: 'Dil', country: 'Fatura Ülkesi', price: 'Fiyat' },
    actions: { continue: 'Ödemeye devam et', selectCountryFirst: 'Devam etmek için ülke seçin' },
    empty: function(q) { return `"${q}" ile eşleşen ülke yok.`; },
    tba: 'Yakında',
    oneTime: {
      title: 'Tek seferlik yorum',
      toggle: '10 dakikalık sohbeti dahil et',
      withChat: 'Yorum + 10 dk sohbet',
      noChat: 'Sadece yorum'
    },
    subscription: {
      title: 'Abonelik',
      monthly: 'Aylık',
      annual: 'Yıllık',
      includes: function(h) { return `${h} saat sohbet içerir`; },
      billedMonthly: 'Aylık faturalandırılır',
      billedAnnually: 'Yıllık faturalandırılır'
    }
  },
  PL: {
    hero: { title: 'Cennik', sub: 'Wybierz plan i kraj rozliczeń.' },
    countrySearch: 'Szukaj kraju…',
    footnote: 'Ceny zawierają VAT, gdy ma to zastosowanie. Kraj karty musi się zgadzać.',
    summary: { title: 'Podsumowanie', language: 'Język', country: 'Kraj rozliczeń', price: 'Cena' },
    actions: { continue: 'Przejdź do płatności', selectCountryFirst: 'Wybierz kraj, aby kontynuować' },
    empty: function(q) { return `Brak krajów pasujących do „${q}".`; },
    tba: 'Wkrótce',
    oneTime: {
      title: 'Jednorazowy odczyt',
      toggle: 'Dołącz 10-min czat',
      withChat: 'Odczyt + czat 10 min',
      noChat: 'Tylko odczyt'
    },
    subscription: {
      title: 'Abonament',
      monthly: 'Miesięczny',
      annual: 'Roczny',
      includes: function(h) { return `Zawiera ${h} godzin czatu`; },
      billedMonthly: 'Rozliczenie miesięczne',
      billedAnnually: 'Rozliczenie roczne'
    }
  },
  IT: {
    hero: { title: 'Prezzi', sub: 'Scegli il piano e il paese di fatturazione.' },
    countrySearch: 'Cerca paese…',
    footnote: 'I prezzi includono l\'IVA ove applicabile. Il paese della carta deve corrispondere.',
    summary: { title: 'Riepilogo', language: 'Lingua', country: 'Paese di fatturazione', price: 'Prezzo' },
    actions: { continue: 'Procedi al pagamento', selectCountryFirst: 'Seleziona un paese per continuare' },
    empty: function(q) { return `Nessun paese corrisponde a "${q}".`; },
    tba: 'A breve',
    oneTime: {
      title: 'Lettura una tantum',
      toggle: 'Includi chat di 10 minuti',
      withChat: 'Lettura + chat 10 min',
      noChat: 'Solo lettura'
    },
    subscription: {
      title: 'Abbonamento',
      monthly: 'Mensile',
      annual: 'Annuale',
      includes: function(h) { return `Include ${h} ore di chat`; },
      billedMonthly: 'Fatturazione mensile',
      billedAnnually: 'Fatturazione annuale'
    }
  }
};

export function t(L, path, arg) {
  const lang = canonicalLang(L);
  const obj = STRINGS[lang] || STRINGS.EN;
  if (path === 'empty') return (obj.empty || STRINGS.EN.empty)(arg ?? '');
  if (path === 'subscription.includes') return (obj.subscription.includes || STRINGS.EN.subscription.includes)(arg);
  return path.split('.').reduce((o,k)=> (o && o[k] != null ? o[k] : undefined), obj) ?? '';
}

export function localeForLang(L) {
  const x = String(L || '').toUpperCase();
  if (x.startsWith('RS') || x.startsWith('HR')) return 'sr-RS';
  if (x === 'RU') return 'ru-RU';
  if (x === 'TR') return 'tr-TR';
  if (x === 'PL') return 'pl-PL';
  if (x === 'IT') return 'it-IT';
  return 'en-GB';
}