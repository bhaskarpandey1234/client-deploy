<script lang="ts">
  import JourneysGrid from './JourneysGrid.svelte';
  
  let showJourneys = false;

  function handleBeginRitual() {
    showJourneys = true;
  }
</script>

<section id="quiz" class="section" >
  {#if !showJourneys}
    <div class=" container" style="padding:24px">
      <h3 class="h3">What do you want clarity on today?</h3>
      <div style="display:flex; gap:30px; flex-wrap:wrap; margin:12px 0 8px">
        <button class="btn">
          <img class="icon" src="icons/heart.png" alt="hi">Love</button><button class="btn">
            <img class="icon" src="icons/business.png" alt="hi">Career</button>
        <button class="btn"><img class="icon" src="icons/destiny.png" alt="hi">Destiny</button><button class="btn"><img  class="icon" src="icons/clarity.png" alt="hi">Clarity</button>
      </div>
      <div style="display:flex; gap:30px; flex-wrap:wrap; margin-bottom:16px">
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
    border-radius: 115.2px;
    background: #EDB92E;
    display: inline-flex;
    height: 72px;
    padding: 18.72px 43.2px;
    align-items: center;
    flex-shrink: 0;
    color: #0B0D14;
    font-family: Inter;
    font-size: 21.456px;
    font-style: normal;
    font-weight: 600;
    line-height: 34.56px;
  }

  @media (max-width: 768px) {
    .btn.primary {
      height: 60px;
      padding: 16px 36px;
      font-size: 18px;
      line-height: 28px;
    }
  }

  @media (max-width: 480px) {
    .btn.primary {
      height: 52px;
      padding: 14px 28px;
      font-size: 16px;
      line-height: 24px;
      width: 100%;
      justify-content: center;
    }
  }
  .btn{
    border-radius: 25px;
border: var(--stroke-weight-1, 1px) solid #FFF;
  }
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  @media (max-width: 768px) {
    .container {
      gap: 24px;
    }
  }
  .container h3{
    color: #FFF;
    font-family: "Playfair Display";
    font-size: 27.3px;
    font-style: normal;
    font-weight: 400;
    line-height: var(--line-height-36, 36px);
    text-align: center;
  }

  @media (max-width: 768px) {
    .container h3 {
      font-size: 22px;
      line-height: 30px;
    }
  }

  @media (max-width: 480px) {
    .container h3 {
      font-size: 20px;
      line-height: 28px;
    }
  }
  .icon{
    width: 18px;
height: 18px;
aspect-ratio: 1/1;
  }
</style>