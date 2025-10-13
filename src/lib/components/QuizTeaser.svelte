<script lang="ts">
  import JourneysGrid from './JourneysGrid.svelte';
  
  let showJourneys = false;

  function handleBeginRitual() {
    showJourneys = true;
  }
</script>

<section id="quiz" class="section" >
  {#if !showJourneys}
    <div class="card" style="padding:24px">
      <h3 class="h3">What do you want clarity on today?</h3>
      <div style="display:flex; gap:12px; flex-wrap:wrap; margin:12px 0 8px">
        <button class="btn">Love</button><button class="btn">Career</button>
        <button class="btn">Destiny</button><button class="btn">Clarity</button>
      </div>
      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:16px">
        <button class="btn">Gentle</button><button class="btn">Practical</button><button class="btn">Tough</button>
        <button class="btn">Next 7 days</button><button class="btn">This month</button><button class="btn">3–6 months</button>
      </div>
      <button class="btn primary" on:click={handleBeginRitual}>Begin 60‑second ritual</button>
    </div>
  {:else}
    <JourneysGrid />
  {/if}
</section>

<style>
  .btn.primary {
    background: var(--destiny);
    color: #fff;
    font-weight: 600;
  }
</style>