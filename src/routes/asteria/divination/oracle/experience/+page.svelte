<script lang="ts">
  import FooterMain from '$lib/components/FooterMain.svelte';
  import { onMount } from 'svelte';

  type SpreadKey = 'single' | 'three' | 'five' | 'nine';
  type Orientation = 'upright' | 'reversed';

  interface Card {
    id: string;
    title: string;
    keywords: string[];
    meaning: {
      upright: string;
      reversed?: string;
    };
  }

  interface DrawnCard {
    card: Card;
    orientation: Orientation;
    position: string;
  }

  interface Deck {
    key: string;
    name: string;
    description?: string;
    allowReversals?: boolean;
    cards: Card[];
  }

  interface Result {
    seed: string;
    draws: DrawnCard[];
    synthesis: string;
  }

  function xmur3(str: string) {
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
  function mulberry32(a: number) {
    return () => {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function prngFromSeed(seed: string) {
    const seedGen = xmur3(seed);
    return mulberry32(seedGen());
  }

  const ORACLE_44: Deck = {
    key: 'mystic',
    name: 'Mystic Advisor Oracle (44)',
    description: 'Elemental + archetypal prompts for reflection.',
    allowReversals: true,
    cards: [
      { id:'seed', title:'The Seed', keywords:['beginnings','potential','patience'],
        meaning:{ upright:'A fresh start wants tending; plant simply and trust time.',
                  reversed:'False starts; refine intent and prepare the soil first.' } },
      { id:'path', title:'The Path', keywords:['direction','choice','journey'],
        meaning:{ upright:'Pick a direction and begin walking.',
                  reversed:'Hesitation and detours; choose a small next step.' } },
      { id:'threshold', title:'The Threshold', keywords:['initiation','gateway','courage'],
        meaning:{ upright:'Cross the line; initiation follows commitment.',
                  reversed:'Door stays shut until you commit or complete a rite.' } },
      { id:'mirror', title:'The Mirror', keywords:['truth','self‑knowledge','clarity'],
        meaning:{ upright:'See clearly and own your part.',
                  reversed:'Projection or illusion; clean the mirror before acting.' } },
      { id:'storm', title:'The Storm', keywords:['disruption','cleansing','release'],
        meaning:{ upright:'Constructive upheaval clears the air.',
                  reversed:'Whirl without purpose; pause and ground before moving.' } },
      { id:'anchor', title:'The Anchor', keywords:['stability','commitment','roots'],
        meaning:{ upright:'Hold steady; build on what is reliable.',
                  reversed:'Stuckness or rigidity; loosen the rope a little.' } },
      { id:'flame', title:'The Flame', keywords:['passion','creativity','drive'],
        meaning:{ upright:'Fuel the work with wholehearted fire.',
                  reversed:'Burnout or scattered sparks; rest and refocus.' } },
      { id:'wave', title:'The Wave', keywords:['emotion','flow','adaptability'],
        meaning:{ upright:'Feel fully and surf the moment.',
                  reversed:'Overwhelm or avoidance; regulate and name the feeling.' } },
      { id:'mountain', title:'The Mountain', keywords:['perseverance','mastery','perspective'],
        meaning:{ upright:'Slow ascent brings durable view.',
                  reversed:'Obstruction or pride; find a pass, not a wall.' } },
      { id:'garden', title:'The Garden', keywords:['nurture','beauty','cultivation'],
        meaning:{ upright:'Tend daily; small care multiplies.',
                  reversed:'Neglect or clutter; prune and water what matters.' } },
      { id:'key', title:'The Key', keywords:['solution','insight','access'],
        meaning:{ upright:'A fitting solution turns the lock.',
                  reversed:'Wrong key; rethink the question before forcing it.' } },
      { id:'door', title:'The Door', keywords:['opportunity','invitation','timing'],
        meaning:{ upright:'A timely opening; enter with respect.',
                  reversed:'Not this door or not yet; wait for the right knock.' } },
      { id:'heart', title:'The Heart', keywords:['compassion','connection','joy'],
        meaning:{ upright:'Lead with warmth and honest care.',
                  reversed:'Over‑giving or guardedness; set kind boundaries.' } },
      { id:'serpent', title:'The Serpent', keywords:['shedding','healing','instinct'],
        meaning:{ upright:'Shed an old skin; heal through change.',
                  reversed:'Clinging to what no longer fits; release gently.' } },
      { id:'sun', title:'The Sun', keywords:['clarity','success','vitality'],
        meaning:{ upright:'Confidence and clear outcomes.',
                  reversed:'Fog or heat‑glare; slow down and hydrate your plans.' } },
      { id:'moon', title:'The Moon', keywords:['intuition','cycles','dreams'],
        meaning:{ upright:'Listen to dreams and timing.',
                  reversed:'Mixed signals; verify feelings with facts.' } },
      { id:'star', title:'The Star', keywords:['guidance','hope','vision'],
        meaning:{ upright:'A long view brightens the road.',
                  reversed:'Cynicism dims the lamp; rekindle trust carefully.' } },
      { id:'vessel', title:'The Vessel', keywords:['boundaries','containment','sacred‑space'],
        meaning:{ upright:'Create a container; hold what matters.',
                  reversed:'Leaks and blur; repair boundaries with care.' } },
      { id:'bridge', title:'The Bridge', keywords:['connection','collaboration','crossing'],
        meaning:{ upright:'Meet in the middle; share the load.',
                  reversed:'Gap or misalignment; repair the span stepwise.' } },
      { id:'weaver', title:'The Weaver', keywords:['integration','pattern','craft'],
        meaning:{ upright:'Threads align; integrate pieces into form.',
                  reversed:'Tangled threads; simplify and sequence.' } },
      { id:'compass', title:'The Compass', keywords:['orientation','values','true‑north'],
        meaning:{ upright:'Align choices to your true north.',
                  reversed:'Drifting by others\' magnets; recalibrate.' } },
      { id:'owl', title:'The Owl', keywords:['wisdom','observation','silence'],
        meaning:{ upright:'Observe quietly; insight ripens at night.',
                  reversed:'Rumor and over‑analysis; return to stillness.' } },
      { id:'wolf', title:'The Wolf', keywords:['instinct','loyalty','leadership'],
        meaning:{ upright:'Lead with trust and attunement.',
                  reversed:'Lone‑wolfing or pack friction; re‑establish trust.' } },
      { id:'tree', title:'The Tree', keywords:['growth','ancestry','patience'],
        meaning:{ upright:'Deepen roots; growth follows.',
                  reversed:'Shallow rooting; nourish foundation first.' } },
      { id:'river', title:'The River', keywords:['movement','cleanse','travel'],
        meaning:{ upright:'Let life move; go with the current.',
                  reversed:'Dammed flow; clear the channel of debris.' } },
      { id:'child', title:'The Child', keywords:['wonder','beginner\'s‑mind','play'],
        meaning:{ upright:'Approach with curiosity and play.',
                  reversed:'Naivety or dependence; add structure.' } },
      { id:'elder', title:'The Elder', keywords:['counsel','stewardship','legacy'],
        meaning:{ upright:'Seek seasoned guidance; serve the lineage.',
                  reversed:'Rigid tradition; modernize with respect.' } },
      { id:'pilgrim', title:'The Pilgrim', keywords:['quest','learning','humility'],
        meaning:{ upright:'Travel light; let the road teach.',
                  reversed:'Escapism; face what\'s at home first.' } },
      { id:'crown', title:'The Crown', keywords:['sovereignty','responsibility','dignity'],
        meaning:{ upright:'Own your role with calm authority.',
                  reversed:'Power struggle or abdication; choose integrity.' } },
      { id:'mask', title:'The Mask', keywords:['persona','roles','authenticity'],
        meaning:{ upright:'Play the role consciously.',
                  reversed:'Mask slips; show the true face kindly.' } },
      { id:'phoenix', title:'The Phoenix', keywords:['rebirth','breakthrough','renewal'],
        meaning:{ upright:'Rise from the ashes; the cycle turns.',
                  reversed:'Clinging to cinders; accept the new form.' } },
      { id:'portal', title:'The Portal', keywords:['synchronicity','leap','thin‑places'],
        meaning:{ upright:'A timely opening to leap.',
                  reversed:'Door ajar but misaligned; wait and prepare.' } },
      { id:'teacher', title:'The Teacher', keywords:['learning','structure','guidance'],
        meaning:{ upright:'Study, practice, share.',
                  reversed:'Dogma or poor advice; check sources.' } },
      { id:'healer', title:'The Healer', keywords:['repair','care','integration'],
        meaning:{ upright:'Tend wounds; integrate gently.',
                  reversed:'Martyring or self‑neglect; begin with you.' } },
      { id:'dreamer', title:'The Dreamer', keywords:['imagination','vision','rest'],
        meaning:{ upright:'Imagine freely; let rest do its work.',
                  reversed:'Escapism or insomnia; ground and sleep.' } },
      { id:'sword', title:'The Sword', keywords:['truth','boundaries','decision'],
        meaning:{ upright:'Cut cleanly; say the true thing.',
                  reversed:'Harshness or confusion; sharpen and soften.' } },
      { id:'shield', title:'The Shield', keywords:['protection','discernment','safety'],
        meaning:{ upright:'Protect your field; wise no\'s create yes\'s.',
                  reversed:'Defensiveness; open selectively, not naively.' } },
      { id:'chorus', title:'The Chorus', keywords:['community','celebration','co‑creation'],
        meaning:{ upright:'Sing together; the whole is greater.',
                  reversed:'Discord or gossip; retune the circle.' } },
      { id:'lighthouse', title:'The Lighthouse', keywords:['signal','direction','safety'],
        meaning:{ upright:'Heed the signal; correct course early.',
                  reversed:'Ignoring warnings; verify the beacon.' } },
      { id:'harvest', title:'The Harvest', keywords:['fruition','gratitude','share'],
        meaning:{ upright:'Reap and redistribute; thank the field.',
                  reversed:'Delayed yield or waste; count honestly.' } },
      { id:'gatekeeper', title:'The Gatekeeper', keywords:['standards','permission','guardian'],
        meaning:{ upright:'Clear criteria protect the temple.',
                  reversed:'Petty gatekeeping; simplify the rules.' } },
      { id:'sanctuary', title:'The Sanctuary', keywords:['rest','retreat','inner‑temple'],
        meaning:{ upright:'Withdraw to restore.',
                  reversed:'Burnout or porous space; create real rest.' } },
      { id:'altar', title:'The Altar', keywords:['intention','ritual','devotion'],
        meaning:{ upright:'Align action with devotion.',
                  reversed:'Hollow ritual; renew the vow in practice.' } },
      { id:'dawn', title:'The Dawn', keywords:['emergence','fresh‑start','optimism'],
        meaning:{ upright:'Light returns; move with gentle optimism.',
                  reversed:'False dawn; pace yourself and confirm signs.' } }
    ]
  };

  const DECKS: Record<string, Deck> = { mystic: ORACLE_44 };

  const SPREADS: Record<SpreadKey, { label: string; size: number; positions: string[] }> = {
    single: { label: 'Single — Focus', size: 1, positions: ['Focus'] },
    three:  { label: 'Three — Situation • Advice • Outcome', size: 3,
              positions: ['Situation','Advice','Outcome'] },
    five:   { label: 'Five — Situation • Challenge • Hidden • Advice • Likely Outcome', size: 5,
              positions: ['Situation','Challenge','Hidden Influence','Advice','Likely Outcome'] },
    nine:   { label: 'Nine — Past/Present/Future × Mind/Heart/Body', size: 9,
              positions: [
                'Past • Mind','Past • Heart','Past • Body',
                'Present • Mind','Present • Heart','Present • Body',
                'Future • Mind','Future • Heart','Future • Body'
              ] }
  };

  let name = '';
  let question = '';
  let deckKey: string = 'mystic';
  let spread: SpreadKey = 'three';
  let allowReversals = true;
  let seed = '';
  let result: Result | null = null;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    name = params.get('name') ?? '';
    question = params.get('q') ?? '';
    deckKey = DECKS[params.get('deck') ?? 'mystic'] ? (params.get('deck') as string) : 'mystic';
    const sp = params.get('spread') as SpreadKey | null;
    if (sp && SPREADS[sp]) spread = sp;
    allowReversals = params.get('rev') === '0' ? false : true;
    seed = params.get('s') ?? '';
    if (seed || question) compute();
  });

  function buildSeed(): string {
    const base = [
      name.trim().toLowerCase(),
      question.trim().toLowerCase(),
      deckKey,
      spread,
      allowReversals ? 'rev1' : 'rev0'
    ].join('|');
    return base || `rnd-${Date.now()}`;
  }

  function drawCards(count: number, rng: () => number): DrawnCard[] {
    const deck = DECKS[deckKey];
    const pool = [...deck.cards];
    const picks: DrawnCard[] = [];
    const pos = SPREADS[spread].positions;
    for (let i = 0; i < count; i++) {
      if (!pool.length) break;
      const idx = Math.floor(rng() * pool.length);
      const card = pool.splice(idx, 1)[0];
      let orientation: Orientation = 'upright';
      if ((allowReversals && (deck.allowReversals ?? true)) && card.meaning.reversed) {
        orientation = rng() < 0.5 ? 'upright' : 'reversed';
      }
      picks.push({ card, orientation, position: pos[i] });
    }
    return picks;
  }

  function synthesize(draws: DrawnCard[]): string {
    if (draws.length === 0) return '';
    const counts = new Map<string, number>();
    for (const d of draws) for (const k of d.card.keywords) counts.set(k, (counts.get(k) || 0) + 1);
    const themes = [...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k])=>k.replace(/-/g,' '));
    const reversed = draws.filter(d => d.orientation === 'reversed').length;
    const tline = `Themes: ${themes.join(', ') || '—'}.`;
    const rline = reversed
      ? `${reversed} ${reversed === 1 ? 'card is' : 'cards are'} reversed — slow down, revise assumptions, and adjust your stance.`
      : `Energies upright — act with clear intention.`;
    return `${tline} ${rline}`;
  }

  function pushQuery() {
    const url = new URL(window.location.href);
    name ? url.searchParams.set('name', name) : url.searchParams.delete('name');
    question ? url.searchParams.set('q', question) : url.searchParams.delete('q');
    url.searchParams.set('deck', deckKey);
    url.searchParams.set('spread', spread);
    url.searchParams.set('rev', allowReversals ? '1' : '0');
    seed ? url.searchParams.set('s', seed) : url.searchParams.delete('s');
    window.history.replaceState({}, '', url.toString());
  }

  function compute() {
    seed = seed || buildSeed();
    const rng = prngFromSeed(seed);
    const size = SPREADS[spread].size;
    const draws = drawCards(size, rng);
    const synthesis = synthesize(draws);
    result = { seed, draws, synthesis };
    pushQuery();
  }

  function resetAll() { result = null; seed = ''; }

  function shuffle() {
    try {
      const a = new Uint32Array(1);
      crypto.getRandomValues(a);
      seed = `rnd-${a[0].toString(36)}`;
    } catch {
      seed = `rnd-${Math.floor(Math.random()*1e9).toString(36)}`;
    }
    compute();
  }

  async function copyReading() {
    if (!result) return;
    const lines = [
      name ? `For: ${name}` : '',
      question ? `Question: ${question}` : '',
      `Deck: ${DECKS[deckKey].name}`,
      `Spread: ${SPREADS[spread].label}`,
      ...result.draws.map(d => {
        const o = d.orientation === 'reversed' ? ' (reversed)' : '';
        const m = d.orientation === 'reversed' && d.card.meaning.reversed
          ? d.card.meaning.reversed : d.card.meaning.upright;
        return `${d.position}: ${d.card.title}${o} — ${m}`;
      }),
      `Synthesis: ${result.synthesis}`,
      `Seed: ${result.seed}`
    ].filter(Boolean).join('\n');
    try { await navigator.clipboard.writeText(lines); } catch {}
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); } catch {}
  }

  function printCard() { window.print(); }
