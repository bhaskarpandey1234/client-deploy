<script>
  export let id = '';             // YouTube video ID
  export let title = 'Video';
  export let start = 0;
  export let autoplay = false;
  export let muted = false;
  export let controls = true;
  export let allowFullscreen = true;

  $: src = id
    ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&autoplay=${autoplay?1:0}&mute=${muted?1:0}&start=${+start||0}&controls=${controls?1:0}`
    : '';
</script>

<div class="ratio">
  {#if id}
    <iframe
      src={src}
      title={title}
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen={allowFullscreen}
    ></iframe>
  {:else}
    <div class="placeholder" aria-label="Video unavailable"></div>
  {/if}
</div>

<style>
  .ratio{
    position:relative;
    width:100%;
    aspect-ratio:16/9;
    background:#0f1424;
    border:1px solid var(--border);
    border-radius:16px;
    overflow:hidden;
  }
  iframe{position:absolute; inset:0; width:100%; height:100%; border:0; display:block}
  .placeholder{width:100%; height:100%}
</style>
