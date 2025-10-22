<script lang="ts">
  import { onMount } from 'svelte';

  // ———————————————————————————————————————————————
  // Types
  // ———————————————————————————————————————————————
  type Orientation = 'upright' | 'reversed';
  type SpreadKey = 'single' | 'three' | 'norn' | 'five';

  interface Rune {
    id: string;
    glyph: string;      // Unicode rune symbol
    name: string;       // primary name
    alias?: string;     // alternative name(s)
    keywords: string[]; // short tags
    reversible: boolean;
    meaning: {
      upright: string;
      reversed?: string; // ignored if reversible === false
    };
  }

  interface DrawnRune {
    rune: Rune;
    orientation: Orientation;
    position: string;
  }

  interface Result {
    seed: string;
    draws: DrawnRune[];
    synthesis: string;
  }

  // ———————————————————————————————————————————————
  // Data: Elder Futhark (24) + optional Blank
  // (Summaries are concise, lineage‑neutral. Edit to your tradition.)
  // ———————————————————————————————————————————————
  const RUNES: Rune[] = [
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

  const BLANK_RUNE: Rune = {
    id: 'blank', glyph: '•', name: 'Blank Rune', alias: 'Odin's Rune', keywords: ['unknown','fate','surrender'],
    reversible: false,
    meaning: { upright: 'The unknowable; yield control and trust emergence.' }
  };

  // ———————————————————————————————————————————————
  // Spreads
  // ———————————————————————————————————————————————
  const SPREADS: Record<SpreadKey, { label: string; size: number; positions: string[] }> = {
    single: { label: 'Single Rune — Focus', size: 1, positions: ['Focus'] },
    three:  { label: 'Three Runes — Past • Present • Guidance', size: 3, positions: ['Past','Present','Guidance'] },
    norn:   { label: 'Norn Spread — Was • Is • Becoming', size: 3, positions: ['Past (Urd)','Present (Verdandi)','Future (Skuld)'] },
    five:   { label: 'Five Runes — Situation • Challenge • Root • Advice • Outcome', size: 5,
              positions: ['Situation','Challenge','Root Cause','Advice','Likely Outcome'] }
  };

  // ———————————————————————————————————————————————
  // Deterministic PRNG (xmur3 + mulberry32)
  // ———————————————————————————————————————————————
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

  // ———————————————————————————————————————————————
  // UI State
  // ———————————————————————————————————————————————
  let name = '';
  let question = '';
  let readingDate = '';              // yyyy-mm-dd (optional, used in seed/share)
  let spread: SpreadKey = 'three';
  let allowReversals = true;
  let includeBlank = false;

  let seed = '';                     // computed or provided via query
  let result: Result | null = null;

  let todayStr = '';
  onMount(() => {
    const t = new Date();
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, '0');
    const dd = String(t.getDate()).padStart(2, '0');
    todayStr = `${yyyy}-${mm}-${dd}`;
    if (!readingDate) readingDate = todayStr;

    // Load from query params if present
    const params = new URLSearchParams(window.location.search);
    name = params.get('name') ?? '';
    question = params.get('q') ?? '';
    const sp = params.get('spread') as SpreadKey | null;
    if (sp && SPREADS[sp]) spread = sp;
    allowReversals = params.get('rev') === '0' ? false : true;
    includeBlank = params.get('blank') === '1';
    const qSeed = params.get('s'); if (qSeed) seed = qSeed;
    const qDate = params.get('date'); if (qDate) readingDate = qDate;

    // Auto-compute on load if seed or question exists
    if (seed || question) compute();
  });

  // ———————————————————————————————————————————————
  // Core: draw + reading
  // ———————————————————————————————————————————————
  function buildSeed(): string {
    // Stable seed from inputs (trim + normalize). If seed textbox not set, compute one.
    const base = [
      name.trim().toLowerCase(),
      question.trim().toLowerCase(),
      readingDate || '',
      spread,
      allowReversals ? 'rev1' : 'rev0',
      includeBlank ? 'blank1' : 'blank0'
    ].join('|');
    return base || `rnd-${Date.now()}`;
  }

  function drawRunes(count: number, rng: () => number): DrawnRune[] {
    const pool: Rune[] = [...RUNES];
    if (includeBlank) pool.push(BLANK_RUNE);
    const picks: DrawnRune[] = [];
    const pos = SPREADS[spread].positions;

    for (let i = 0; i < count; i++) {
      if (!pool.length) break;
      const idx = Math.floor(rng() * pool.length);
      const rune = pool.splice(idx, 1)[0];
      const orientation: Orientation =
        allowReversals && rune.reversible && rng() < 0.5 ? 'reversed' : 'upright';
      picks.push({ rune, orientation, position: pos[i] });
    }
    return picks;
  }

  function synthesize(draws: DrawnRune[]): string {
    const tags = new Map<string, number>();
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
    return `${headline}. ${modNotes}`;
  }

  function compute() {
    seed = seed || buildSeed();
    const rng = prngFromSeed(seed);
    const size = SPREADS[spread].size;
    const draws = drawRunes(size, rng);
    const synthesis = synthesize(draws);
    result = { seed, draws, synthesis };
    pushQuery();
  }

  function resetAll() {
    result = null;
    seed = '';
  }

  function shuffle() {
    // New random seed (browser crypto if available)
    try {
      const a = new Uint32Array(1);
      crypto.getRandomValues(a);
      seed = `rnd-${a[0].toString(36)}`;
    } catch {
      seed = `rnd-${Math.floor(Math.random()*1e9).toString(36)}`;
    }
    compute();
  }

  function pushQuery() {
    const url = new URL(window.location.href);
    name ? url.searchParams.set('name', name) : url.searchParams.delete('name');
    question ? url.searchParams.set('q', question) : url.searchParams.delete('q');
    readingDate ? url.searchParams.set('date', readingDate) : url.searchParams.delete('date');
    url.searchParams.set('spread', spread);
    url.searchParams.set('rev', allowReversals ? '1' : '0');
    url.searchParams.set('blank', includeBlank ? '1' : '0');
    if (seed) url.searchParams.set('s', seed); else url.searchParams.delete('s');
    window.history.replaceState({}, '', url.toString());
  }

  async function copyReading() {
    if (!result) return;
    const lines = [
      name ? `For: ${name}` : '',
      question ? `Question: ${question}` : '',
      readingDate ? `Date: ${readingDate}` : '',
      `Spread: ${SPREADS[spread].label}`,
      ...result.draws.map(d => {
        const o = d.orientation === 'reversed' ? ' (reversed)' : '';
        const m = d.orientation === 'reversed' && d.rune.reversible && d.rune.meaning.reversed
          ? d.rune.meaning.reversed
          : d.rune.meaning.upright;
        return `${d.position}: ${d.rune.glyph} ${d.rune.name}${o} — ${m}`;
      }),
      `Synthesis: ${result.synthesis}`,
      `Seed: ${result.seed}`
    ].filter(Boolean).join('\n');
    try { await navigator.clipboard.writeText(lines); } catch {}
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); } catch {}
  }

  function printCard() {
    window.print();
  }
