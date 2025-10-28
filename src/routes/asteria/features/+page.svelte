<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import { lang as siteLang } from '$lib/stores/checkout.js';
  import { t } from '$lib/i18n/features.js';
  import { STORIES, ytThumb } from '$lib/data/features.js';
  import VideoEmbed from '$lib/components/VideoEmbed.svelte';

  $: L = $siteLang;

  // pick spotlight: explicit flag or latest by date
  function pickSpotlight(list: typeof STORIES) {
    const flag = list.find((s) => s.spotlight);
    if (flag) return flag;
    return [...list].sort((a,b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))[0];
  }

  $: spotlight = pickSpotlight(STORIES) || null;
  $: rest = STORIES.filter((s) => s !== spotlight);

  function watchOnYouTube(id: string) {
    const u = new URL('https://www.youtube.com/watch');
    u.searchParams.set('v', id);
    window.open(u.toString(), '_blank', 'noopener,noreferrer');
  }

  function openTranscript(slug: string) {
    goto(`/asteria/features/${encodeURIComponent(slug)}`);
  }
</script>

<svelte:head>
  <title>{t(L,'hero.title')} • Asteria</title>
  <meta name="description" content="User stories and weekly spotlight — watch real experiences from the Asteria community." />
</svelte:head>

<section class="hero" in:fade>
  <h1 class="h1">{t(L,'hero.title')}</h1>
  <p class="sub">{t(L,'hero.sub')}</p>
</section>

