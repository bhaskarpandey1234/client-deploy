// Tarot core: deck generation (78 cards), seeded shuffle, deal + reversed
export type Suit = 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
export type Arcana = 'Major' | 'Minor';

export interface Card {
  id: string;              // e.g. "major-0-fool", "wands-ace"
  name: string;            // display name
  arcana: Arcana;
  number: number;          // 0–21 for majors, 1–14 for minors (Ace==1, Page=11, Knight=12, Queen=13, King=14)
  suit?: Suit;             // for minors
  rank?: string;           // "Ace", "Two", ..., "King"
  keywords: { upright: string[]; reversed: string[] };
}

export interface DealtCard extends Card {
  reversed: boolean;
  // stable unique deal id for animation keys
  dealId: string;
}

// ---------------- RNG (mulberry32) ----------------
export function hashSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}
export class RNG {
  private state: number;
  constructor(seed: string) { this.state = hashSeed(seed); }
  next(): number {
    let t = (this.state += 0x6D2B79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  pick<T>(arr: T[]) { return arr[Math.floor(this.next() * arr.length)]; }
}

// ---------------- Major Arcana ----------------
const MAJORS: Array<{ n: number; key: string; name: string; up: string[]; rev: string[] }> = [
  { n:0,key:'fool',name:'The Fool', up:['new path','innocence','leap of faith'], rev:['recklessness','hesitation','naïveté'] },
  { n:1,key:'magician',name:'The Magician', up:['willpower','skill','manifest'], rev:['manipulation','untapped talent','scattered'] },
  { n:2,key:'high-priestess',name:'The High Priestess', up:['intuition','mystery','inner voice'], rev:['secrets','disconnection','doubt'] },
  { n:3,key:'empress',name:'The Empress', up:['nurture','abundance','creativity'], rev:['smothering','blocked growth','neglect'] },
  { n:4,key:'emperor',name:'The Emperor', up:['structure','authority','stability'], rev:['rigidity','control issues','dominance'] },
  { n:5,key:'hierophant',name:'The Hierophant', up:['tradition','mentor','belief'], rev:['rebellion','unconventional','dogma'] },
  { n:6,key:'lovers',name:'The Lovers', up:['union','choice','alignment'], rev:['disharmony','indecision','imbalance'] },
  { n:7,key:'chariot',name:'The Chariot', up:['drive','victory','focus'], rev:['force','lack of direction','stalling'] },
  { n:8,key:'strength',name:'Strength', up:['courage','compassion','inner power'], rev:['self-doubt','imbalance','avoidance'] },
  { n:9,key:'hermit',name:'The Hermit', up:['introspection','wisdom','solitude'], rev:['isolation','withdrawal','loneliness'] },
  { n:10,key:'wheel',name:'Wheel of Fortune', up:['change','cycles','luck'], rev:['resistance','setbacks','external control'] },
  { n:11,key:'justice',name:'Justice', up:['truth','fairness','cause & effect'], rev:['bias','injustice','avoid accountability'] },
  { n:12,key:'hanged-man',name:'The Hanged Man', up:['suspension','new view','release'], rev:['stall','martyrdom','fear of change'] },
  { n:13,key:'death',name:'Death', up:['ending','transformation','rebirth'], rev:['stagnation','clinging','slow change'] },
  { n:14,key:'temperance',name:'Temperance', up:['balance','moderation','alchemy'], rev:['excess','imbalance','friction'] },
  { n:15,key:'devil',name:'The Devil', up:['bondage','materialism','shadow'], rev:['release','awareness','detachment'] },
  { n:16,key:'tower',name:'The Tower', up:['upheaval','revelation','breakdown'], rev:['averted disaster','resistance','aftershock'] },
  { n:17,key:'star',name:'The Star', up:['hope','healing','guidance'], rev:['doubt','pessimism','disconnection'] },
  { n:18,key:'moon',name:'The Moon', up:['intuition','dreams','uncertainty'], rev:['fear','confusion','reveal deception'] },
  { n:19,key:'sun',name:'The Sun', up:['vitality','success','joy'], rev:['temporary cloud','ego','delayed joy'] },
  { n:20,key:'judgement',name:'Judgement', up:['awakening','reckoning','calling'], rev:['self-judgment','avoidance','stagnation'] },
  { n:21,key:'world',name:'The World', up:['completion','integration','wholeness'], rev:['incomplete','loose ends','delays'] },
];

// ---------------- Minors (procedural keywords) ----------------
const SUIT_THEME: Record<Suit, { up: string[]; rev: string[] }> = {
  Wands: { up: ['energy','initiative','creativity'], rev: ['burnout','impulse','scattered'] },
  Cups: { up: ['emotion','relationship','intuition'], rev: ['emotional block','codependence','avoidance'] },
  Swords: { up: ['mind','truth','decision'], rev: ['conflict','anxiety','overthinking'] },
  Pentacles: { up: ['work','resources','body'], rev: ['instability','material worry','stagnation'] },
};

const RANKS = [
  { n:1,  rank:'Ace',   up:['seed','new beginning'], rev:['false start','blocked potential'] },
  { n:2,  rank:'Two',   up:['duality','choice','balance'], rev:['indecision','imbalance'] },
  { n:3,  rank:'Three', up:['growth','collaboration'], rev:['misalignment','triangle tension'] },
  { n:4,  rank:'Four',  up:['stability','rest','foundation'], rev:['stuck','restless','plateau'] },
  { n:5,  rank:'Five',  up:['challenge','change'], rev:['recovery','avoid conflict'] },
  { n:6,  rank:'Six',   up:['harmony','support','movement'], rev:['strings attached','stall'] },
  { n:7,  rank:'Seven', up:['assessment','patience','strategy'], rev:['impatience','scattered effort'] },
  { n:8,  rank:'Eight', up:['skill','progress','focus'], rev:['perfectionism','distraction'] },
  { n:9,  rank:'Nine',  up:['fruition','resilience'], rev:['strain','worry'] },
  { n:10, rank:'Ten',   up:['culmination','transition'], rev:['overload','unfinished'] },
  { n:11, rank:'Page',  up:['curiosity','message'], rev:['immaturity','mixed signals'] },
  { n:12, rank:'Knight',up:['pursuit','momentum'], rev:['reckless','inconsistent'] },
  { n:13, rank:'Queen', up:['mastery','care'], rev:['smothering','detached'] },
  { n:14, rank:'King',  up:['authority','leadership'], rev:['rigid','misuse of power'] },
];

function combineKeywords(suit: Suit, rank: string, baseUp: string[], baseRev: string[]) {
  const theme = SUIT_THEME[suit];
  const up = [...baseUp, ...theme.up].slice(0, 4);
  const rev = [...baseRev, ...theme.rev].slice(0, 4);
  return { upright: up, reversed: rev };
}

// ---------------- Build full 78-card deck ----------------
export function buildDeck(): Card[] {
  const majors: Card[] = MAJORS.map(m => ({
    id: `major-${m.n}-${m.key}`,
    name: m.name,
    arcana: 'Major',
    number: m.n,
    keywords: { upright: m.up, reversed: m.rev }
  }));

  const minors: Card[] = (['Wands','Cups','Swords','Pentacles'] as Suit[]).flatMap((suit) =>
    RANKS.map(r => ({
      id: `${suit.toLowerCase()}-${r.rank.toLowerCase()}`,
      name: `${r.rank} of ${suit}`,
      arcana: 'Minor' as const,
      number: r.n,
      suit,
      rank: r.rank,
      keywords: combineKeywords(suit, r.rank, r.up, r.rev)
    }))
  );

  return [...majors, ...minors];
}

// ---------------- Shuffle & deal ----------------
export function shuffle<T>(arr: T[], rng: RNG): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface DealOptions {
  reversedChance?: number; // 0..1, default 0.45
  seed?: string;           // stable seed for reproducible results
}

export function deal(
  count: number,
  options: DealOptions = {},
  deck?: Card[]
): { dealt: DealtCard[]; rest: Card[] } {
  const seed = options.seed ?? `${Date.now()}`;
  const rng = new RNG(seed);
  const reversedChance = Math.max(0, Math.min(1, options.reversedChance ?? 0.45));
  const baseDeck = deck ?? buildDeck();
  const shuf = shuffle(baseDeck, rng);
  const taken = shuf.slice(0, count);
  const rest = shuf.slice(count);
  const dealt: DealtCard[] = taken.map((c, idx) => ({
    ...c,
    reversed: rng.next() < reversedChance,
    dealId: `${c.id}:${seed}:${idx}`
  }));
  return { dealt, rest };
}