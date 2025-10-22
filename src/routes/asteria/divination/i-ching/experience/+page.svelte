<script lang="ts">
  import FooterMain from '$lib/components/FooterMain.svelte';
  import { onMount } from 'svelte';

  type Method = 'coins' | 'yarrow';
  type YinYang = 'yin' | 'yang';
  type TrigramKey = 'qian' | 'dui' | 'li' | 'zhen' | 'xun' | 'kan' | 'gen' | 'kun';

  interface Line {
    value: 6 | 7 | 8 | 9;
    kind: YinYang;
    moving: boolean;
  }

  interface HexMeta {
    num: number;
    name: string;
    summary: string;
    upper: TrigramKey;
    lower: TrigramKey;
    bits: string;
  }

  interface TrigramInfo {
    name: string;
    alias: string;
    bits: string;
    symbol: string;
  }

  interface Result {
    seed: string;
    method: Method;
    lines: Line[];
    primary: HexMeta;
    relating?: HexMeta;
    movingPositions: number[];
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

  const TRIGRAMS: Record<TrigramKey, TrigramInfo> = {
    qian: { name: 'Qián', alias: 'Heaven',  bits: '111', symbol: '☰' },
    dui:  { name: 'Duì',  alias: 'Lake',    bits: '110', symbol: '☱' },
    li:   { name: 'Lí',    alias: 'Fire',   bits: '101', symbol: '☲' },
    zhen: { name: 'Zhèn', alias: 'Thunder', bits: '100', symbol: '☳' },
    xun:  { name: 'Xùn',  alias: 'Wind',    bits: '011', symbol: '☴' },
    kan:  { name: 'Kǎn',  alias: 'Water',   bits: '010', symbol: '☵' },
    gen:  { name: 'Gèn',  alias: 'Mountain',bits: '001', symbol: '☶' },
    kun:  { name: 'Kūn',  alias: 'Earth',   bits: '000', symbol: '☷' }
  };
  const bitsFrom = (upper: TrigramKey, lower: TrigramKey) => TRIGRAMS[lower].bits + TRIGRAMS[upper].bits;

  const H = (n: number, name: string, summary: string, upper: TrigramKey, lower: TrigramKey): HexMeta =>
    ({ num: n, name, summary, upper, lower, bits: bitsFrom(upper, lower) });

  const HEXES: HexMeta[] = [
    H( 1,'The Creative','Initiating force; create and lead.',              'qian','qian'),
    H( 2,'The Receptive','Nurture, receive, and support.',                 'kun','kun'),
    H( 3,'Difficulty at the Beginning','Birth pangs; organize chaos patiently.','kan','zhen'),
    H( 4,'Youthful Folly','Teachability; seek guidance, set limits.',      'gen','kan'),
    H( 5,'Waiting','Prepare and nourish; timing matters.',                 'kan','qian'),
    H( 6,'Conflict','Clarify terms; avoid futile battles.',                'qian','kan'),
    H( 7,'The Army','Discipline, alignment, service leadership.',          'kun','kan'),
    H( 8,'Holding Together','Unify people; commit and belong.',            'kan','kun'),
    H( 9,'Small Taming','Gentle restraint; accrue small gains.',           'xun','qian'),
    H(10,'Treading','Walk carefully; ethics and poise.',                   'qian','dui'),
    H(11,'Peace','Heaven and earth harmonize; flourishing.',               'kun','qian'),
    H(12,'Standstill','Blockage; maintain integrity, prune.',              'qian','kun'),
    H(13,'Fellowship','Shared purpose; bonds beyond kin.',                 'qian','li'),
    H(14,'Great Possession','Abundance; steward resources wisely.',        'li','qian'),
    H(15,'Modesty','Humility creates capacity; level excess.',             'kun','gen'),
    H(16,'Enthusiasm','Rouse the team; joy in rhythm.',                    'zhen','kun'),
    H(17,'Following','Adapt and follow what\'s alive.',                     'dui','zhen'),
    H(18,'Work on What Is Spoiled','Repair legacy issues; cleanse.',       'gen','xun'),
    H(19,'Approach','Noble approach; care draws near.',                    'kun','dui'),
    H(20,'Contemplation','Observe; clarify vision and example.',           'xun','kun'),
    H(21,'Biting Through','Decisive action; address obstacles.',           'li','zhen'),
    H(22,'Grace','Adorn with simplicity; form serves truth.',              'gen','li'),
    H(23,'Splitting Apart','Peel back; reduce to essentials.',             'gen','kun'),
    H(24,'Return','Turning point; come back to path.',                     'kun','zhen'),
    H(25,'Innocence','Act without ulterior motive; trust.',                'qian','zhen'),
    H(26,'Great Taming','Store great power; hold steady.',                 'gen','qian'),
    H(27,'Nourishment','Mind speech and diet; feed others.',               'gen','zhen'),
    H(28,'Great Exceeding','Excess load; brace and reform.',               'dui','xun'),
    H(29,'The Abysmal','Repeated risks; practice sincere courage.',        'kan','kan'),
    H(30,'The Clinging','Light and clarity; rely on vision.',              'li','li'),
    H(31,'Influence','Attraction through sincerity and joy.',              'dui','gen'),
    H(32,'Duration','Sustain commitments; steady flexibility.',            'zhen','xun'),
    H(33,'Retreat','Strategic withdrawal; preserve strength.',             'qian','gen'),
    H(34,'Great Power','Power with correctness; do not force.',            'zhen','qian'),
    H(35,'Progress','Advance with daylight; receive honours.',             'li','kun'),
    H(36,'Darkening of the Light','Conceal the light; endure.',            'kun','li'),
    H(37,'The Family','Order the household; roles and warmth.',            'xun','li'),
    H(38,'Opposition','Differences; maintain respect at distance.',        'li','dui'),
    H(39,'Obstruction','Difficult path; seek assistance.',                 'kan','gen'),
    H(40,'Deliverance','Release tension; forgiveness and exit.',           'zhen','kan'),
    H(41,'Decrease','Voluntary reduction; offer surplus.',                 'gen','dui'),
    H(42,'Increase','Augment blessings; act at the time.',                 'xun','zhen'),
    H(43,'Breakthrough','Announce truth; cut through.',                    'dui','qian'),
    H(44,'Coming to Meet','Unexpected encounter; set boundaries.',         'qian','xun'),
    H(45,'Gathering','Assemble community; shared offerings.',              'dui','kun'),
    H(46,'Pushing Upward','Step‑by‑step ascent; sincerity.',               'kun','xun'),
    H(47,'Oppression','Exhaustion; find inner resource.',                  'dui','kan'),
    H(48,'The Well','Return to the source; maintain.',                     'kan','xun'),
    H(49,'Revolution','Molting; change mandates clarity.',                 'dui','li'),
    H(50,'The Cauldron','Transform through culture and care.',             'li','xun'),
    H(51,'The Arousing','Shock; awaken and mobilize.',                     'zhen','zhen'),
    H(52,'Keeping Still','Stillness; stop and stabilize.',                 'gen','gen'),
    H(53,'Gradual Progress','Slow growth; rites of passage.',              'xun','gen'),
    H(54,'The Marrying Maiden','Secondary role; right timing.',            'zhen','dui'),
    H(55,'Abundance','Fullness; manage the peak wisely.',                  'zhen','li'),
    H(56,'The Wanderer','Travel lightly; be courteous.',                   'li','gen'),
    H(57,'The Gentle','Penetrating wind; persistent influence.',           'xun','xun'),
    H(58,'The Joyous','Open exchange; encourage and cheer.',               'dui','dui'),
    H(59,'Dispersion','Dissolve barriers; reunite the waters.',            'xun','kan'),
    H(60,'Limitation','Boundaries and measure; structure freedom.',        'kan','dui'),
    H(61,'Inner Truth','Sincerity; trust builds bridges.',                 'xun','dui'),
    H(62,'Small Exceeding','Attend to the small; caution.',                'zhen','gen'),
    H(63,'After Completion','Just finished; test and maintain.',           'kan','li'),
    H(64,'Before Completion','Not yet done; cross carefully.',             'li','kan'),
  ];
  const BITS_TO_HEX = new Map<string, HexMeta>(HEXES.map(h => [h.bits, h]));

  function castLineCoins(rng: () => number): 6 | 7 | 8 | 9 {
    const v = [0,1,2].reduce(s => s + (rng() < 0.5 ? 2 : 3), 0);
    return v as 6 | 7 | 8 | 9;
  }
  function castLineYarrow(rng: () => number): 6 | 7 | 8 | 9 {
    const r = Math.floor(rng() * 16);
    if (r === 0) return 6;
    if (r <= 5)  return 7;
    if (r <= 12) return 8;
    return 9;
  }

  function toLine(val: 6|7|8|9): Line {
    if (val === 6) return { value: 6, kind: 'yin',  moving: true  };
    if (val === 7) return { value: 7, kind: 'yang', moving: false };
    if (val === 8) return { value: 8, kind: 'yin',  moving: false };
    return           { value: 9, kind: 'yang', moving: true  };
  }

  const bitsFromLines = (lines: Line[]) => lines.map(l => l.kind === 'yang' ? '1' : '0').join('');

  function flipMoving(bits: string, lines: Line[]): string {
    const arr = bits.split('');
    for (let i = 0; i < 6; i++) {
      if (lines[i].moving) arr[i] = arr[i] === '1' ? '0' : '1';
    }
    return arr.join('');
  }

  let name = '';
  let question = '';
  let method: Method = 'coins';
  let seed = '';
  let result: Result | null = null;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    name = params.get('name') ?? '';
    question = params.get('q') ?? '';
    const m = params.get('m'); method = (m === 'yarrow' ? 'yarrow' : 'coins');
    seed = params.get('s') ?? '';
    if (seed || question) compute();
  });

  const POS_THEME: Record<number,string> = {
    1:'Beginnings, hidden potential.',
    2:'Inner alignment, relationships.',
    3:'Crossroads, friction, perseverance.',
    4:'Transition, preparation, vantage.',
    5:'Sovereignty, influence, blessing.',
    6:'Culmination, excess, perspective.'
  };
  function movingNote(l: Line): string {
    if (l.value === 6) return 'Yielding turns to active; step forward with clarity.';
    if (l.value === 9) return 'Strong turns to flexible; temper force and listen.';
    return '';
  }

  function buildSeed(): string {
    const base = [
      (name || '').trim().toLowerCase(),
      (question || '').trim().toLowerCase(),
      method
    ].join('|');
    return base || `rnd-${Date.now()}`;
  }

  function pushQuery() {
    const url = new URL(window.location.href);
    name ? url.searchParams.set('name', name) : url.searchParams.delete('name');
    question ? url.searchParams.set('q', question) : url.searchParams.delete('q');
    url.searchParams.set('m', method);
    seed ? url.searchParams.set('s', seed) : url.searchParams.delete('s');
    window.history.replaceState({}, '', url.toString());
  }

  function compute() {
    seed = seed || buildSeed();
    const rng = prngFromSeed(seed);
    const caster = method === 'yarrow' ? castLineYarrow : castLineCoins;

    const lines: Line[] = Array.from({ length: 6 }, () => toLine(caster(rng)));

    const bits = bitsFromLines(lines);
    const primary = BITS_TO_HEX.get(bits);
    if (!primary) { alert('Unexpected hexagram pattern.'); return; }

    const movingPositions = lines.map((l,i) => l.moving ? i+1 : 0).filter(Boolean);

    let relating: HexMeta | undefined;
    if (movingPositions.length) {
      const flipped = flipMoving(bits, lines);
      relating = BITS_TO_HEX.get(flipped);
    }

    result = {
      seed, method, lines,
      primary: primary!,
      relating,
      movingPositions
    };
    pushQuery();
  }

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
    const L = result.lines;
    const lineTxt = (i: number) => {
      const l = L[i-1];
      const sym = l.kind === 'yang' ? '—' : '– –';
      const mv = l.moving ? ' (changing)' : '';
      return `Line ${i}: ${sym}${mv}`;
    };
    const moving = result.movingPositions.map(i => {
      const l = L[i-1];
      return `• Line ${i}: ${movingNote(l)} (${POS_THEME[i]})`;
    });

    const linesBlock = [6,5,4,3,2,1].map(lineTxt).join('\n');

    const parts = [
      name ? `For: ${name}` : '',
      question ? `Question: ${question}` : '',
      `Method: ${result.method === 'yarrow' ? 'Yarrow weights' : 'Three‑coins'}`,
      `Primary: #${result.primary.num} ${result.primary.name} — ${result.primary.summary}`,
      `Lines (top→bottom):\n${linesBlock}`,
      result.relating ? `Relating: #${result.relating.num} ${result.relating.name} — ${result.relating.summary}` : '',
      moving.length ? `Changing lines:\n${moving.join('\n')}` : '',
      `Seed: ${result.seed}`
    ].filter(Boolean).join('\n\n');

    try { await navigator.clipboard.writeText(parts); } catch {}
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); } catch {}
  }

  function printCard() { window.print(); }

  function trigramLabel(key: TrigramKey) {
    const t = TRIGRAMS[key];
    return `${t.symbol} ${t.name} — ${t.alias}`;
  }
