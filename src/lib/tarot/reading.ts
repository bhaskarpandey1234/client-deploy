import type { DealtCard } from './tarot';
import type { Spread } from './spreads';

function isMajor(c: DealtCard) { return c.arcana === 'Major'; }

export interface ReadingBlock {
  title: string;
  text: string;
}
export interface ReadingResult {
  headline: string;
  notes: string[];
  blocks: ReadingBlock[];
}

function summarizeCard(c: DealtCard): string {
  const words = c.reversed ? c.keywords.reversed : c.keywords.upright;
  const k = words.slice(0,3).join(' • ');
  const rev = c.reversed ? ' (reversed)' : '';
  return `${c.name}${rev}: ${k}`;
}

export function interpretSpread(spread: Spread, placed: Record<string, DealtCard | undefined>): ReadingResult {
  const cards = Object.values(placed).filter(Boolean) as DealtCard[];
  const majors = cards.filter(isMajor).length;
  const headline =
    majors >= 3 ? 'Major Arcana Emphasis — deep life lesson at play'
  : majors === 2 ? 'Strong Theme — multiple majors'
  : 'Everyday Matters — minor arcana leading';

  const notes: string[] = [];
  // Element balance
  const countBySuit = { Wands:0, Cups:0, Swords:0, Pentacles:0 };
  for (const c of cards) {
    if (c.suit) (countBySuit as any)[c.suit]++;
  }
  const suitNote = `Balance — Wands:${countBySuit.Wands} Cups:${countBySuit.Cups} Swords:${countBySuit.Swords} Pentacles:${countBySuit.Pentacles}`;
  notes.push(suitNote);

  const blocks: ReadingBlock[] = [];

  if (spread.key === 'three') {
    const past    = placed['past'];
    const present = placed['present'];
    const future  = placed['future'];
    if (past)    blocks.push({ title:'Past',    text: summarizeCard(past) });
    if (present) blocks.push({ title:'Present', text: summarizeCard(present) });
    if (future)  blocks.push({ title:'Future',  text: summarizeCard(future) });
  } else {
    // Celtic Cross
    const map: [string,string][] = [
      ['1','Present'], ['2','Challenge'], ['3','Subconscious'], ['4','Past'],
      ['5','Conscious'], ['6','Near Future'], ['7','You'], ['8','Environment'],
      ['9','Hopes / Fears'], ['10','Outcome']
    ];
    for (const [id,label] of map) {
      const c = placed[id];
      if (c) blocks.push({ title: label, text: summarizeCard(c) });
    }
  }

  return { headline, notes, blocks };
}