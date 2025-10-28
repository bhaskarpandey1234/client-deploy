import { lang } from '$lib/stores/checkout.js';
import { get } from 'svelte/store';

function canonicalLang(L) {
  const supported = ['EN', 'RS', 'RU', 'TR', 'PL', 'IT'];
  return supported.includes(L) ? L : 'EN';
}

const STRINGS = {
  EN: {
    hero: { title: 'Features', sub: 'True stories from our community — plus a weekly spotlight.' },
    spotlight: 'Spotlight of the Week',
    watch: 'Watch on YouTube',
    transcript: 'Read transcript',
    duration: 'Duration',
    recent: 'Recent stories',
    more: 'More stories',
    share: 'Share your story',
    empty: 'Stories will appear here soon.'
  },
  RS: {
    hero: { title: 'Izdvojeno', sub: 'Istinite priče naše zajednice — uz nedeljni spotlight.' },
    spotlight: 'Nedeljni spotlight',
    watch: 'Gledaj na YouTube‑u',
    transcript: 'Pročitaj transkript',
    duration: 'Trajanje',
    recent: 'Skorašnje priče',
    more: 'Još priča',
    share: 'Podeli svoju priču',
    empty: 'Priče će uskoro biti ovde.'
  },
  RU: {
    hero: { title: 'Избранное', sub: 'Реальные истории сообщества — и еженедельный спотлайт.' },
    spotlight: 'Спотлайт недели',
    watch: 'Смотреть на YouTube',
    transcript: 'Читать транскрипт',
    duration: 'Длительность',
    recent: 'Недавние истории',
    more: 'Больше историй',
    share: 'Поделиться своей историей',
    empty: 'Истории появятся здесь скоро.'
  },
  TR: {
    hero: { title: 'Öne çıkanlar', sub: 'Topluluktan gerçek hikâyeler — haftalık spotlight ile.' },
    spotlight: 'Haftanın spotu',
    watch: "YouTube'da izle",
    transcript: 'Transkripti oku',
    duration: 'Süre',
    recent: 'Son hikâyeler',
    more: 'Daha fazla hikâye',
    share: 'Hikâyeni paylaş',
    empty: 'Hikâyeler yakında burada olacak.'
  },
  PL: {
    hero: { title: 'Wyróżnione', sub: 'Prawdziwe historie naszej społeczności — i cotygodniowy spotlight.' },
    spotlight: 'Wyróżnienie tygodnia',
    watch: 'Obejrzyj na YouTube',
    transcript: 'Czytaj transkrypt',
    duration: 'Czas trwania',
    recent: 'Niedawne historie',
    more: 'Więcej historii',
    share: 'Podziel się swoją historią',
    empty: 'Historie pojawią się tu wkrótce.'
  },
  IT: {
    hero: { title: 'In evidenza', sub: 'Storie vere della community — con lo spotlight settimanale.' },
    spotlight: 'Spotlight della settimana',
    watch: 'Guarda su YouTube',
    transcript: 'Leggi trascrizione',
    duration: 'Durata',
    recent: 'Storie recenti',
    more: 'Altre storie',
    share: 'Condividi la tua storia',
    empty: 'Le storie appariranno qui a breve.'
  }
};

export function t(L, path, fallback = '') {
  const lang = canonicalLang(L);
  const obj = STRINGS[lang] || STRINGS.EN;
  return path.split('.').reduce((o,k)=> (o && o[k] != null ? o[k] : undefined), obj) ?? fallback;
}
