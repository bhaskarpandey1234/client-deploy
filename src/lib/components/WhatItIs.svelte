<script lang="ts">
  export let title = "What it is";
  export let subtitle = "";
  export let content = "";
</script>

<section class="section">
  <h2>{title}</h2>
  {#if subtitle}<h2 class="subtitle">{subtitle}</h2>{/if}
  <p>{content}</p>
</section>

<style>
  .section {
    /* margin-bottom: 3rem; */
    margin-top: -32px;
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

  p {
    color: #b8b4a9;
    line-height: 1.8;
    margin: 0;
    white-space: pre-line;
    font-size: 0.95rem;
  }
</style>