</script>

<!-- ———————————————————————————————————————————————
     Layout
——————————————————————————————————————————————— -->
<div class="wrap">
  <header class="header">
    <h1>Runes Reading</h1>
    <p class="sub">Ask a question, choose a spread, and cast the runes.</p>
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
        <span>Reading date</span>
        <input type="date" bind:value={readingDate} max={todayStr} />
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
        <span>Allow reversals (merkstave)</span>
      </label>

      <label class="field check">
        <input type="checkbox" bind:checked={includeBlank} />
        <span>Include Blank Rune (Odin's Rune)</span>
      </label>

      <label class="field">
        <span>Seed (advanced) </span>
        <input type="text" bind:value={seed} placeholder="Auto from inputs; set to share exact draw" />
        <small class="hint">Set this to fix a specific draw; otherwise it's built from your inputs.</small>
      </label>
    </div>

    <div class="actions">
      <button class="btn primary" type="submit">Get reading</button>
      <button class="btn" type="button" on:click={shuffle}>Shuffle</button>
      <button class="btn" type="button" on:click={resetAll}>Reset</button>
    </div>

    <details class="note">
      <summary>About reversals & the blank rune</summary>
      <p>Some traditions don't use reversals for certain runes (e.g., Gebo, Isa, Jera, Eihwaz, Sowilo, Ingwaz, Dagaz), and some omit the blank rune entirely. This tool lets you choose.</p>
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
          <div class="rune">
            <div class="glyph" aria-hidden="true">{d.rune.glyph}</div>
            <div class="meta">
              <h3>{d.position}</h3>
              <p class="title">{d.rune.name}
                {#if d.rune.alias}<span class="muted">({d.rune.alias})</span>{/if}
                {#if d.orientation === 'reversed'} <em class="rev">reversed</em>{/if}
              </p>
              <p class="kw">{d.rune.keywords.join(' • ')}</p>
              <p>
                {d.orientation === 'reversed' && d.rune.reversible && d.rune.meaning.reversed
                  ? d.rune.meaning.reversed
                  : d.rune.meaning.upright}
              </p>
            </div>
          </div>
        {/each}

        <div class="synth">
          <h3>Synthesis</h3>
          <p>{result.synthesis}</p>
          <p class="fine">Seed: {result.seed}</p>
        </div>
      </div>

      <div class="result__actions">
        <button class="btn" type="button" on:click={copyReading}>Copy reading</button>
        <button class="btn" type="button" on:click={copyLink}>Copy link</button>
        <button class="btn" type="button" on:click={printCard}>Print</button>
      </div>
    </section>
  {/if}

  <footer class="footer">
    <p class="fine">© {new Date().getFullYear()} · For inspiration and reflection only.</p>
  </footer>
</div>

<style>
  :root{
    --bg: #0c0d10;
    --card: #14161b;
    --soft: #1b1e24;
    --text: #e9ecf1;
    --muted: #b9c0cc;
    --fine: #9aa3b2;
    --brand: #7c6cff;
    --brand-2: #38d9a9;
    --ring: 0 0 0 3px rgba(124,108,255,0.35);
    --shadow: 0 10px 30px rgba(0,0,0,.35);
  }
  *{ box-sizing: border-box; }
  body { margin: 0; background: radial-gradient(1200px 700px at 20% -10%, #1a1b23, #0b0c10 60%), var(--bg); color: var(--text); }
  .wrap { max-width: 960px; margin: 0 auto; padding: 28px 20px 80px; }

  .header { text-align: center; margin: 10px 0 24px; }
  .sub { margin: 6px 0 0; color: var(--muted); }

  .card { background: linear-gradient(180deg, var(--card), var(--soft)); border: 1px solid #1e222b; border-radius: 14px; box-shadow: var(--shadow); }

  .form { padding: 18px; }
  .grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
  @media (min-width: 760px){ .grid { grid-template-columns: repeat(3, 1fr); } }

  .field { display: flex; flex-direction: column; gap: 6px; }
  .field.check { flex-direction: row; align-items: center; gap: 10px; }
  .field > span { font-weight: 600; font-size: .95rem; }

  input[type="text"], input[type="date"], select {
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
  .btn.primary { background: linear-gradient(135deg, var(--brand), var(--brand-2)); border: none; color: #0c0d10; }

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
  @media (min-width: 880px){ .result__grid { grid-template-columns: repeat(2, 1fr); } }

  .rune {
    display: grid; grid-template-columns: 84px 1fr; gap: 12px; padding: 12px; border: 1px solid #232733; border-radius: 12px; background: #10131a;
  }
  .glyph {
    font-size: 64px; line-height: 1; text-align: center; background: #0d0f15; border: 1px solid #232733; border-radius: 10px; display: grid; place-items: center;
  }
  .title { margin: 4px 0 2px; font-weight: 700; }
  .kw { margin: 0 0 6px; color: var(--muted); }
  .rev { color: #ffb4b4; font-style: normal; font-weight: 700; margin-left: 6px; }

  .synth { grid-column: 1 / -1; padding: 8px 6px; }
  .fine { color: var(--fine); }
  .muted { color: var(--muted); }

  .result__actions { display: flex; gap: 10px; padding: 0 16px 16px; flex-wrap: wrap; }

  /* Print */
  @media print {
    body { background: #fff; color: #000; }
    .wrap { padding: 0; }
    .form, .footer, .header, .result__actions { display: none !important; }
    .card, .rune { border: none; box-shadow: none; background: #fff; }
    .glyph { border: none; background: #fff; }
  }
</style>
