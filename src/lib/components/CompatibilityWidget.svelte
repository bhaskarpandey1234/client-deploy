<script lang="ts">
  import { checkCompatibility } from '$lib/panchang/core';
  import CTAButton from './CTAButton.svelte';

  let girlDate = '1996-05-29T10:30';
  let boyDate = '1993-12-12T04:45';
  let result: any = null;

  function check() {
    result = checkCompatibility(new Date(girlDate), new Date(boyDate));
  }
</script>

<div class="widget">
  <h3>Compatibility Check</h3>
  <div class="inputs">
    <label>
      Girl's Birth Date & Time
      <input type="datetime-local" bind:value={girlDate} />
    </label>
    <label>
      Boy's Birth Date & Time
      <input type="datetime-local" bind:value={boyDate} />
    </label>
  </div>
  <button class="check-btn" on:click={check}>Check Compatibility</button>

  {#if result}
    <div class="result">
      <div class="row">
        <span>Girl's Nakshatra:</span>
        <strong>{result.girl.nakshatra}</strong>
      </div>
      <div class="row">
        <span>Boy's Nakshatra:</span>
        <strong>{result.boy.nakshatra}</strong>
      </div>
      <div class="row">
        <span>Gana:</span>
        <strong class={result.gana}>{result.gana}</strong>
      </div>
      <div class="row">
        <span>Nadi:</span>
        <strong class={result.nadi}>{result.nadi}</strong>
      </div>
      <div class="score">
        Score: {result.score}/14
      </div>
      <div class="cta">
        <p>Get detailed compatibility report with remedies</p>
        <CTAButton text="Get Full Report" href="/asteria/pricing" />
      </div>
    </div>
  {/if}
</div>

<style>
  .widget {
    max-width: 600px;
    margin: 0 auto;
    padding: 24px;
    background: linear-gradient(135deg, #1a2334 0%, #0d1422 100%);
    border: 1px solid #2a364e;
    border-radius: 16px;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #e9eef8;
    margin: 0 0 20px 0;
    text-align: center;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #b7c5db;
    font-size: 0.9rem;
  }

  input {
    padding: 10px;
    background: #0e1524;
    border: 1px solid #2a364e;
    border-radius: 8px;
    color: #e9eef8;
    font-size: 1rem;
  }

  .check-btn {
    width: 100%;
    background: linear-gradient(135deg, #c9a86a, #d4b87a);
    color: #0b0f14;
    font-size: 1rem;
    font-weight: 700;
    padding: 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .check-btn:hover {
    transform: translateY(-2px);
  }

  .result {
    margin-top: 24px;
    padding: 20px;
    background: #0e1524;
    border: 1px solid #2a364e;
    border-radius: 12px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #2a364e;
    color: #b7c5db;
  }

  .row:last-of-type {
    border-bottom: none;
  }

  .match {
    color: #4ade80;
  }

  .partial {
    color: #fbbf24;
  }

  .mismatch {
    color: #f87171;
  }

  .score {
    margin-top: 16px;
    padding: 12px;
    background: linear-gradient(135deg, #c9a86a22, #d4b87a22);
    border-radius: 8px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 700;
    color: #c9a86a;
  }

  .cta {
    margin-top: 20px;
    text-align: center;
  }

  .cta p {
    color: #b7c5db;
    margin-bottom: 12px;
  }
</style>