<section class="wrap">
  {#if spotlight}
    <article class="spot panel" in:fade>
      <header class="spot__head">
        <div class="badge">{t(L,'spotlight')}</div>
        <h2 class="spot__title">{spotlight.title}</h2>
        <p class="spot__meta">{spotlight.guest}{spotlight.role ? ` — ${spotlight.role}` : ''}</p>
      </header>

      <div class="spot__grid">
        <div class="spot__video" in:fly={{ y: 8, duration: 180 }}>
          <VideoEmbed id={spotlight.youtubeId} title={spotlight.title} />
        </div>

        <div class="spot__side" in:fly={{ y: 8, duration: 220 }}>
          {#if spotlight.quote}<blockquote class="quote">{spotlight.quote}</blockquote>{/if}
          <p class="muted">{spotlight.summary}</p>
          <div class="meta">
            {#if spotlight.duration}
              <div class="kv"><span class="k">{t(L,'duration')}</span><span class="v">{spotlight.duration}</span></div>
            {/if}
            {#if spotlight.publishedAt}
              <div class="kv"><span class="k">Published</span><span class="v">{spotlight.publishedAt}</span></div>
            {/if}
            {#if spotlight.tags?.length}
              <div class="kv"><span class="k">Tags</span><span class="v">{spotlight.tags.join(' • ')}</span></div>
            {/if}
          </div>

          <div class="actions">
            <button class="btn" on:click={() => watchOnYouTube(spotlight.youtubeId)}>{t(L,'watch')}</button>
            <button class="btn ghost" on:click={() => openTranscript(spotlight.slug)}>{t(L,'transcript')}</button>
          </div>
        </div>
      </div>
    </article>
  {:else}
    <div class="panel empty-box" in:fade>{t(L,'empty')}</div>
  {/if}
</section>

{#if rest.length}
  <section class="wrap section">
    <h3 class="h3">{t(L,'recent')}</h3>
    <div class="cards">
      {#each rest as s (s.slug)}
        <article class="card" in:fly={{ y: 8, duration: 160 }} animate:flip>
          <button class="thumb" on:click={() => watchOnYouTube(s.youtubeId)} aria-label="{t(L,'watch')}">
            <img src={ytThumb(s.youtubeId)} alt="" loading="lazy" on:error={(e)=> e.currentTarget.removeAttribute('src')} />
            <span class="play" aria-hidden="true">▶</span>
          </button>
          <div class="body">
            <h4 class="title">{s.title}</h4>
            <p class="meta">
              {s.guest}{s.role ? ` — ${s.role}` : ''} {s.publishedAt ? ` • ${s.publishedAt}` : ''}
            </p>
            <p class="excerpt">{s.summary}</p>
            <div class="row">
              <button class="linklike" on:click={() => watchOnYouTube(s.youtubeId)}>{t(L,'watch')}</button>
              <button class="linklike" on:click={() => openTranscript(s.slug)}>{t(L,'transcript')}</button>
            </div>
          </div>
        </article>
      {/each}
    </div>

    <div class="more-cta">
      <a class="btn ghost" href="/asteria/contact">{t(L,'share')}</a>
    </div>
  </section>
{/if}

<style>
  :global(:root){
    --bg:#0e1019; --surface:#111624; --surface-2:#0c111f; --border:#262c43;
    --muted:#9ea6bf; --text:#e8edf7; --gold:#f5c64f; --gold-2:#f1b53c; --ring:rgba(245,198,79,.35);
  }
  .hero{ text-align:center; padding:2rem 1rem 1rem; }
  .h1{ font-size:clamp(1.9rem,3.6vw,2.6rem); font-weight:600; margin:0 0 .25rem; }
  .sub{ color:var(--muted); margin:0; }

  .wrap{ max-width:1200px; margin:0 auto; padding:0 1rem; }
  .section{ padding:1.1rem 0 2rem; }

  .panel{
    background:linear-gradient(180deg,var(--surface),var(--surface-2));
    border:1px solid var(--border); border-radius:20px;
    box-shadow:0 10px 24px rgba(0,0,0,.35);
  }
  .empty-box{ padding:1rem; color:var(--muted); text-align:center; }

  .badge{
    display:inline-block; font-size:.78rem; letter-spacing:.02em; color:#0a0c11;
    background:linear-gradient(180deg,var(--gold),var(--gold-2));
    border:1px solid #3b2a00; border-radius:999px; padding:.2rem .55rem; font-weight:800;
  }
  .spot{ padding:1rem; }
  .spot__head{ margin-bottom:.6rem; }
  .spot__title{ font-size:1.2rem; margin:.3rem 0 .2rem; }
  .spot__meta{ color:var(--muted); margin:0; }

  .spot__grid{ display:grid; grid-template-columns:1fr; gap:.8rem; }
  @media (min-width: 980px){ .spot__grid{ grid-template-columns: 1.6fr 1fr; } }

  .quote{
    margin:.2rem 0 .5rem;
    background:#0e1322; border:1px solid var(--border); border-radius:12px; padding:.6rem .7rem;
    font-style:italic;
  }
  .muted{ color:var(--muted); }

  .meta{ display:grid; gap:.35rem; margin-top:.5rem; }
  .kv{ display:flex; gap:.5rem; }
  .k{ color:var(--muted); min-width:92px; }
  .v{ font-weight:700; }

  .actions{ display:flex; gap:.6rem; flex-wrap:wrap; margin-top:.7rem; }
  .btn{
    display:inline-block; border-radius:12px; border:1px solid #3b2a00;
    background:linear-gradient(180deg,var(--gold),var(--gold-2)); color:#0a0c11;
    font-weight:800; padding:.7rem 1rem; cursor:pointer;
  }
  .btn.ghost{ background:#0f1424; border:1px solid var(--border); color:var(--text); }

  /* Cards */
  .h3{ font-size:1.05rem; margin:0 0 .5rem; }
  .cards{ display:grid; grid-template-columns:1fr; gap:.8rem; }
  @media (min-width: 700px){ .cards{ grid-template-columns: repeat(2, minmax(0,1fr)); } }
  @media (min-width: 1100px){ .cards{ grid-template-columns: repeat(3, minmax(0,1fr)); } }

  .card{
    display:flex; flex-direction:column; overflow:hidden;
    background:#121a2c; border:1px solid var(--border); border-radius:16px;
  }
  .thumb{
    position:relative; aspect-ratio:16/9; width:100%; overflow:hidden;
    background:#0f1424; border-bottom:1px solid var(--border);
    cursor:pointer;
  }
  .thumb img{ width:100%; height:100%; object-fit:cover; display:block; }
  .play{
    position:absolute; inset:auto 8px 8px auto;
    background:rgba(14,16,25,.8); border:1px solid var(--border);
    width:36px; height:36px; border-radius:999px; display:grid; place-items:center;
  }
  .body{ padding:.75rem; display:grid; gap:.35rem; }
  .title{ margin:0; font-size:1rem; }
  .meta{ color:var(--muted); font-size:.92rem; }
  .excerpt{ color:var(--text); opacity:.95; }
  .row{ display:flex; gap:.8rem; flex-wrap:wrap; }
  .linklike{
    padding:0; border:0; background:none; color:var(--gold); cursor:pointer;
    font-weight:700; text-decoration:underline;
  }

  @media (prefers-reduced-motion: reduce){
    .btn, .thumb { transition:none !important; }
  }
</style>