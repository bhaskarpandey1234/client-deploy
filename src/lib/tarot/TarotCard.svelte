<script lang="ts">
  import type { DealtCard } from './tarot';
  export let card: DealtCard | null = null;
  export let faceUp = false;
  export let reversed = false;
  export let width = 140;
  export let height = 220;
  export let clickable = false;
  export let labelUnder = ''; // optional positional label

  // accessibility
  function onKey(e: KeyboardEvent) {
    if (!clickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); dispatch('click');
    }
  }
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="wrap {faceUp ? 'flipped' : ''} {reversed ? 'rev' : ''} {clickable ? 'clickable' : ''}"
     style={`width:${width}px;height:${height}px;`}
     role={clickable ? 'button' : undefined}
     tabindex={clickable ? 0 : undefined}
     aria-pressed={faceUp}
     on:keydown={onKey}
     on:click={() => clickable && dispatch('click')}
>
  <div class="card" aria-hidden={!faceUp}>
    <div class="face back">
      <div class="pattern"></div>
      <div class="back-badge">TAROT</div>
    </div>
    <div class="face front">
      {#if card && faceUp}
        <div class="title">{card.name}</div>
        <div class="meta">
          {#if card.arcana === 'Major'}Major Arcana{/if}
          {#if card.arcana === 'Minor'}{card.rank} · {card.suit}{/if}
          {#if reversed}<span class="rev-tag">reversed</span>{/if}
        </div>
        <div class="keywords">
          {(reversed ? card.keywords.reversed : card.keywords.upright).slice(0,4).join(' • ')}
        </div>
      {:else}
        <!-- Card is face down or not placed - show blank front -->
        <div class="title">—</div>
      {/if}
    </div>
  </div>
</div>
{#if labelUnder}<div class="slot-label">{labelUnder}</div>{/if}

<style>
  .wrap{ perspective: 900px; display:flex; flex-direction:column; align-items:center; }
  .card{ width:100%; height:100%; position:relative; transform-style:preserve-3d; transition: transform .6s cubic-bezier(.2,.8,.2,1); }
  .wrap.flipped .card{ transform: rotateY(180deg); }
  /* For reversed cards: flip horizontally when showing front */
  .wrap.rev.flipped .card{ transform: rotateY(180deg) ; }
  .face{ position:absolute; inset:0; backface-visibility:hidden; border-radius:12px; overflow:clip; border:1px solid #2a364e; }
  .back{
    background:
      radial-gradient(140% 100% at 10% 10%, #1a2334 0%, #0d1422 50%, #0b0f14 100%);
  }
  .front{
    background:
      linear-gradient(180deg, #101827, #0c1321);
    color:#e9eef8;
    transform: rotateY(180deg);
    display:flex; flex-direction:column; padding:12px;
  }
  .pattern{
    position:absolute; inset:0; opacity:.18;
    background:
      radial-gradient(closest-side, #c9a86a33, transparent 60%) 20% 25%/ 80px 80px repeat,
      radial-gradient(closest-side, #c9a86a22, transparent 60%) 60% 60%/ 100px 100px repeat;
    filter: blur(.6px);
  }
  .back-badge{
    position:absolute; bottom:8px; right:8px; font-weight:700; letter-spacing:.15em;
    color:#cbb58b; font-size:.75rem; border:1px solid #3a2; border-color:#3c3e49;
    padding:3px 6px; border-radius:6px; background-color: rgba(13,20,34,.45);
  }
  .title{ font-weight:700; letter-spacing:.02em; margin-bottom:6px; }
  .meta{ color:#adbed9; font-size:.8rem; display:flex; gap:8px; align-items:center; }
  .rev-tag{ color:#d4a970; font-weight:600; text-transform:uppercase; letter-spacing:.06em; font-size:.7rem; }
  .keywords{ margin-top:auto; color:#bcd0ec; font-size:.9rem; }
  .slot-label{ margin-top:6px; color:#9fb1cc; font-size:.8rem; }
  .clickable{ cursor:pointer; }
  .clickable:focus-visible{ outline:2px solid #c9a86a; outline-offset:6px; border-radius:10px; }
</style>