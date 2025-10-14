<script lang="ts">
  import type { Card } from './tarot';
  import { RNG } from './tarot';
  import { createEventDispatcher } from 'svelte';

  export let remaining: Card[] = [];
  export let seed = 'fan|' + Date.now();
  export let disabled = false;
  export let visibleCount = 36;       // how many cards we show in the fan (out of remaining)
  export let angleRange = 120;        // total degrees (-range/2 .. +range/2)
  export let radius = 110;            // how far cards fan out

  const dispatch = createEventDispatcher<{ pick: number }>();

  // Evenly sample indices from the remaining deck so the fan represents the whole deck.
  function sampleIndices(N: number, take: number): number[] {
    if (N <= take) return Array.from({ length: N }, (_, i) => i);
    const step = N / take;
    const res: number[] = [];
    for (let i = 0; i < take; i++) res.push(Math.floor(i * step));
    // de-dupe (just in case of rounding collisions)
    return Array.from(new Set(res)).slice(0, take);
  }

  $: rng = new RNG(seed);
  $: indices = sampleIndices(remaining.length, visibleCount);
  // Slight jitter so it feels organic but is seed‑stable
  $: jitter = indices.map(() => ({
    rot: (rng.next() - 0.5) * 6,  // ±3°
    rad: (rng.next() - 0.5) * 10, // ±10px
    off: (rng.next() - 0.5) * 6   // minor xy offset
  }));

  function styleFor(i: number, k: number) {
    const mid = (indices.length - 1) / 2;
    const baseAngle = ((k - mid) / mid) * (angleRange / 2); // -range/2..+range/2
    const rot = baseAngle + jitter[k].rot;
    const r = radius + jitter[k].rad;

    // Position cards along the arc with transform-origin at bottom center
    return `
      transform:
        rotate(${rot}deg)
        translateY(${-r}px)
        translateX(${jitter[k].off}px);
    `;
  }

  function onPick(k: number) {
    if (disabled) return;
    const deckIndex = indices[k];        // Which index in remaining[] the user picked
    if (deckIndex == null) return;
    dispatch('pick', deckIndex);
  }
</script>

<div class="fan" aria-label="Pick cards from fan" aria-disabled={disabled}>
  {#if remaining.length === 0}
    <div class="empty">No cards remaining</div>
  {:else}
    {#each indices as deckIndex, k (deckIndex)}
      <button class="stub"
              style={styleFor(deckIndex, k)}
              on:click={() => onPick(k)}
              disabled={disabled}
              aria-label="Pick this card">
        <div class="back"></div>
      </button>
    {/each}
  {/if}
</div>

<style>
  .fan{
    position:relative;
    width:240px; height:260px;
    margin:8px 0;
    filter: drop-shadow(0 12px 30px rgba(0,0,0,.35));
    display:flex; align-items:flex-end; justify-content:center;
  }
  .empty{ color:#9fb1cc; font-size:.9rem; }
  .stub{
    position:absolute; bottom:10px; left:50%;
    width:88px; height:128px;
    transform-origin: 50% 100%; /* bottom center */
    border:1px solid #2a364e; border-radius:10px;
    background: radial-gradient(140% 100% at 10% 10%, #1a2334 0%, #0d1422 50%, #0b0f14 100%);
    cursor:pointer;
    transition: transform .1s ease, box-shadow .2s ease, border-color .2s ease, filter .2s ease;
    box-shadow: 0 6px 22px rgba(0,0,0,.35) inset;
  }
  .stub:hover:not(:disabled), .stub:focus-visible{
    border-color:#c9a86a77;
    box-shadow: 0 6px 22px rgba(0,0,0,.35) inset, 0 6px 28px rgba(201,168,106,.18);
    filter: brightness(1.06);
  }
  .stub:disabled{ opacity:.55; cursor:not-allowed; }
  .back{
    position:absolute; inset:0; border-radius:10px;
    background:
      radial-gradient(closest-side, #c9a86a26, transparent 70%) 20% 25%/ 60px 60px repeat,
      radial-gradient(closest-side, #c9a86a18, transparent 70%) 60% 60%/ 80px 80px repeat;
  }
</style>