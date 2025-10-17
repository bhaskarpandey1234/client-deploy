<script lang="ts">
  export let title = "Why it helps";
  export let subtitle = "";
  export let items: string[] = [];
</script>

<section class="section">
  <h2>{title}</h2>
  {#if subtitle}<h2 class="subtitle">{subtitle}</h2>{/if}
  <ul>
    {#each items as item}
      <li>{item}</li>
    {/each}
  </ul>
</section>

<style>
  .section {
    margin-bottom: 3rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: white;
    margin: 0 0 1.5rem 0;
    letter-spacing: 1px;
  }

  h2.subtitle {
    font-size: 1.2rem;
    margin: -1rem 0 1rem 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0 0;
  }

  li {
    padding: 0.75rem 0 0.75rem 1.5rem;
    color: #b8b4a9;
    line-height: 1.6;
    position: relative;
    font-size: 0.95rem;
  }

  li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #00ffff;
    font-weight: 700;
    font-size: 1.2rem;
  }
</style>
