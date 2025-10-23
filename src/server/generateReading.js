// Server-side reading generator for all divination categories
const RUNES = [
  { id: 'fehu', glyph: 'ᚠ', name: 'Fehu', keywords: ['wealth','resources','flow'], reversible: true,
    meaning: { upright: 'Wealth, movable resources, beginnings and momentum.',
               reversed: 'Loss, stagnation or mismanagement of resources; reset your approach.' } },
  { id: 'uruz', glyph: 'ᚢ', name: 'Uruz', keywords: ['vitality','strength','renewal'], reversible: true,
    meaning: { upright: 'Life-force, raw power, healing; shape energy with intention.',
               reversed: 'Fatigue, scattered power; rebuild foundations and health.' } },
  { id: 'thurisaz', glyph: 'ᚦ', name: 'Thurisaz', keywords: ['threshold','protection','catharsis'], reversible: true,
    meaning: { upright: 'Threshold moment; measured action; protective force.',
               reversed: 'Impulsivity, prickly conflict; pause before acting.' } },
  { id: 'ansuz', glyph: 'ᚨ', name: 'Ansuz', keywords: ['message','wisdom','breath'], reversible: true,
    meaning: { upright: 'Communication, counsel, inspiration from higher mind.',
               reversed: 'Mixed messages, poor listening; clarify and verify.' } },
  { id: 'raidho', glyph: 'ᚱ', name: 'Raidho', keywords: ['journey','order','rhythm'], reversible: true,
    meaning: { upright: 'Travel or progress; right order and timing.',
               reversed: 'Delays, detours; resync your schedule and agreements.' } },
  { id: 'kenaz', glyph: 'ᚲ', name: 'Kenaz', alias: 'Kaunaz', keywords: ['torch','craft','insight'], reversible: true,
    meaning: { upright: 'Illumination, skill, creative spark; see what was hidden.',
               reversed: 'Dullness, blocked creativity; clear the soot and relight.' } },
  { id: 'gebo', glyph: 'ᚷ', name: 'Gebo', keywords: ['gift','exchange','partnership'], reversible: false,
    meaning: { upright: 'Reciprocity and balance; a gift or pact well‑made.' } },
  { id: 'wunjo', glyph: 'ᚹ', name: 'Wunjo', keywords: ['joy','harmony','belonging'], reversible: true,
    meaning: { upright: 'Joy, cohesion, shared success.',
               reversed: 'Alienation, discord; tend to the group heart.' } },
  { id: 'hagalaz', glyph: 'ᚺ', name: 'Hagalaz', keywords: ['disruption','weather','reset'], reversible: false,
    meaning: { upright: 'Sudden hail: cleansing disruption that clears a path.' } },
  { id: 'nauthiz', glyph: 'ᚾ', name: 'Nauthiz', keywords: ['need','constraint','patience'], reversible: true,
    meaning: { upright: 'Friction reveals necessity; practice patience.',
               reversed: 'Self‑imposed limits; release shame and ask for help.' } },
  { id: 'isa', glyph: 'ᛁ', name: 'Isa', keywords: ['stillness','ice','pause'], reversible: false,
    meaning: { upright: 'Hold still; conserve energy; let clarity form.' } },
  { id: 'jera', glyph: 'ᛃ', name: 'Jera', keywords: ['harvest','cycles','reward'], reversible: false,
    meaning: { upright: 'Harvest in due season; steady effort ripens results.' } },
  { id: 'eihwaz', glyph: 'ᛇ', name: 'Eihwaz', keywords: ['yew','endurance','axis'], reversible: false,
    meaning: { upright: 'Resilience and strategic patience; align to the axis.' } },
  { id: 'perthro', glyph: 'ᛈ', name: 'Perthro', keywords: ['lot','mystery','chance'], reversible: true,
    meaning: { upright: 'Revelation, divination, a roll of the dice in your favor.',
               reversed: 'Secrets withheld, unclear odds; narrow your risks.' } },
  { id: 'algiz', glyph: 'ᛉ', name: 'Algiz', alias: 'Elhaz', keywords: ['protection','signal','boundaries'], reversible: true,
    meaning: { upright: 'Protection and clear signals; raise good boundaries.',
               reversed: 'Over‑exposure; shore up defenses and choose allies.' } },
  { id: 'sowilo', glyph: 'ᛋ', name: 'Sowilo', keywords: ['sun','success','vital clarity'], reversible: false,
    meaning: { upright: 'Breakthrough energy; align with purpose and thrive.' } },
  { id: 'tiwaz', glyph: 'ᛏ', name: 'Tiwaz', keywords: ['honor','aim','sacrifice'], reversible: true,
    meaning: { upright: 'Aim true with integrity; disciplined victory.',
               reversed: 'Quarrel, mis‑aim; examine ego and fairness.' } },
  { id: 'berkano', glyph: 'ᛒ', name: 'Berkano', keywords: ['birch','growth','care'], reversible: true,
    meaning: { upright: 'Nurturing growth, family matters, regeneration.',
               reversed: 'Stalled growth or family strain; slow down and tend.' } },
  { id: 'ehwaz', glyph: 'ᛖ', name: 'Ehwaz', keywords: ['horse','trust','movement'], reversible: true,
    meaning: { upright: 'Teamwork, trust, steady progress with a partner.',
               reversed: 'Mistrust or restlessness; rebuild rapport and pace.' } },
  { id: 'mannaz', glyph: 'ᛗ', name: 'Mannaz', keywords: ['self','humans','cooperation'], reversible: true,
    meaning: { upright: 'Self‑knowledge, allies, a humane approach.',
               reversed: 'Isolation or self‑sabotage; practice humility.' } },
  { id: 'laguz', glyph: 'ᛚ', name: 'Laguz', keywords: ['water','intuition','flow'], reversible: true,
    meaning: { upright: 'Intuition, emotion, healing waters; trust the tide.',
               reversed: 'Flood or drought; regulate, ground, and rest.' } },
  { id: 'ingwaz', glyph: 'ᛜ', name: 'Ingwaz', alias: 'Inguz', keywords: ['seed','gestation','closure'], reversible: false,
    meaning: { upright: 'Seed sealed; completion that readies the next cycle.' } },
  { id: 'dagaz', glyph: 'ᛞ', name: 'Dagaz', keywords: ['daybreak','shift','clarity'], reversible: false,
    meaning: { upright: 'Sudden dawn; paradigm shift and fresh air.' } },
  { id: 'othala', glyph: 'ᛟ', name: 'Othala', keywords: ['heritage','home','boundaries'], reversible: true,
    meaning: { upright: 'Ancestry, place, rightful stewardship.',
               reversed: 'Disputes, rigid walls; discern inheritance vs. baggage.' } }
];

