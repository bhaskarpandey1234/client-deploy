export const GUIDE_CATEGORIES = [
  {
    slug: 'astrology',
    name: 'Astrology',
    cover: '/star.jpg',
    blurb: 'Chart‑based guidance using planetary cycles and archetypes. Explore natal themes, timing, and relationship dynamics.',
    subs: [
      { slug: 'celtic', name: 'Celtic Tree Zodiac', thumb: '/celtic.png', desc: 'Ancient Celtic wisdom through sacred trees and their seasonal cycles.' },
      { slug: 'chinese-zodiac', name: 'Chinese Zodiac', thumb: '/chinese.png', desc: 'Eastern zodiac based on lunar calendar and animal archetypes.' },
      { slug: 'egyptian', name: 'Egyptian', thumb: '/egyptian.png', desc: 'Ancient Egyptian astrological system and deity associations.' },
      { slug: 'japanese', name: 'Japanese', thumb: '/japanese.png', desc: 'Traditional Japanese star reading and celestial guidance.' },
      { slug: 'mayan', name: 'Mayan', thumb: '/mayan.png', desc: 'Mesoamerican calendar astrology and cosmic cycles.' },
      { slug: 'panchang', name: 'Panchang', thumb: '/panch_logo.png', desc: 'Hindu calendar and auspicious timing for daily activities.' },
      { slug: 'vedic', name: 'Vedic', thumb: '/vedic.png', desc: 'Ancient Indian Jyotish astrology and karmic patterns.' },
      { slug: 'western', name: 'Western', thumb: '/western.png', desc: 'Traditional zodiac signs and planetary horoscopes.' }
    ]
  },
  {
    slug: 'numerology',
    name: 'Numerology',
    cover: '/angle.png',
    blurb: 'A symbolic language of numbers that reveals tendencies, timing, and personal cycles drawn from your name and birthdate.',
    subs: [
      { slug: 'angle', name: 'Angel Numbers', thumb: '/angle.png', desc: 'Divine messages through repeating number sequences.' },
      { slug: 'chaldean', name: 'Chaldean', thumb: '/chaldean.png', desc: 'Ancient Babylonian number system and vibrations.' },
      { slug: 'chinese', name: 'Chinese', thumb: '/chineseN.png', desc: 'Eastern numerology traditions and lucky numbers.' },
      { slug: 'kabbalistic', name: 'Kabbalistic', thumb: '/kabbalistic.png', desc: 'Hebrew mystical numerology and sacred geometry.' },
      { slug: 'western', name: 'Western', thumb: '/westernN.png', desc: 'Pythagorean number meanings and life path calculations.' }
    ]
  },
  {
    slug: 'divination',
    name: 'Divination',
    cover: '/tarot-cards.png',
    blurb: 'Symbolic casting and drawing methods to reflect on situations and choose wise next steps.',
    subs: [
      { slug: 'conchomancy', name: 'Conchomancy', thumb: '/shell.png', desc: 'Shell casting divination and maritime pattern language.' },
      { slug: 'i-ching', name: 'I Ching', thumb: '/iching.png', desc: 'Classic book of changes with hexagrams and moving lines.' },
      { slug: 'oracle', name: 'Oracle Cards', thumb: '/oracle.png', desc: 'Intuitive card guidance and symbolic messages.' },
      { slug: 'palmistry', name: 'Palmistry', thumb: '/palmistry.png', desc: 'Reading the lines and mounts of your hand.' },
      { slug: 'runes', name: 'Runes', thumb: '/runes.png', desc: 'Norse symbols drawn or cast for directional advice.' },
      { slug: 'tarot-cards', name: 'Tarot Cards', thumb: '/tarot-cards.png', desc: 'A 78‑card archetype system for clarity and perspective.' }
    ]
  }
];

export function linkFor(categorySlug, subSlug) {
  return `/asteria/${categorySlug}/${subSlug}/information`;
}