</script>

<div class="wrap">
  <header class="header">
    <h1>Oracle Cards Reading</h1>
    <p class="sub">Ask a question, choose a spread, and draw guidance.</p>
  </header>

  <form class="card form" on:submit|preventDefault={compute}>
    <div class="grid">
      <label class="field">
        <span>Name (optional)</span>
        <input type="text" bind:value={name} placeholder="Your name" autocomplete="name" />
      </label>

      <label class="field">
        <span>Question / Focus</span>
        <input type="text" bind:value={question} placeholder="What would you like insight on?" />
      </label>

      <label class="field">
        <span>Deck</span>
        <select bind:value={deckKey}>
          {#each Object.values(DECKS) as d}
            <option value={d.key}>{d.name}</option>
          {/each}
        </select>
        <small class="hint">{DECKS[deckKey].description}</small>
      </label>

      <label class="field">
        <span>Spread</span>
        <select bind:value={spread}>
          {#each Object.entries(SPREADS) as [key, spec]}
            <option value={key}>{spec.label}</option>
          {/each}
        </select>
      </label>

      <label class="field check">
        <input type="checkbox" bind:checked={allowReversals} />
        <span>Allow reversals</span>
      </label>

      <label class="field">
        <span>Seed (advanced)</span>
        <input type="text" bind:value={seed} placeholder="Auto from inputs; set to share exact draw" />
      </label>
    </div>

    <div class="actions">
      <button class="btn primary" type="submit">Get reading</button>
      <button class="btn" type="button" on:click={shuffle}>Shuffle</button>
      <button class="btn" type="button" on:click={resetAll}>Reset</button>
    </div>

    <details class="note">
      <summary>About this reading</summary>
      <ul>
        <li>Draws are <b>without replacement</b> from the selected deck.</li>
        <li><b>Reversals</b> flip to the card's shadow/contrast meaning.</li>
        <li>Texts are short, original prompts—adapt them to your tradition.</li>
      </ul>
    </details>
  </form>

  {#if result}
    <section class="card result" aria-live="polite">
      <header class="result__header">
        <h2>{SPREADS[spread].label}</h2>
        {#if name || question}
          <p class="who">
            {#if name}for <strong>{name}</strong>{/if}
            {#if question}<span class="muted"> · "{question}"</span>{/if}
          </p>
        {/if}
      </header>

      <div class="result__grid">
        {#each result.draws as d}
          <div class="cardtile {d.orientation === 'reversed' ? 'rev' : ''}">
            <div class="cardtile__header">
              <div class="pos">{d.position}</div>
              <div class="title">{d.card.title}</div>
              {#if d.orientation === 'reversed'}<div class="orientation">reversed</div>{/if}
            </div>
            <div class="cardtile__body">
              <p class="kw">{d.card.keywords.join(' • ')}</p>
              <p>
                {d.orientation === 'reversed' && d.card.meaning.reversed
                  ? d.card.meaning.reversed
                  : d.card.meaning.upright}
              </p>
            </div>
          </div>
        {/each}

        <div class="synth">
          <h3>Synthesis</h3>
          <p>{result.synthesis}</p>
          <!-- <p class="fine">Deck: {DECKS[deckKey].name} · Seed: {result.seed}</p> -->
           <p class="fine">Deck: {DECKS[deckKey].name} </p>
        </div>
      </div>

      <div class="result__actions">
        <button class="btn" type="button" on:click={copyReading}>Copy reading</button>
        <button class="btn" type="button" on:click={copyLink}>Copy link</button>
        <button class="btn" type="button" on:click={printCard}>Print</button>
      </div>
    </section>
  {/if}

  
</div>
<FooterMain/>
<style>
  :root{
    --bg: #0c0d10;
    --card: #14161b;
    --soft: #1b1e24;
    --text: #e9ecf1;
    --muted: #b9c0cc;
    --fine: #fff;
    --brand: #7c6cff;
    --brand-2: #38d9a9;
    --ring: 0 0 0 3px rgba(124,108,255,0.35);
    --shadow: 0 10px 30px rgba(0,0,0,.35);
    --tile: #10131a;
    --border: #232733;
    --rev: #ffb4b4;
  }
  *{ box-sizing: border-box; }
  body { margin: 0; background: radial-gradient(1200px 700px at 20% -10%, #1a1b23, #0b0c10 60%), var(--bg); color: var(--text); }
  .wrap { max-width: 1024px; margin: 0 auto; padding: 28px 20px 80px; }

  .header { text-align: center; margin: 10px 0 24px; }
  .sub { margin: 6px 0 0; color: var(--muted); }

  .card { background: linear-gradient(180deg, var(--card), var(--soft)); border: 1px solid #1e222b; border-radius: 14px; box-shadow: var(--shadow); }

  .form { padding: 18px; }
  .grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
  @media (min-width: 860px){ .grid { grid-template-columns: repeat(3, 1fr); } }

  .field { display: flex; flex-direction: column; gap: 6px; }
  .field.check { flex-direction: row; align-items: center; gap: 10px; }
  .field > span { font-weight: 600; font-size: .95rem; }
  .hint { color: var(--fine); }

  input[type="text"], select {
    width: 100%; padding: 12px 12px; border-radius: 10px; border: 1px solid #232731; background: #0f1116; color: var(--text);
    outline: none; transition: box-shadow .15s ease, border-color .15s ease, transform .05s ease;
  }
  input:focus, select:focus { box-shadow: var(--ring); border-color: #3a3f52; }

  .actions { margin-top: 12px; display: flex; gap: 10px; flex-wrap: wrap; }
  .btn {
    appearance: none; border: 1px solid #2a3040; background: #11141b; color: var(--text);
    padding: 10px 14px; border-radius: 10px; cursor: pointer; font-weight: 600;
    transition: transform .05s ease, box-shadow .15s ease, border-color .15s ease;
  }
  .btn:hover { transform: translateY(-1px); border-color: #3d4458; }
  .btn.primary { background: linear-gradient(135deg, #7c6cff, #38d9a9); border: none; color: #fff; }

  .note { margin-top: 10px; color: var(--muted); }
  .note summary { cursor: pointer; }

  .result { margin-top: 18px; overflow: hidden; }
  .result__header {
    padding: 18px 18px 14px;
    background: radial-gradient(800px 400px at 10% -40%, rgba(124,108,255,.35), transparent),
                linear-gradient(180deg, #191b23, #14161b);
    border-bottom: 1px solid #242938;
  }
  .who { margin: 6px 0 0; color: var(--muted); }

  .result__grid { display: grid; gap: 16px; padding: 16px; grid-template-columns: 1fr; align-items: start; }
  @media (min-width: 980px){ .result__grid { grid-template-columns: repeat(2, 1fr); } }

  .cardtile {
    border: 1px solid var(--border); border-radius: 12px; background: var(--tile); padding: 12px;
    display: grid; gap: 8px;
  }
  .cardtile.rev { outline: 2px dashed var(--rev); outline-offset: 4px; }
  .cardtile__header { display: grid; grid-template-columns: auto 1fr auto; align-items: baseline; gap: 10px; }
  .pos { font-weight: 700; white-space: nowrap; }
  .title { font-weight: 800; }
  .orientation { color: var(--rev); font-weight: 700; text-transform: uppercase; font-size: .8rem; }
  .kw { margin: 0; color: var(--muted); }

  .synth { grid-column: 1 / -1; padding: 8px 6px; }
  .fine { color: var(--fine); }
  .muted { color: var(--muted); }

  .result__actions { display: flex; gap: 10px; padding: 0 16px 16px; flex-wrap: wrap; }

  @media print {
    body { background: #fff; color: #000; }
    .wrap { padding: 0; }
    .form, .footer, .header, .result__actions { display: none !important; }
    .card, .cardtile { border: none; box-shadow: none; background: #fff; }
  }
</style>
