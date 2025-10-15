<script lang="ts">
  import { SPREADS, THREE_CARD, CELTIC_CROSS, type Spread } from './spreads';
  import TarotTable from './TarotTable.svelte';
  
  let spread: Spread = THREE_CARD;
  let seed = `user|${Date.now()}`;
  let reversedChance = 0.45;
  let tarotTable: TarotTable;
  export let allCardsSelected = false;

  $: if (tarotTable && spread) {
    tarotTable.reset(`user|${Date.now()}`);
  }
</script>

<div class="container">
  <div class="header">
    <h2 style="margin:0; font-weight:700; letter-spacing:.02em">Tarot Reading</h2>
    <div class="selects">
      <select class="button" bind:value={spread}>
        {#each SPREADS as s (s.key)}<option value={s}>{s.name}</option>{/each}
      </select>
      <!-- <input class="button" style="min-width:240px" bind:value={seed} /> -->
    </div>
  </div>

  <TarotTable bind:this={tarotTable} {spread} {seed} bind:reversedChance bind:allCardsSelected />
</div>

<style>
  .container{ max-width:1200px; margin:0 auto; padding:24px; }
  .header{ display:flex; gap:16px; align-items:center; justify-content:space-between; margin-bottom:12px; }
  .selects{ display:flex; gap:12px; flex-wrap:wrap; }
  .button{ background:linear-gradient(180deg, #1a2233, #101827); color:#e9eef8; border:1px solid #2d3b57; padding:10px 14px; border-radius:12px; cursor:pointer; }
  select.button{ background:#1a2233; }
</style>