const BLANK_RUNE = {
  id: 'blank', glyph: '•', name: 'Blank Rune', alias: "Odin's Rune", keywords: ['unknown','fate','surrender'],
  reversible: false,
  meaning: { upright: 'The unknowable; yield control and trust emergence.' }
};

const SPREADS = {
  single: { label: 'Single Rune — Focus', size: 1, positions: ['Focus'] },
  three:  { label: 'Three Runes — Past • Present • Guidance', size: 3, positions: ['Past','Present','Guidance'] },
  norn:   { label: 'Norn Spread — Was • Is • Becoming', size: 3, positions: ['Past (Urd)','Present (Verdandi)','Future (Skuld)'] },
  five:   { label: 'Five Runes — Situation • Challenge • Root • Advice • Outcome', size: 5,
            positions: ['Situation','Challenge','Root Cause','Advice','Likely Outcome'] }
};

function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function prngFromSeed(seed) {
  const seedGen = xmur3(seed);
  return mulberry32(seedGen());
}

function generateRunesReading(inputs) {
  const { name, question, readingDate, spread, allowReversals, includeBlank, seed } = inputs;
  const rng = prngFromSeed(seed);
  const pool = [...RUNES];
  if (includeBlank) pool.push(BLANK_RUNE);
  
  const spreadSpec = SPREADS[spread] || SPREADS.three;
  const draws = [];
  
  for (let i = 0; i < spreadSpec.size; i++) {
    if (!pool.length) break;
    const idx = Math.floor(rng() * pool.length);
    const rune = pool.splice(idx, 1)[0];
    const orientation = allowReversals && rune.reversible && rng() < 0.5 ? 'reversed' : 'upright';
    draws.push({ rune, orientation, position: spreadSpec.positions[i] });
  }
  
  const tags = new Map();
  for (const d of draws) {
    for (const k of d.rune.keywords) tags.set(k, (tags.get(k) || 0) + 1);
  }
  const top = [...tags.entries()].sort((a,b) => b[1]-a[1]).slice(0,3).map(([k]) => k);
  const headline = draws.length === 1
    ? `${draws[0].rune.name} points to ${draws[0].rune.keywords[0]}`
    : `Themes: ${top.join(', ')}`;
  const modNotes = draws.some(d => d.orientation === 'reversed')
    ? 'Some energies are inverted—adjust pace, clarify signals, and shore up boundaries.'
    : 'Energies flow upright—act with steady intention.';
  const synthesis = `${headline}. ${modNotes}`;
  
  const lines = [
    name ? `For: ${name}` : '',
    question ? `Question: ${question}` : '',
    readingDate ? `Date: ${readingDate}` : '',
    `Spread: ${spreadSpec.label}`,
    '',
    ...draws.map(d => {
      const o = d.orientation === 'reversed' ? ' (reversed)' : '';
      const m = d.orientation === 'reversed' && d.rune.reversible && d.rune.meaning.reversed
        ? d.rune.meaning.reversed
        : d.rune.meaning.upright;
      return `${d.position}: ${d.rune.glyph} ${d.rune.name}${o}\n${d.rune.keywords.join(' • ')}\n${m}`;
    }),
    '',
    `Synthesis: ${synthesis}`,
    `Seed: ${seed}`
  ].filter(Boolean).join('\n\n');
  
  return lines;
}

function generatePalmistryReading(inputs) {
  const { name, question, hand, focus } = inputs;
  return [
    `Palmistry reading for ${name || 'Seeker'}.`,
    `Question: ${question || '—'}.`,
    `Hand: ${hand || 'dominant'}, Focus: ${focus || 'general'}.`,
    `—`,
    `<< Insert palm analysis here >>`
  ].join('\n');
}

function generateIChingReading(inputs) {
  const { name, question, method } = inputs;
  return [
    `I‑Ching reading for ${name || 'Seeker'}.`,
    `Question: ${question || '—'}.`,
    `Method: ${method || 'three coins'}.`,
    `—`,
    `<< Insert hexagram analysis here >>`
  ].join('\n');
}

export async function generateReading(category, inputs) {
  switch (category) {
    case 'runes':
      return generateRunesReading(inputs);
    case 'palmistry':
      return generatePalmistryReading(inputs);
    case 'iching':
      return generateIChingReading(inputs);
    default:
      throw new Error(`Unknown category: ${category}`);
  }
}
