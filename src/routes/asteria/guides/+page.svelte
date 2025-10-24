<script>
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { GUIDE_CATEGORIES, linkFor } from '$lib/data/guides.js';
  import { lang as siteLang } from '$lib/stores/checkout.js';

  $: lang = ($page.url.searchParams.get('lang') || $siteLang || 'EN').toUpperCase();

  let q = '';

  $: filtered = q
    ? GUIDE_CATEGORIES.filter(cat => {
        const t = q.toLowerCase();
        return (
          cat.name.toLowerCase().includes(t) ||
          cat.subs.some(s => s.name.toLowerCase().includes(t) || s.desc.toLowerCase().includes(t))
        );
      })
    : GUIDE_CATEGORIES;

  function openSub(cat, sub) {
    const url = linkFor(cat.slug, sub.slug);
    const u = new URL(url, window.location.origin);
    u.searchParams.set('lang', lang);
    goto(u.pathname + u.search);
  }

  const fallback = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="16"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="%23111624"/><stop offset=".9" stop-color="%230c111f"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g)"/></svg>';
</script>

<svelte:head>
  <title>Guides • Asteria</title>
  <meta name="description" content="Browse Asteria guides by category—see sub‑topics, thumbnails, and quick summaries." />
</svelte:head>

<section class="hero" in:fade>
  <h1 class="h1">Guides</h1>
  <p class="sub">Browse by category and pick a method to begin.</p>

  <label class="search">
    <span class="sr">Search guides</span>
    <input
      placeholder="Search guides (e.g., Tarot, Birth Chart, Personal Year)…"
      bind:value={q}
      inputmode="search"
      aria-label="Search guides"
    />
    {#if q}
      <button class="clear" aria-label="Clear search" on:click={() => (q = '')}>&times;</button>
    {/if}
  </label>
</section>

<section class="grid">
  {#each filtered as cat (cat.slug)}
    <article class="card" in:fly={{ y: 10, duration: 180 }} animate:flip>
      <div class="banner">
        <img
          src={cat.cover || fallback}
          alt=""
          loading="lazy"
          on:error={(e) => (e.currentTarget.src = fallback)}
          in:fade
        />
      </div>

      <header class="head">
        <h2 class="h2">{cat.name}</h2>
        <p class="blurb">{cat.blurb}</p>
      </header>

      <div class="subs">
        {#each cat.subs as sub (sub.slug)}
          <button class="sub" on:click={() => openSub(cat, sub)}>
            <img
              src={sub.thumb || fallback}
              alt=""
              loading="lazy"
              on:error={(e) => (e.currentTarget.src = fallback)}
              in:fade={{ duration: 120 }}
            />
            <div class="meta">
              <div class="title">{sub.name}</div>
              <div class="desc">{sub.desc}</div>
            </div>
            <span class="go" aria-hidden="true">›</span>
          </button>
        {/each}
      </div>
    </article>
  {/each}

  {#if filtered.length === 0}
    <p class="empty">No results for "{q}". Try a different term.</p>
  {/if}
</section>

<style>
  :global(:root) {
    --bg: #0e1019;
    --surface: #111624;
    --surface-2: #0c111f;
    --border: #262c43;
    --muted: #9ea6bf;
    --text: #e8edf7;
    --gold: #f5c64f;
    --gold-2: #f1b53c;
  }
  :global(body) { background: var(--bg); color: var(--text); }

  .hero { text-align: center; padding: 2rem 1rem 1.2rem; }
  .h1 { font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 600; margin: 0 0 .35rem; }
  .sub { color: var(--muted); margin: 0 0 .8rem; }

  .search { position: relative; max-width: 720px; margin: 0 auto; }
  .search input {
    width: 100%;
    background: #0f1424;
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text);
    padding: .6rem .9rem;
  }
  .clear {
    position: absolute; right: .2rem; top: 50%; transform: translateY(-50%);
    background: transparent; border: 0; color: var(--muted);
    font-size: 1.1rem; cursor: pointer; padding: .35rem .6rem; border-radius: 8px;
  }

  .grid {
    max-width: 1200px; margin: 0 auto 3rem; padding: 0 1rem;
    display: grid; grid-template-columns: 1fr; gap: 1rem;
  }
  @media (min-width: 900px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1280px) { .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

  .card {
    display: flex; flex-direction: column;
    background: linear-gradient(180deg, var(--surface), var(--surface-2));
    border: 1px solid var(--border);
    border-radius: 20px; overflow: hidden;
    box-shadow: 0 10px 24px rgba(0,0,0,.35);
  }

  .banner { aspect-ratio: 16/9; background: #0f1424; overflow: hidden; }
  .banner img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .head { padding: .9rem .9rem 0; }
  .h2 { font-size: 1.15rem; margin: 0 0 .25rem; }
  .blurb { color: var(--muted); margin: 0 0 .6rem; line-height: 1.45; }

  .subs {
    display: grid; grid-template-columns: 1fr;
    gap: .5rem; padding: 0 .9rem .9rem;
  }

  .sub {
    display: grid; grid-template-columns: auto 1fr auto;
    align-items: center; gap: .65rem;
    width: 100%;
    text-align: left;
    padding: .55rem .6rem;
    background: #0f1424; border: 1px solid var(--border);
    border-radius: 12px; color: inherit; cursor: pointer;
    transition: border-color 120ms ease, transform 120ms ease;
  }
  .sub:hover { border-color: #31406a; transform: translateY(-1px); }
  .sub img { width: 42px; height: 42px; border-radius: 8px; object-fit: cover; }
  .meta { display: grid; gap: 2px; }
  .title { font-weight: 700; font-size: .98rem; }
  .desc { color: var(--muted); font-size: .9rem; line-height: 1.3;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .go { opacity: .6; font-size: 1.5rem; }

  .empty { color: var(--muted); text-align: center; padding: 2rem 1rem; }

  .sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }

  @media (prefers-reduced-motion: reduce) {
    .sub, .card { transition: none !important; }
  }
</style>