</script>

<div class="wrap">
  <header class="header">
    <h1>I Ching Reading</h1>
    <p class="sub">Ask a question, choose a method, and cast the hexagram.</p>
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
        <span>Method</span>
        <select bind:value={method}>
          <option value="coins">Three‑Coins (classic)</option>
          <option value="yarrow">Yarrow‑style weights</option>
        </select>
        <small class="hint">Yarrow gives fewer changing lines (6:1/16, 9:3/16).</small>
      </label>

      <label class="field">
        <span>Seed (advanced)</span>
        <input type="text" bind:value={seed} placeholder="Auto from inputs; set to share exact cast" />
      </label>
    </div>

    <div class="actions">
      <button class="btn primary" type="submit">Get reading</button>
      <button class="btn" type="button" on:click={shuffle}>Shuffle</button>
      <button class="btn" type="button" on:click={() => { result=null; seed=''; }}>Reset</button>
    </div>

    <details class="note">
      <summary>How it works</summary>
      <ul>
        <li><b>Lines:</b> 6 (old yin, moving) · 7 (young yang) · 8 (young yin) · 9 (old yang, moving)</li>
        <li><b>Primary</b> from current lines; <b>Relating</b> flips only the moving lines.</li>
        <li>Summaries are concise and lineage‑neutral; use your own commentary if you prefer.</li>
      </ul>
    </details>
  </form>

  {#if result}
    <section class="card result" aria-live="polite">
      <header class="result__header">
        <h2>#{result.primary.num} {result.primary.name}</h2>
        {#if name || question}
          <p class="who">
            {#if name}for <strong>{name}</strong>{/if}
            {#if question}<span class="muted"> · "{question}"</span>{/if}
          </p>
        {/if}
        <p class="muted">{result.primary.summary}</p>
      </header>

      <div class="result__grid">
        <div class="hexcard">
          <div class="hex">
            {#each [...result.lines].slice().reverse() as l}
              <div class="line {l.kind} {l.moving ? 'moving' : ''}">
                <span class="seg"></span>
                <span class="seg gap"></span>
                <span class="seg"></span>
              </div>
            {/each}
          </div>

          <div class="meta">
            <div class="tri">
              <span>Upper:</span>
              <strong>{trigramLabel(result.primary.upper)}</strong>
            </div>
            <div class="tri">
              <span>Lower:</span>
              <strong>{trigramLabel(result.primary.lower)}</strong>
            </div>
          </div>
        </div>

        {#if result.movingPositions.length}
          <div class="changes">
            <h3>Changing lines</h3>
            <ul>
              {#each result.movingPositions as pos}
                <li>
                  <strong>Line {pos}</strong> — {POS_THEME[pos]}
                  <div class="fine">{movingNote(result.lines[pos-1])}</div>
                </li>
              {/each}
            </ul>

            {#if result.relating}
              <div class="relating">
                <h3>Relating hexagram</h3>
                <p>
                  <strong>#{result.relating.num} {result.relating.name}</strong>
                  <span class="muted"> — {result.relating.summary}</span>
                </p>
                <div class="trirow">
                  <span>Upper:</span> <span>{trigramLabel(result.relating.upper)}</span>
                  <span>Lower:</span> <span>{trigramLabel(result.relating.lower)}</span>
                </div>
              </div>
            {/if}
          </div>
        {/if}

        <div class="synth">
          <h3>Synthesis</h3>
          <p>
            {#if result.movingPositions.length === 0}
              Stable situation. Act according to the primary hexagram's counsel.
            {:else if result.movingPositions.length === 1}
              Focus on the single changing line; the situation evolves toward the relating hexagram.
            {:else if result.movingPositions.length <= 3}
              Multiple changes: read each moving line, then consider the relating hexagram as the trend.
            {:else}
              Many changes indicate flux. Emphasize the primary hexagram's core stance while conditions shift.
            {/if}
          </p>
          <p class="fine">Method: {result.method === 'yarrow' ? 'Yarrow weights' : 'Three‑coins'}</p>
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
    --fine: #9aa3b2;
    --brand: #7c6cff;
    --brand-2: #38d9a9;
    --accent: #ffd166;
    --ring: 0 0 0 3px rgba(124,108,255,0.35);
    --shadow: 0 10px 30px rgba(0,0,0,.35);
  }
  *{ box-sizing: border-box; }
  .wrap { max-width: 1000px; margin: 0 auto; padding: 28px 20px 80px; }

  .header { text-align: center; margin: 10px 0 24px; }
  .sub { margin: 6px 0 0; color: var(--muted); }

  .card { background: linear-gradient(180deg, var(--card), var(--soft)); border: 1px solid #1e222b; border-radius: 14px; box-shadow: var(--shadow); }

  .form { padding: 18px; }
  .grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
  @media (min-width: 820px){ .grid { grid-template-columns: repeat(4, 1fr); } }

  .field { display: flex; flex-direction: column; gap: 6px; }
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
  @media (min-width: 980px){ .result__grid { grid-template-columns: 1fr 1fr; } }

  .hexcard { padding: 8px 6px; }
  .hex {
    display: grid; gap: 10px; padding: 6px 0; width: min(360px, 100%);
  }
  .line {
    display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  }
  .line .seg { height: 10px; background: #e8ecf6; border-radius: 6px; border: 1px solid #333a4a; }
  .line .gap { width: 26px; background: transparent; border: 1px dashed #2a3040; height: 6px; }
  .line.yang { grid-template-columns: 1fr; }
  .line.yang .seg { grid-column: 1 / -1; }
  .line.moving .seg:not(.gap) { box-shadow: 0 0 0 2px var(--accent) inset; }

  .meta { margin-top: 10px; color: var(--muted); display: grid; gap: 8px; }
  .meta .tri { display: flex; gap: 8px; align-items: baseline; }
  .meta .tri span { color: var(--fine); }

  .changes { padding: 8px 6px; }
  .changes ul { margin: 8px 0; padding-left: 18px; }
  .changes li { margin: 6px 0; }
  .relating { margin-top: 12px; padding-top: 10px; border-top: 1px solid #262b3a; }
  .trirow { display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; color: var(--muted); }

  .synth { grid-column: 1 / -1; padding: 8px 6px; }
  .fine { color: var(--fine); }
  .muted { color: var(--muted); }

  .result__actions { display: flex; gap: 10px; padding: 0 16px 16px; flex-wrap: wrap; }

  @media print {
    .wrap { padding: 0; }
    .form, .footer, .header, .result__actions { display: none !important; }
    .card, .hex, .line .seg { border: none; box-shadow: none; background: #000; }
    .line .gap { border: none; }
  }
</style>
