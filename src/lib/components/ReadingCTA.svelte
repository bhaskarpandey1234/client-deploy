<script lang="ts">
  import CTAButton from './CTAButton.svelte';
  import { onMount } from 'svelte';

  export let title = 'Unlock Your Full Reading';
  export let description = 'Get detailed interpretations, personalized insights, and guidance for your journey.';
  export let buttonText = 'Read the Full Reading';
  export let redirectUrl = '/asteria/pricing';

  let ctaCard: HTMLElement;

  onMount(() => {
    ctaCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
</script>

<div class="cta-card" bind:this={ctaCard}>
  <div class="content">
    <h3>{title}</h3>
    <p>{description}</p>
    <CTAButton text={buttonText} href={redirectUrl} />
  </div>
</div>

<style>
  .cta-card {
    max-width: 600px;
    margin: 32px auto;
    padding: 32px;
    background: linear-gradient(135deg, #1a2334 0%, #0d1422 100%);
    border: 1px solid #2a364e;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .content h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #e9eef8;
    margin: 0 0 12px 0;
    letter-spacing: 0.02em;
  }

  .content p {
    font-size: 1rem;
    color: #b7c5db;
    margin: 0 0 24px 0;
    line-height: 1.6;
  }


</style>
