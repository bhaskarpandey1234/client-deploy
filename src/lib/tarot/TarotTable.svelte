<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { fly } from 'svelte/transition';
  import TarotCard from './TarotCard.svelte';
  import FanDeck from './FanDeck.svelte';
  import { buildDeck, deal, type DealtCard, type Card, RNG } from './tarot';
  import type { Spread } from './spreads';
  import { interpretSpread } from './reading';
  import * as sound from '../sound';
  import * as haptics from '../haptics';
  import { toPng } from 'html-to-image';
  import { THEMES as SOUND_THEMES, getTheme, setTheme } from '../sound';

  export let spread: Spread;
  export let seed = `tarot|${Date.now()}`;
  export let reversedChance = 0.45;

  // Modes
  let deckMode: 'stack' | 'fan' = 'fan';

  // Deck / table state
  let deck: Card[] = [];
  let remaining: Card[] = [];
  let placed: Record<string, DealtCard | undefined> = {};
  let faceUp: Record<string, boolean> = {};
  let flipPulse: Record<string, boolean> = {};
  let reading: ReturnType<typeof interpretSpread> | null = null;
  let usedCardIds: string[] = []; // Track used card IDs

  // Fan direct placement helpers
  let armedSlot: string | null = null;
  let fanDeck: FanDeck;

  // --- Select-N auto-place ---
  let selectNActive = false;
  let selectNCount = 3;           // defaults adjusted by spread (see reactive block)
  let armedSequence: string[] = []; // queue of slot ids to fill in order

  // Export PNG
  let exportNode: HTMLElement | null = null;
  
  // Sound theme
  let themeSel = getTheme();

  export function reset(shuffleSeed = seed) {
    deck = buildDeck();
    remaining = deck.slice();
    placed = {};
    faceUp = {};
    flipPulse = {};
    reading = null;
    usedCardIds = [];
    seed = shuffleSeed;
    armedSlot = null;
    selectNActive = false;
    armedSequence = [];
    fanDeck?.resetSelection();
  }

  // position order for auto placement
  function sequenceForSpread(s: Spread): string[] {
    // Use declared order in the spread definition (Three-card already Past/Present/Future order)
    return s.positions.map(p => p.id);
  }

  // Keep default N aligned to current spread
  $: {
    const defaultN = spread.key === 'three' ? 3 : 10;
    const unfilled = sequenceForSpread(spread).filter(id => !placed[id]);
    // Update N only if not actively selecting (to avoid fighting user)
    if (!selectNActive) selectNCount = Math.min(defaultN, unfilled.length);
  }

  function unfilledCount() {
    return sequenceForSpread(spread).filter(id => !placed[id]).length;
  }

  function canDeal() {
    return unfilledCount() > 0;
  }

  function nextSlotId(): string | null {
    const slot = spread.positions.find(p => !placed[p.id]);
    return slot ? slot.id : null;
  }

  // --- Dealing (stack) ---
  function dealTo(slotId: string) {
    if (placed[slotId]) return;
    const { dealt, rest } = deal(1, { seed, reversedChance }, remaining);
    remaining = rest;
    const c = dealt[0];
    place(slotId, c);
  }

  function dealNext() {
    const slot = nextSlotId();
    if (!slot) return;
    dealTo(slot);
  }

  // --- Dealing (fan): pick a specific index from remaining ---
  function pickFromFan(deckIndex: number) {
    if (remaining.length === 0) return;

    // Target logic: if Select-N is active use its queue; else use armed slot; else next free
    let target = (selectNActive && armedSequence.length > 0)
      ? armedSequence.shift()!
      : (armedSlot ?? nextSlotId());

    if (!target) return;

    const base = remaining[deckIndex];
    remaining.splice(deckIndex, 1);

    // decide reversed using stable RNG including seed, slot, and deck index
    const rng = new RNG(`${seed}|${target}|i${deckIndex}`);
    const reversed = rng.next() < reversedChance;
    const dealt: DealtCard = { ...base, reversed, dealId: `${base.id}:${seed}:${target}:${deckIndex}` };
    place(target, dealt);

    if (selectNActive && armedSequence.length === 0) {
      selectNActive = false; // finished auto placing
    }
    armedSlot = null; // clear any manual arm after a placement
  }

  // Shared place & feedback
  function place(slotId: string, card: DealtCard) {
    placed[slotId] = card;
    faceUp[slotId] = false; // Always start face down
    usedCardIds = [...usedCardIds, card.id]; // Track used cards
    sound.playCast();
    haptics.vibrate([8, 16, 8]);
    maybeComputeReading();
  }

  function flip(slotId: string) {
    if (!placed[slotId]) return;
    faceUp[slotId] = !faceUp[slotId];
    sound.playSettle();
    haptics.vibrate([6, 18, 6]);
    maybeComputeReading();
  }

  function flipAll() {
    // Only flip cards that are placed and not already face up
    for (const p of spread.positions) {
      if (placed[p.id] && !faceUp[p.id]) {
        faceUp[p.id] = true;
      }
    }
    sound.playSettle();
    haptics.vibrate([10, 22, 10]);
    maybeComputeReading();
  }

  // NEW: Cinematic wave flip (stagger w/ pulse highlight)
  async function flipAllCinematic() {
    const order = [...spread.positions]; // left-to-right as defined
    for (const pos of order) {
      if (placed[pos.id] && !faceUp[pos.id]) {
        faceUp[pos.id] = true;
        flipPulse[pos.id] = true;
        sound.playSettle();
        haptics.vibrate([8, 28, 8]);
        await tick();
        await new Promise(r => setTimeout(r, 140));
        flipPulse[pos.id] = false;
      }
    }
    maybeComputeReading();
  }

  function allDealt() { return spread.positions.every(p => placed[p.id]); }

  function maybeComputeReading() {
    const anyUp = spread.positions.some(p => faceUp[p.id]);
    if (!anyUp) {
      reading = null;
      return;
    }
    // Only pass cards that are face up
    const flippedCards: Record<string, DealtCard | undefined> = {};
    for (const pos of spread.positions) {
      if (faceUp[pos.id] && placed[pos.id]) {
        flippedCards[pos.id] = placed[pos.id];
      }
    }
    reading = interpretSpread(spread, flippedCards);
  }

  // --- Select N helpers ---
  function startSelectN() {
    const order = sequenceForSpread(spread).filter(id => !placed[id]);
    const maxN = Math.min(selectNCount, order.length, remaining.length);
    if (maxN <= 0) return;
    armedSequence = order.slice(0, maxN);
    selectNActive = true;
    deckMode = 'fan'; // ensure fan is visible
  }
  function cancelSelectN() {
    selectNActive = false;
    armedSequence = [];
  }

  // --- Export PNG (spread + reading)
  async function exportPNG() {
    if (!exportNode) return;
    try {
      const dataUrl = await toPng(exportNode, {
        cacheBust: true,
        pixelRatio: Math.max(2, window.devicePixelRatio || 1),
        backgroundColor: '#0b0f14'
      });
      const a = document.createElement('a');
      const ts = new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
      a.href = dataUrl;
      a.download = `tarot-${spread.key}-${ts}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
      alert('Export failed. Check console for details.');
    }
  }

  onMount(() => reset(seed));
</script>

<div class="board">
  <!-- LEFT: Deck & Controls -->
  <div class="deck-area">
    <div class="mode">
      <button class="seg {deckMode==='fan'?'a':''}" on:click={() => {deckMode='fan'; reset();}}>Fan</button>
      <button class="seg {deckMode==='stack'?'a':''}" on:click={() => {deckMode='stack'; reset();}}>Stack</button>
    </div>

    {#if deckMode==='stack'}
      <div class="stack" on:click={dealNext} title="Draw next card from stack">
        {#each Array(5) as _,i}<div class="stub" style={`transform: translateY(${-i*2}px) translateX(${i*2}px);`}></div>{/each}
      </div>
    {:else}
      <FanDeck bind:this={fanDeck} {remaining} {seed} {usedCardIds} maxSelections={spread.positions.length} on:pick={(e) => pickFromFan(e.detail)} />
      <!-- <div class="hint small">
        • Click a slot to <strong>arm</strong> it (gold border), then pick from the fan to place there.<br/>
        • Or use <strong>Select N</strong> to auto‑fill slots in order.
      </div> -->
    {/if}

    <div class="controls">
      <button class="button" on:click={() => reset(`tarot|${Date.now()}`)}>Reset</button>
      <!-- <button class="button" disabled={!allDealt()} on:click={flipAll}>Flip all</button>
      <button class="button" disabled={!allDealt()} on:click={flipAllCinematic}>Flip all — cinematic</button> -->
      <button class="button" on:click={exportPNG}>Export PNG</button>
      
      <!-- <label class="row">Sound
        <select class="button" bind:value={themeSel} on:change={() => setTheme(themeSel)}>
          {#each SOUND_THEMES as t}<option value={t}>{t}</option>{/each}
        </select>
      </label> -->

      <!-- <div class="autoplace">
        <div class="subtitle">Auto‑place (Select N)</div>
        <label class="row">
          N
          <input type="number" min="1" max={unfilledCount()} bind:value={selectNCount} />
          <span class="small">of {unfilledCount()}</span>
        </label>
        <div class="row" style="gap:8px;">
          <button class="button" on:click={startSelectN} disabled={unfilledCount()===0 || remaining.length===0}>Start</button>
          <button class="button" on:click={cancelSelectN} disabled={!selectNActive}>Cancel</button>
        </div>
        {#if selectNActive}
          <div class="small">Selecting… remaining: {armedSequence.length}</div>
        {/if}
      </div> -->

      <!-- <label class="slider">Reversed
        <input type="range" min="0" max="1" step="0.01" bind:value={reversedChance}>
        <span>{Math.round(reversedChance*100)}%</span>
      </label> -->
    </div>
  </div>

  <!-- RIGHT 2 COLUMNS: Spread + Reading (export area) -->
  <div class="export-wrap" bind:this={exportNode}>
    <div class="spread">
      {#each spread.positions as pos (pos.id)}
        <div
          class="slot {armedSlot===pos.id && !placed[pos.id] ? 'armed' : ''} {placed[pos.id] ? 'selected' : ''} {flipPulse[pos.id] ? 'pulse' : ''}"
          style={`left:${pos.x*100}%; top:${pos.y*100}%`}>
          {#if placed[pos.id]}
            <div in:fly={{ x: -120, y: -120, duration: 280 }}>
              <TarotCard
                card={placed[pos.id]}
                faceUp={!!faceUp[pos.id]}
                reversed={placed[pos.id]?.reversed ?? false}
                on:click={() => flip(pos.id)}
                clickable
                labelUnder={pos.label}
              />
            </div>
            {#if spread.key==='celtic' && pos.id==='2'}
              <div class="cross-overlay" aria-hidden="true"></div>
            {/if}
          {:else}
            <div
              class="shadow"
              on:click={() => {
                if (selectNActive) return; // block manual arming during auto-place
                if (deckMode==='fan') { armedSlot = (armedSlot === pos.id ? null : pos.id); }
                else { dealTo(pos.id); }
              }}>
              <div class="placeholder">{pos.label}</div>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <div class="reading card">
      {#if reading}
        <div class="subtitle">Headline</div>
        <div class="headline">{reading.headline}</div>
        <div class="subtitle" style="margin-top:8px;">Notes</div>
        <div class="small">{reading.notes.join(' • ')}</div>
        <div class="subtitle" style="margin-top:12px;">Cards</div>
        <ul class="small">
          {#each reading.blocks as b}
            <li><strong>{b.title}:</strong> {b.text}</li>
          {/each}
        </ul>
      {:else}
        <div class="small">Flip some cards to see your reading…</div>
      {/if}
    </div>
  </div>
</div>

<style>
  /* .board{ display:grid; grid-template-columns: 260px 1fr 360px; gap:16px; align-items:start; } */
  .board{ display:grid; grid-template-columns: 33.5% 55.5% 20%; gap:16px; align-items:start; }
  .deck-area{ display:flex; flex-direction:column; gap:12px; }
  .mode{ display:inline-flex; border:1px solid #2a364e; border-radius:10px; overflow:hidden; }
  .seg{ background:#121a2a; color:#e9eef8; border:none; padding:8px 10px; cursor:pointer; }
  .seg.a{ background:#1a2233; color:#f0f5ff; }
  .stack{ width:120px; height:180px; border-radius:12px; border:1px solid #2a364e;
    background: radial-gradient(140% 100% at 10% 10%, #1a2334 0%, #0d1422 50%, #0b0f14 100%);
    position:relative; cursor:pointer; box-shadow: 0 10px 30px rgba(0,0,0,.35) inset;
  }
  .stub{ position:absolute; inset:0; border-radius:12px; border:1px solid #2a364e; pointer-events:none; }
  .hint.small{ color:#9fb1cc; font-size:.85rem; }
  .controls{ display:flex; flex-direction:column; gap:8px; }
  .button{ background:#121a2a; border:1px solid #2a364e; color:#e9eef8; padding:8px 10px; border-radius:10px; cursor:pointer; }
  .button:disabled{ opacity:.55; cursor:not-allowed; }
  .slider{ display:flex; align-items:center; gap:6px; color:#bfd0ea; font-size:.85rem; }
  .slider input{ width:120px; accent-color:#c9a86a; }

  .autoplace{ border-top:1px dashed #2a364e; padding-top:8px; margin-top:8px; }
  .subtitle{ color:#9fb1cc; font-weight:600; letter-spacing:.02em; text-transform:uppercase; font-size:.75rem; }
  .row{ display:flex; align-items:center; gap:6px; color:#bfd0ea; }
  .row input[type="number"]{ width:70px; background:#121a2a; color:#e9eef8; border:1px solid #2a364e; border-radius:8px; padding:4px 6px; }

  .export-wrap{ grid-column: 2 / span 2; display:grid; grid-template-columns: 1fr 360px; gap:16px; }
  .spread{ position:relative; background:#0e1524; border:1px solid #2a364e; border-radius:16px; min-height:710px; }
  .slot{ position:absolute; transform: translate(-50%,-50%); text-align:center; transition: filter .15s ease; }
  .slot.armed{ filter: drop-shadow(0 0 10px rgba(201,168,106,.35)); }
  .slot.selected{ filter: drop-shadow(0 0 8px rgba(99,168,201,.25)); }
  .slot.pulse::after{
    content:''; position:absolute; left:50%; top:50%; width:160px; height:240px; transform: translate(-50%,-50%);
    border-radius:12px; pointer-events:none;
    box-shadow: 0 0 0 2px rgba(201,168,106,.45), 0 0 40px rgba(201,168,106,.25);
    animation: pulse 0.5s ease-out 1;
  }
  @keyframes pulse{
    0%{opacity:0; transform: translate(-50%,-50%) scale(.92);}
    100%{opacity:1; transform: translate(-50%,-50%) scale(1);}
  }
  .shadow{ width:140px; height:220px; border:1px dashed #2c3a55; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#577; cursor:pointer; background:linear-gradient(180deg, rgba(28,38,60,.25), rgba(16,24,39,.15)); }
  .placeholder{ font-size:.85rem; }

  .reading.card{ background:#111826; border:1px solid #2a364e; border-radius:16px; padding:12px; box-shadow: 0 8px 40px rgba(0,0,0,.35) inset; }
  .headline{ font-size:1.05rem; margin:6px 0 6px; color:#f0f5ff; }
  .small{ color:#b7c5db; font-size:.92rem; }

  .cross-overlay{
    position:absolute; left:50%; top:50%; width:140px; height:220px; transform: translate(-50%,-50%) rotate(90deg);
    border:2px dashed rgba(201,168,106,.35); border-radius:12px; pointer-events:none;
  }
</style>