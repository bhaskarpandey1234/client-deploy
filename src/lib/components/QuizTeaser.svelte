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
      <div class="choice-row" style="margin:12px 0 8px">
        <button class="btn">
          <img class="icon" src="icons/heart.png" alt="hi">Love
        </button>
        <button class="btn">
          <img class="icon" src="icons/business.png" alt="hi">Career
        </button>
        <button class="btn">
          <img class="icon" src="icons/destiny.png" alt="hi">Destiny
        </button>
        <button class="btn">
          <img class="icon" src="icons/clarity.png" alt="hi">Clarity
        </button>
      </div>
      <div class="choice-row" style="margin-bottom:16px">
        <button class="btn">Gentle</button>
        <button class="btn">Practical</button>
        <button class="btn">Tough</button>
        <button class="btn">Next 7 days</button>
        <button class="btn">This month</button>
        <button class="btn">3–6 months</button>
      </div>
      <button class="btn primary" on:click={handleBeginRitual}>Begin 60-second ritual</button>
    </div>
  {:else}
    <JourneysGrid />
  {/if}
</section>

<style>
  /* ============================
     ORIGINAL DESKTOP / BASE
     (kept exactly as provided by you)
     ============================ */

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

  .btn{
    border-radius: 25px;
    border: var(--stroke-weight-1, 1px) solid #FFF;
    background: transparent;
    color: #FFF;
    padding: 10px 16px;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    font-size: 15px;
    font-weight: 600;
    display: inline-flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
  }

  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
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

  .icon{
    width: 18px;
    height: 18px;
    aspect-ratio: 1/1;
  }

  /* helper row spacing on desktop (keeps your original visual spacing) */
  .choice-row {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
  }

  /* ============================
     RESPONSIVE OVERRIDES
     ONLY affect screens below the breakpoints.
     Desktop values remain untouched above 1200px.
     ============================ */

  /* <= 1200px: small laptops / large tablets
     - Slightly reduce gaps and allow content to breathe
  */
  @media (max-width: 1200px) {
    .container {
      gap: 32px;
      padding-inline: 18px; /* respect inline padding but not override your inline style */
      box-sizing: border-box;
    }

    .choice-row {
      gap: 20px;
    }

    .btn {
      padding: 9px 14px;
      font-size: 14.5px;
    }

    .btn.primary {
      /* scale down proportionally for intermediate sizes */
      height: 64px;
      padding: 16px 38px;
      font-size: 19px;
      line-height: 30px;
    }

    .container h3 {
      font-size: 24px;
      line-height: 34px;
    }

    /* ensure icons remain legible */
    .icon {
      width: 16px;
      height: 16px;
    }
  }

  /* <= 768px: tablets & large phones
     - stack more tightly, ensure rows become more vertical-friendly
     - keep desktop exact values untouched for >=1201px
  */
  @media (max-width: 768px) {
    .container {
      gap: 24px;
      padding-inline: 16px;
      align-items: stretch;
      width: 100%;
    }

    .choice-row {
      justify-content: center;
      gap: 16px;
    }

    .btn {
      padding: 10px 14px;
      font-size: 15px;
    }

    .btn.primary {
      height: 60px; /* you already had this rule in your original snippet — preserved here as override */
      padding: 16px 36px;
      font-size: 18px;
      line-height: 28px;
      width: auto;
      justify-content: center;
    }

    .container h3 {
      font-size: 22px;
      line-height: 30px;
      padding-inline: 8px;
    }

    /* make choice buttons wrap to multiple lines more cleanly */
    .choice-row > .btn {
      flex: 0 1 auto;
      min-width: 110px;
      text-align: center;
    }
  }

  /* <= 480px: phones
     - stack vertically where helpful, full-width primary CTA, avoid horizontal overflow
  */
  @media (max-width: 480px) {
    .container {
      gap: 16px;
      padding: 12px;
      align-items: stretch;
    }

    .choice-row {
      gap: 12px;
      justify-content: center;
    }

    .choice-row > .btn {
      min-width: 0;
      flex: 1 1 calc(50% - 12px); /* two per row where space allows */
      max-width: 50%;
      box-sizing: border-box;
    }

    /* if there are many options, make them full width on very narrow screens */
    @media (max-width: 360px) {
      .choice-row > .btn {
        flex: 1 1 100%;
        max-width: 100%;
      }
    }

    .btn {
      padding: 10px 12px;
      font-size: 14px;
    }

    .btn.primary {
      height: 52px;
      padding: 14px 28px;
      font-size: 16px;
      line-height: 24px;
      width: 100%;
      justify-content: center;
    }

    .container h3 {
      font-size: 20px;
      line-height: 28px;
      padding-inline: 8px;
    }

    /* keep icon size proportional */
    .icon {
      width: 16px;
      height: 16px;
    }

    /* avoid text overflow on very small screens */
    .btn,
    .container h3 {
      white-space: normal;
      overflow-wrap: anywhere;
    }
  }

  /* ============================
     RE-ASSERT EXACT DESKTOP RULES FOR >= 1201px
     This guarantees nothing above unintentionally altered your desktop layout.
     (Values copied exactly from the original block at top.)
     ============================ */
  @media (min-width: 1201px) {
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

    .btn{
      border-radius: 25px;
      border: var(--stroke-weight-1, 1px) solid #FFF;
      background: transparent;
      color: #FFF;
      padding: 10px 16px;
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      font-size: 15px;
      font-weight: 600;
      display: inline-flex;
      gap: 10px;
      align-items: center;
      cursor: pointer;
    }

    .container{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;
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

    .icon{
      width: 18px;
      height: 18px;
      aspect-ratio: 1/1;
    }

    .choice-row {
      display: flex;
      gap: 30px;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
