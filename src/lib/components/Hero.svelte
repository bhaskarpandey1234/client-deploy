<script lang="ts">
  import { inview } from '$lib/utils/inview';
</script>

<section class="section" use:inview>
  <!-- <div class="footer-lang">
    <select class="lang-selector">
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  </div> -->

  <div class="grid" style="grid-template-columns: 1.2fr 1fr; align-items:center;">
    <div>
      <h1 class="h1">Not a chatbot. A 60‑second ritual.</h1>
      <p class="sub">Turn your question into a clear plan—personal, specific, and calm.</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap">
        <a class="btn" href="#quiz">Start Your Ritual</a>
        <button class="btn" aria-label="Watch demo">Watch 20s Demo</button>
      </div>
      <!-- <div style="display:flex; gap:16px; margin-top:16px; opacity:.9">
        <span>2,314 rituals this week</span>
        <span>• 4.7/5 resonance</span>
        <span>• Double Reading Guarantee</span>
      </div> -->
    </div>
    <div class="card hero-image-card">
      <div class="image-placeholder">
        <p>add image here</p>
      </div>
    </div>
  </div>
</section>

<style>
  .hero-image-card {
    aspect-ratio: 1/1;
    max-width: 560px;
    margin-left: auto;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .image-placeholder {
    background: var(--panel);
    color: var(--muted);
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-placeholder p {
    font-size: 18px;
    color: var(--muted);
  }
</style>