<script lang="ts">
  import { goto } from '$app/navigation';

  export let text = 'Get Started';
  export let href = '/asteria/pricing';
</script>

<button class="cta-btn" on:click={() => goto(href)}>
  {text}
</button>

<style>
  .cta-btn {
    background: linear-gradient(135deg, #c9a86a, #d4b87a);
    color: #0b0f14;
    font-size: 1.1rem;
    font-weight: 700;
    padding: 16px 40px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 20px rgba(201, 168, 106, 0.3);
  }

  .cta-btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 28px rgba(201, 168, 106, 0.4);
  }

  .cta-btn:active {
    transform: translateY(0) scale(0.98);
  }
</style>
