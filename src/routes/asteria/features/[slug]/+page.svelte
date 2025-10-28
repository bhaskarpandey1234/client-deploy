<script lang="ts">
  import { page } from '$app/stores';
  import { STORIES } from '$lib/data/features.js';

  $: slug = ($page.params as any).slug as string | undefined;
  $: story = slug ? STORIES.find((s) => s.slug === slug) : undefined;
</script>

<svelte:head>
  <title>{story ? story.title : 'Story'} • Asteria</title>
</svelte:head>

<section class="wrap" style="padding:2rem 1rem;color:var(--text)">
  {#if story}
    <h1 style="margin:0 0 .4rem">{story.title}</h1>
    <p style="color:var(--muted); margin:.1rem 0 1rem">
      {story.guest}{story.role ? ` — ${story.role}` : ''}{story.publishedAt ? ` • ${story.publishedAt}` : ''}
    </p>
    <p>This is a placeholder for the transcript of <strong>{story.title}</strong>. Paste your text here.</p>
  {:else}
    <p>Story not found.</p>
  {/if}
</section>

<style>
  .wrap {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
</style>
