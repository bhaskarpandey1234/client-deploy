# Asteria PWA — Homepage Figma Spec & SvelteKit Scaffold

> **Scope note:** The original homepage spec you see here is tuned for the **luxury brand** (Asteria Guide). Below, you now have a complete second variant for the **$10 brand** (Cosmo Note) with distinct visual system, copy, IA, and code toggles so both products feel different while sharing core mechanics.

> This doc gives your designer an exact Figma page map (names, spacing, grids, tokens, components) and your developer a ready SvelteKit scaffold for the homepage. Copy it straight into Figma/Repo.

---

## 1) Figma Page Map (single-page homepage)

**File / Page**
- File: `Asteria-Web`
- Page: `01_Homepage`

**Top-level Frames (Desktop / Tablet / Mobile)**
- `Home / Desktop / 1440`
- `Home / Tablet / 1024`
- `Home / Mobile / 390`

**Layout Grids**
- Desktop: 12 cols, 80 gutter, 1120 content max, margins 160. Type: Stretch.
- Tablet: 8 cols, 32 gutter, 688 content max, margins 32.
- Mobile: 4 cols, 16 gutter, 343 content max, margins 24.

**Spacing System (8pt base)**
- `space-4=4`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `56`, `64`, `80`, `96`, `128`.

**Color Tokens**
- Base: `--ink:#EDEBFF`, `--ink-dim:#C9C5F2`, `--muted:#A39ED4`
- Surface: `--bg:#0C0A1A`, `--panel:#141127`, `--glass:rgba(255,255,255,0.06)`
- Accents:
  - Love: `--love:#F06FA3`, `--love-400:#F59CBF`
  - Career: `--career:#F2C14E`, `--career-400:#FFD46E`
  - Destiny: `--destiny:#9C6CFF`, `--destiny-400:#B996FF`
  - Clarity: `--clarity:#30D5C8`, `--clarity-400:#6BE8DF`
- Feedback: `--good:#5CE38A`, `--warn:#FFC857`, `--bad:#F07167`

**Typography Styles**
- Display: `Serif High-Contrast 72 / 80 / -2%`
- H1: `Serif 56 / 64 / -1%`
- H2: `Serif 40 / 48 / -1%`
- H3: `Grotesk 28 / 36 / 0%`
- Body L: `Humanist Sans 18 / 28`
- Body M: `Humanist Sans 16 / 24`
- Label S: `Mono 12 / 16`

**Effects**
- Starfield noise (200dpi PNG overlay @ 12% opacity)
- Glass card: fill `--glass`, blur 20, radius 20, stroke `#FFFFFF12`
- Glow: outer 0 0 24 `accent-400` (contextual per journey)

---

## 2) Component Library (Figma → `Components` page)

**Atoms**
- Buttons: `Btn/Primary`, `Btn/Ghost`, `Btn/Link`, sizes `L/M/S`
- Chips: `Chip/Selectable` (on/off), `Chip/Filter`
- Inputs: `Input/Text`, `Input/Date`, `Input/Time`, `Input/Place`
- Icons (24px grid): line icons for altar, palm, eye, star, shield, refund, moon, calendar

**Molecules**
- `Card/Glass` (padding 24, radius 20)
- `Accordion/Item` (header + content, chevron right→down)
- `Stat/Tile` (icon + number + caption)
- `Proof/AvatarQuote` (40px avatar, name, 1‑line quote)
- `Ribbon/PricingItem` (title, price, bullets)

**Organisms**
- `Section/Hero`
- `Section/CreatorStrip`
- `Section/QuizTeaser`
- `Section/HowItWorks`
- `Section/TeaserDemo`
- `Section/JourneysGrid`
- `Section/PricingRibbon`
- `Section/ResonancePanel`
- `Section/Ethics`
- `Section/FAQ`
- `Section/InstallPWA`
- `Section/Newsletter`
- `Footer/Main`

**Tokens (Figma variables)**
- Colors → `Asteria/Color/*`
- Spacing → `Asteria/Space/*`
- Radii → `Asteria/Radii/{8,12,20,32}`
- Easing → `Asteria/Ease/{inOut, out, in}`

---

## 3) Section-by-Section (Desktop measurements)

### 3.1 Hero — “Ritual, not chat”
- Frame: `Section/Hero` (height: 760)
- Grid: 6/6 split
- Left (copy):
  - H1 (H1 style) max‑width 640, margin‑bottom 16
  - Sub (Body L) max‑width 560, mb 24
  - CTA Row: `Btn/Primary` (Start Ritual), `Btn/Ghost` (Watch 20s Demo), gap 12
  - Micro‑proof row: 3 items (icon + text), gap 16
- Right (visual): `Card/Glass` 560×560 with altar animation placeholder
- Background: subtle radial gradient center‑right + starfield overlay
- Spacing: top/bottom paddings 96

### 3.2 Creator Proof Strip
- Height: 160
- Carousel of `Proof/AvatarQuote` (6 visible), gap 24, auto‑scroll 12s

### 3.3 Guided Quiz Teaser
- Height: 360
- `Card/Glass` centered 960×240
- Title H3: “What do you want clarity on today?”
- Chip row: Love, Career, Destiny, Clarity (gap 12)
- Sub‑row: Style (Gentle/Practical/Tough), Timeline (7 days / month / 3–6 mo)
- CTA: `Btn/Primary` (Begin 60‑second ritual)

### 3.4 How It Works
- Height: 420
- 3 columns `Card/Glass` (icon 48, H3, Body M), equal widths
- Step titles: “Intention”, “Seal”, “Guidance”

### 3.5 Live Teaser Demo (Free)
- Height: 440
- `Card/Glass` 1120×320
- Left: 3 sample lines (mono label + line copy)
- Right: Blurred Sigil preview (square 280), mantra chip (blurred)
- CTA block bottom: `Btn/Primary` (Unlock Full Reading — $10) + trust icons

### 3.6 Journeys Grid
- Height: 640
- 4 tiles (Love/Career/Destiny/Clarity), 2×2 grid
- Each: gradient border by accent, bullets x3, “Explore modalities” link

### 3.7 Pricing Ribbon
- Height: 220
- Horizontal cards x3: `$10 Full Reading`, `+$3 Timing`, `Upgrades $29/$49`
- Sticky CTA repeats on scroll

### 3.8 Resonance & Outcomes
- Height: 320
- Stat tiles x3: Resonance %, Outcomes stacked, Readings this week
- Include small footnote on methodology

### 3.9 Ethics & Transparency (Accordion)
- Height: auto (est. 520)
- 4 accordion items, first expanded by default

### 3.10 FAQ (Schema‑ready)
- Height: auto (est. 600)
- 6 Q/A items, two columns

### 3.11 Install Asteria (PWA)
- Height: 200
- Banner style card with platform‑aware buttons

### 3.12 Newsletter (optional)
- Height: 220
- Input (email) + consent + CTA

### 3.13 Footer
- Height: 360
- 4 columns; legal line; language selector

---

## 4) Interaction & Motion Spec (Figma prototypes)

**Easing tokens**
- `Ease/Out`: cubic‑bezier(0.17, 0.84, 0.44, 1) | 220ms
- `Ease/InOut`: cubic‑bezier(0.45, 0.05, 0.19, 1) | 360ms

**Hero**
- On load: H1 fade‑up 12px (220ms), sub (260ms delay), buttons (320ms), altar parallax (tilt ±6° following cursor, prefers‑reduced‑motion → disable)

**Buttons**
- Hover: scale 1.02, inner glow, 120ms; Active: scale 0.98

**Accordion**
- Height auto spring 220ms, rotate chevron 90°

**Carousel**
- Auto‑scroll 12s per view, pause on hover

**Counters**
- Odometer roll 600ms on in‑view

**Section reveal**
- Fade‑up 16px when 30% visible; stagger 80ms per child

**Reduced motion**
- If `prefers-reduced-motion`: disable parallax, use opacity only animations

---

## 5) Asset Checklist
- Logo (SVG), favicon, mask‑icon
- Altar Lottie (JSON) + static fallback PNG
- Sigil SVG examples (4 journeys)
- Icon set (stroke 1.5)
- Creator avatars (consented) + 3 press marks
- Payment/Guarantee badges

---

## 6) SvelteKit Homepage Scaffold (starter)

**Stack**: SvelteKit + TypeScript + CSS variables. Optional: GSAP for subtle motion (progressive enhancement). No external UI libs required.

**Directory structure**
```
asteria/
├─ src/
│  ├─ lib/
│  │  ├─ components/
│  │  │  ├─ Hero.svelte
│  │  │  ├─ CreatorStrip.svelte
│  │  │  ├─ QuizTeaser.svelte
│  │  │  ├─ HowItWorks.svelte
│  │  │  ├─ TeaserDemo.svelte
│  │  │  ├─ JourneysGrid.svelte
│  │  │  ├─ PricingRibbon.svelte
│  │  │  ├─ ResonancePanel.svelte
│  │  │  ├─ EthicsAccordion.svelte
│  │  │  ├─ FAQ.svelte
│  │  │  ├─ InstallCTA.svelte
│  │  │  ├─ Newsletter.svelte
│  │  │  └─ FooterMain.svelte
│  │  ├─ utils/inview.ts
│  │  └─ styles/tokens.css
│  ├─ routes/
│  │  └─ +page.svelte
│  └─ app.css
├─ static/
│  ├─ manifest.webmanifest
│  └─ icons/*
└─ package.json
```

**`src/lib/styles/tokens.css`** (tokens snippet)
```css
:root{
  --bg:#0C0A1A; --panel:#141127; --ink:#EDEBFF; --muted:#C9C5F2;
  --love:#F06FA3; --career:#F2C14E; --destiny:#9C6CFF; --clarity:#30D5C8;
  --glass:rgba(255,255,255,0.06); --radius:20px; --gap:16px;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui, "Inter", sans-serif}
.section{padding:96px 24px;max-width:1120px;margin:0 auto}
.card{background:var(--glass);backdrop-filter:blur(20px);border:1px solid #ffffff1f;border-radius:var(--radius)}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 16px;border-radius:12px;border:1px solid #ffffff22;background:#ffffff10;color:var(--ink);cursor:pointer;transition:transform .12s ease}
.btn:hover{transform:translateY(-1px)}
.h1{font-size:56px;line-height:64px;margin:0 0 16px}
.h3{font-size:28px;line-height:36px;margin:0 0 8px}
.sub{opacity:.8;max-width:560px;margin-bottom:24px}
.grid{display:grid;gap:24px}
```

**`src/lib/utils/inview.ts`**
```ts
export function inview(node: HTMLElement, options: IntersectionObserverInit = { threshold: 0.3 }){
  const onEnter = () => node.classList.add('reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ onEnter(); io.unobserve(node);} });
  }, options);
  io.observe(node); return { destroy(){ io.disconnect(); } };
}
```

**Reveal CSS**
```css
.reveal{animation:fadeUp .24s cubic-bezier(.17,.84,.44,1) both}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)}}
```

**`src/lib/components/Hero.svelte`**
```svelte
<script lang="ts">
  import { inview } from '$lib/utils/inview';
</script>
<section class="section" use:inview>
  <div class="grid" style="grid-template-columns: 1.2fr 1fr; align-items:center;">
    <div>
      <h1 class="h1">Not a chatbot. A 60‑second ritual.</h1>
      <p class="sub">Turn your question into a clear plan—personal, specific, and calm.</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap">
        <a class="btn" href="#quiz">Start Your Ritual</a>
        <button class="btn" aria-label="Watch demo">Watch 20s Demo</button>
      </div>
      <div style="display:flex; gap:16px; margin-top:16px; opacity:.9">
        <span>2,314 rituals this week</span>
        <span>• 4.7/5 resonance</span>
        <span>• Double Reading Guarantee</span>
      </div>
    </div>
    <div class="card" style="aspect-ratio:1/1; max-width:560px; margin-left:auto; display:grid; place-items:center">
      <div aria-hidden="true">[Altar Animation]</div>
    </div>
  </div>
</section>
```

**`src/lib/components/QuizTeaser.svelte`**
```svelte
<section id="quiz" class="section" >
  <div class="card" style="padding:24px">
    <h3 class="h3">What do you want clarity on today?</h3>
    <div style="display:flex; gap:12px; flex-wrap:wrap; margin:12px 0 8px">
      <button class="btn">Love</button><button class="btn">Career</button>
      <button class="btn">Destiny</button><button class="btn">Clarity</button>
    </div>
    <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:16px">
      <button class="btn">Gentle</button><button class="btn">Practical</button><button class="btn">Tough</button>
      <button class="btn">Next 7 days</button><button class="btn">This month</button><button class="btn">3–6 months</button>
    </div>
    <a class="btn" href="/ritual">Begin 60‑second ritual</a>
  </div>
</section>
```

**`src/lib/components/HowItWorks.svelte`**
```svelte
<section class="section">
  <div class="grid" style="grid-template-columns: repeat(3, 1fr);">
    <div class="card" style="padding:24px">
      <h3 class="h3">Intention</h3>
      <p>Set your question and optional birth details.</p>
    </div>
    <div class="card" style="padding:24px">
      <h3 class="h3">Seal</h3>
      <p>Place your palm to seal the ritual.</p>
    </div>
    <div class="card" style="padding:24px">
      <h3 class="h3">Guidance</h3>
      <p>Get specific, testable lines with a personal sigil.</p>
    </div>
  </div>
</section>
```

**Stubs for remaining components**
- Create similarly structured `.svelte` files for `TeaserDemo`, `JourneysGrid`, `PricingRibbon`, `ResonancePanel`, `EthicsAccordion`, `FAQ`, `InstallCTA`, `Newsletter`, `FooterMain` using the measurements in Section 3.

**`src/routes/+page.svelte`**
```svelte
<script lang="ts">
  import '$lib/styles/tokens.css';
  import Hero from '$lib/components/Hero.svelte';
  import CreatorStrip from '$lib/components/CreatorStrip.svelte';
  import QuizTeaser from '$lib/components/QuizTeaser.svelte';
  import HowItWorks from '$lib/components/HowItWorks.svelte';
  import TeaserDemo from '$lib/components/TeaserDemo.svelte';
  import JourneysGrid from '$lib/components/JourneysGrid.svelte';
  import PricingRibbon from '$lib/components/PricingRibbon.svelte';
  import ResonancePanel from '$lib/components/ResonancePanel.svelte';
  import EthicsAccordion from '$lib/components/EthicsAccordion.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import InstallCTA from '$lib/components/InstallCTA.svelte';
  import Newsletter from '$lib/components/Newsletter.svelte';
  import FooterMain from '$lib/components/FooterMain.svelte';
</script>

<Hero />
<CreatorStrip />
<QuizTeaser />
<HowItWorks />
<TeaserDemo />
<JourneysGrid />
<PricingRibbon />
<ResonancePanel />
<EthicsAccordion />
<FAQ />
<InstallCTA />
<Newsletter />
<FooterMain />
```

**`static/manifest.webmanifest`** (snippet)
```json
{
  "name": "Asteria — Ritual Readings",
  "short_name": "Asteria",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0C0A1A",
  "theme_color": "#0C0A1A",
  "icons": [
    {"src":"/icons/icon-192.png","sizes":"192x192","type":"image/png"},
    {"src":"/icons/icon-512.png","sizes":"512x512","type":"image/png"}
  ]
}
```

**Service Worker (concept)**
- Use SvelteKit adapter with `serviceWorker: true`.
- Cache shell routes + assets. Offline access for `/result/*` pages.

**Accessibility**
- All interactive elements keyboard focusable and labeled.
- `prefers-reduced-motion` respected (disable parallax/reveals).
- Contrast checked; icons have `aria-hidden` with text labels.

---

## 7) QA Checklist (pre‑launch)
- LCP < 2.5s (hero media optimized; SVG for sigils)
- Scroll/section beacons fire correctly
- Buttons have 44px touch targets
- Install banner appears on eligible devices; dismiss state stored
- FAQ schema validates in Rich Results

---

**Next steps**
- Designer: build `Components` page from tokens → instantiate sections per measurements.
- Dev: scaffold repo with files above, then flesh out remaining components using Section 3 specs.
- Motion: implement `inview` reveals + optional GSAP altar tilt (guard with reduced‑motion).



---

## 6.a) GSAP Altar Animation (Svelte) — install, component, and hooks

**Install**
```bash
npm i gsap
```

**Purpose**
- Idle “living” altar (subtle float + glow)
- Pointer‑parallax (desktop), tilt limited to ±6°
- Accessibility: honors `prefers-reduced-motion`
- "Seal" burst when the user places their palm (or clicks the seal button)

**`src/lib/components/Altar.svelte`**
```svelte
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import gsap from 'gsap';

  const dispatch = createEventDispatcher();

  let root: HTMLElement;      // container
  let card: HTMLElement;      // altar card plane
  let orbs: NodeListOf<HTMLElement>; // floating particles
  let ring: HTMLElement;      // seal ring
  let glow: HTMLElement;      // soft inner glow

  let reduced = false;
  let cleanupFns: Array<() => void> = [];

  // public API: call from parent when palm press completes
  export function sealBurst() {
    if (reduced) return;
    const tl = gsap.timeline();
    tl.set(ring, { scale: 0.6, opacity: 0.0, filter: 'blur(6px)' })
      .to(ring, { scale: 1.05, opacity: 1, duration: 0.35, ease: 'power3.out' })
      .to(ring, { scale: 1.4, opacity: 0, duration: 0.6, ease: 'power2.in' }, '>-0.08')
      .fromTo(glow, { opacity: 0.3 }, { opacity: 0.65, duration: 0.25, yoyo: true, repeat: 1 }, '<');

    // micro pop on orbs
    gsap.to(orbs, { scale: 1.12, duration: 0.18, stagger: 0.02, yoyo: true, repeat: 1, ease: 'power1.out' });

    dispatch('sealed');
  }

  onMount(() => {
    reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduced) {
      // Idle float loops
      const float = gsap.to('.orb', {
        keyframes: [
          { y: -6, x: 3, duration: 2.6 },
          { y: 4, x: -2, duration: 2.4 },
          { y: -2, x: 2, duration: 2.2 }
        ],
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.2, from: 'random' }
      });
      cleanupFns.push(() => float.kill());

      // Subtle breathing glow
      const breathe = gsap.to(glow, { opacity: 0.5, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      cleanupFns.push(() => breathe.kill());

      // Pointer parallax / tilt
      const qx = gsap.quickTo(card, 'rotationY', { duration: 0.2, ease: 'power2.out' });
      const qy = gsap.quickTo(card, 'rotationX', { duration: 0.2, ease: 'power2.out' });
      const qtx = gsap.quickTo(card, 'x', { duration: 0.25, ease: 'power2.out' });
      const qty = gsap.quickTo(card, 'y', { duration: 0.25, ease: 'power2.out' });

      const onMove = (e: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;  // -0.5..0.5
        const dy = (e.clientY - cy) / rect.height; // -0.5..0.5
        const maxTilt = 6; // degrees
        qx(dx * maxTilt);
        qy(-dy * maxTilt);
        qtx(dx * 10);
        qty(dy * 10);
      };

      const onLeave = () => {
        gsap.to(card, { rotationX: 0, rotationY: 0, x: 0, y: 0, duration: 0.4, ease: 'power3.out' });
      };

      root.addEventListener('pointermove', onMove);
      root.addEventListener('pointerleave', onLeave);
      cleanupFns.push(() => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); });
    }

    // Keyboard focus halo (a11y)
    const onFocus = () => card.classList.add('focus');
    const onBlur = () => card.classList.remove('focus');
    card.addEventListener('focus', onFocus);
    card.addEventListener('blur', onBlur);
    cleanupFns.push(() => { card.removeEventListener('focus', onFocus); card.removeEventListener('blur', onBlur); });
  });

  onDestroy(() => cleanupFns.forEach((fn) => fn()));
</script>

<section bind:this={root} class="altar-wrap" aria-label="Ritual altar">
  <div bind:this={card} class="altar-card" tabindex="0">
    <div bind:this={glow} class="glow" aria-hidden="true"></div>
    <div class="ring" bind:this={ring} aria-hidden="true"></div>
    <!-- Orbs -->
    <div class="orb o1"></div>
    <div class="orb o2"></div>
    <div class="orb o3"></div>
    <div class="orb o4"></div>
    <!-- Placeholder for your sigil/altar SVG or Lottie -->
    <slot />
    <button class="seal-btn" on:click={sealBurst} aria-label="Seal the ritual">Seal</button>
  </div>
</section>

<style>
  .altar-wrap{ display:grid; place-items:center; }
  .altar-card{
    position:relative; width:min(560px, 92vw); aspect-ratio:1/1; 
    background: var(--glass); backdrop-filter: blur(20px);
    border:1px solid #ffffff1f; border-radius: 20px; 
    transform-style: preserve-3d; will-change: transform;
    overflow:hidden;
  }
  .altar-card.focus{ outline: 2px solid var(--clarity); outline-offset: 2px; }
  .glow{ position:absolute; inset:0; background: radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,.18), transparent 60%); opacity:.38; pointer-events:none; }
  .ring{ position:absolute; inset:12%; border-radius:50%; border:2px solid rgba(255,255,255,.28); box-shadow: 0 0 24px rgba(255,255,255,.12) inset; pointer-events:none; }

  .orb{ position:absolute; width:12px; height:12px; border-radius:50%; filter: blur(0.2px); opacity:.9; background: currentColor; box-shadow: 0 0 12px currentColor; }
  .o1{ top:14%; left:18%; color: var(--destiny-400); }
  .o2{ top:22%; right:16%; color: var(--love-400); }
  .o3{ bottom:18%; left:24%; color: var(--clarity-400); }
  .o4{ bottom:16%; right:22%; color: var(--career-400); }

  .seal-btn{ position:absolute; bottom:16px; right:16px; z-index:2; }

  @media (prefers-reduced-motion: reduce){
    .altar-card{ transition:none; }
  }
</style>
```

**Usage in Hero or Ritual page**
```svelte
<script lang="ts">
  import Altar, { sealBurst as altarSeal } from '$lib/components/Altar.svelte';
  let altarRef: any;
  function onPalmComplete(){
    // call when the palm press interaction succeeds
    altarRef?.sealBurst();
  }
</script>

<Altar bind:this={altarRef} on:sealed={() => console.log('sealed!')}>
  <!-- Place your sigil SVG or Lottie here -->
  <div aria-hidden="true">[Sigil]</div>
</Altar>

<!-- Somewhere in your UI: -->
<button on:click={onPalmComplete}>Simulate Palm Press</button>
```

**Notes**
- Keep the animation **subtle**; the altar should feel alive, not distracting.
- All motion disables when user prefers reduced motion.
- Replace the `<slot />` with your live sigil SVG/Lottie. Ensure SVG has `focusable="false"` and `aria-hidden="true"` if decorative.
- If you later add ScrollTrigger (e.g., section entrance), import from `gsap/ScrollTrigger` and `gsap.registerPlugin(ScrollTrigger)` in this component.



---

## 6.b) Palm‑Press Interaction (touch/hold with progress ring)

**Purpose**
- Require a calm **2‑second** hold to “seal the ritual.”
- Cancel on pointer leave/move beyond a small threshold; accessible keyboard fallback (Space/Enter).
- Emits `complete` when hold succeeds → call `altarRef.sealBurst()`.

**`src/lib/components/PalmPress.svelte`**
```svelte
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import gsap from 'gsap';

  const dispatch = createEventDispatcher();
  export let holdMs = 2000; // duration to seal
  let root: HTMLElement;
  let circle: SVGCircleElement;
  let tl: gsap.core.Tween | null = null;
  let startX = 0, startY = 0, active = false, cancelled = false;
  const threshold = 16; // px wobble allowed

  function begin(x:number, y:number){
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // instantly complete for a11y users who prefer no motion
      dispatch('complete');
      return;
    }
    if (active) return;
    active = true; cancelled = false; startX = x; startY = y;
    gsap.set(circle, { strokeDashoffset: 314 }); // circumference ≈ 2πr where r=50 → ~314
    tl = gsap.to(circle, { strokeDashoffset: 0, duration: holdMs/1000, ease: 'linear', onComplete: () => {
      if (!cancelled) dispatch('complete');
    }});
  }

  function cancel(){
    if (!active) return;
    cancelled = true; active = false;
    tl?.kill(); tl = null;
    gsap.to(circle, { strokeDashoffset: 314, duration: 0.2 });
  }

  function pointerDown(e: PointerEvent){
    (e.target as Element).setPointerCapture?.(e.pointerId);
    begin(e.clientX, e.clientY);
  }

  function pointerMove(e: PointerEvent){
    if (!active) return;
    const dx = e.clientX - startX; const dy = e.clientY - startY;
    if (Math.hypot(dx, dy) > threshold) cancel();
  }

  function pointerUp(){ cancel(); }

  function keyDown(e: KeyboardEvent){
    if (e.code === 'Space' || e.code === 'Enter'){ begin(0,0); }
  }
  function keyUp(e: KeyboardEvent){
    if (e.code === 'Space' || e.code === 'Enter'){ cancel(); }
  }

  onMount(()=>{
    root.addEventListener('pointerdown', pointerDown);
    root.addEventListener('pointermove', pointerMove);
    root.addEventListener('pointerup', pointerUp);
    root.addEventListener('pointercancel', cancel);
    root.addEventListener('keydown', keyDown);
    root.addEventListener('keyup', keyUp);
  });
  onDestroy(()=>{
    root.removeEventListener('pointerdown', pointerDown);
    root.removeEventListener('pointermove', pointerMove);
    root.removeEventListener('pointerup', pointerUp);
    root.removeEventListener('pointercancel', cancel);
    root.removeEventListener('keydown', keyDown);
    root.removeEventListener('keyup', keyUp);
  });
</script>

<div bind:this={root} class="press" role="button" tabindex="0" aria-label="Hold to seal the ritual">
  <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0%" stop-color="var(--clarity-400)"/>
        <stop offset="100%" stop-color="var(--destiny-400)"/>
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="52" fill="none" stroke="#ffffff22" stroke-width="4"/>
    <circle bind:this={circle} cx="60" cy="60" r="50" fill="none" stroke="url(#g)" stroke-width="6"
      stroke-dasharray="314" stroke-dashoffset="314" stroke-linecap="round"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" style="fill:var(--ink);opacity:.8;font-size:12px">Hold</text>
  </svg>
</div>

<style>
  .press{ display:grid; place-items:center; width:140px; height:140px; border-radius:50%; background: var(--glass); border:1px solid #ffffff22; }
  .press:focus{ outline: 2px solid var(--clarity); outline-offset: 2px; }
</style>
```

**Usage (wire to Altar)**
```svelte
<script lang="ts">
  import Altar from '$lib/components/Altar.svelte';
  import PalmPress from '$lib/components/PalmPress.svelte';
  let altarRef: any;
</script>

<div class="section card" style="padding:24px; display:grid; grid-template-columns: 1fr auto; gap:24px; align-items:center;">
  <Altar bind:this={altarRef} on:sealed={() => console.log('sealed!')}>
    <div aria-hidden="true">[Sigil]</div>
  </Altar>
  <PalmPress on:complete={() => altarRef?.sealBurst()} />
</div>
```

**Notes**
- Change `holdMs` prop if you want 1500–2500ms variants for testing.
- Pointer wobble threshold keeps it intentional; adjust as needed.

---

## 6.c) ScrollTrigger Section Entrance (GSAP)

**Install & register**
```ts
// src/lib/gsap.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
```

**Reveal wrapper component**
```svelte
<!-- src/lib/components/RevealSection.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap, ScrollTrigger } from '$lib/gsap';
  export let y = 16; // px
  export let duration = 0.24;
  let el: HTMLElement; let anim: gsap.core.Tween; let st: ScrollTrigger;
</script>

<section bind:this={el} class="reveal-wrap"><slot /></section>

<style>
  .reveal-wrap{ opacity:0; transform: translateY(var(--y,16px)); }
</style>

<script lang="ts">
  onMount(()=>{
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1'; el.style.transform = 'none'; return;
    }
    anim = gsap.to(el, { opacity: 1, y: 0, duration, ease: 'power2.out', paused: true });
    st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => anim.play(),
      once: true
    });
  });
  onDestroy(()=>{ anim?.kill(); st?.kill(); });
</script>
```

**Usage**
```svelte
<script lang="ts">
  import RevealSection from '$lib/components/RevealSection.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import HowItWorks from '$lib/components/HowItWorks.svelte';
</script>

<RevealSection><Hero /></RevealSection>
<RevealSection y={24}><HowItWorks /></RevealSection>
```

**Notes**
- `once: true` keeps it snappy; remove for repeat animations if desired.
- Respects reduced‑motion automatically.



---

## 8) Brand Duality — Asteria Guide (Luxury) vs Cosmo Note ($10)

### 8.1 Positioning & Tone
- **Asteria Guide (Luxury):** Ritual, ceremony, calm mastery. Language is composed, spacious, confident. Price ladder with concierge upsells.
- **Cosmo Note ($10):** Fast, playful, snackable clarity. Language is energetic, direct, emoji‑lite. Tripwire first, micro‑upsells second.

### 8.2 Visual Systems (Figma Tokens)

**Asteria Guide — Tokens**
- Base: `#0C0A1A` (ink on midnight), glass blur 20, grain overlay 12%.
- Type: Display serif + humanist sans (as defined earlier).
- Accents: Love `#F06FA3`, Career `#F2C14E`, Destiny `#9C6CFF`, Clarity `#30D5C8`.
- Motifs: Altar, sigils, soft caustics.

**Cosmo Note — Tokens**
- Base: `#0B1220` to `#0E1B2E` with **flat cards** (no glass). Noise off.
- Type: **Grotesk** bold headlines + system sans body.
- Accent gradient: `--cosmo-grad: linear-gradient(90deg,#7CF7FF,#7AA7FF,#C07CFF)`.
- Buttons: solid, high‑contrast, rounded 12.
- Icons: Filled 2‑tone glyphs; fewer glows.

Add to `tokens.css`:
```css
/* Brand switch */
:root{ --brand: 'asteria'; }
:root[ data-brand='cosmo' ]{
  --bg:#0E1B2E; --panel:#111E33; --ink:#EAF3FF; --muted:#B9CCE8;
  --accent1:#7CF7FF; --accent2:#7AA7FF; --accent3:#C07CFF; --btn:#1F3B66;
  --glass:transparent; --radius:12px;
  --headline-weight:800; --body-weight:500;
}

/* Asteria defaults remain above; Cosmo overrides here. */

/* Cosmo button */
[data-brand='cosmo'] .btn{ background: var(--btn); border-color:#2A5082; }
[data-brand='cosmo'] .btn.primary{ background: var(--accent3); color:#0A0F18; border:none; }

/* Cosmo cards are flat */
[data-brand='cosmo'] .card{ background:#0F1C31; backdrop-filter:none; border:1px solid #22385F; }

/* Gradient headline */
[data-brand='cosmo'] .h1{ background: linear-gradient(90deg, var(--accent1), var(--accent2), var(--accent3));
  -webkit-background-clip:text; color:transparent; font-weight: var(--headline-weight); }
```

### 8.3 IA & Section Differences

**Asteria Hero (luxury)**
- “Not a chatbot. A 60‑second ritual.”
- Secondary CTA: demo video, proof strip with resonance metrics.

**Cosmo Hero ($10)**
- H1: “Clarity in 60 seconds.”
- Sub: “3 lines free. Full reading $10. Refund in 24h.”
- Primary CTA: **Get My 3 Lines** → jumps to teaser immediately.
- Badges: “$10 one‑time”, “Apple/Google Pay”, “24h refund”.

**Asteria Sections**
- Ritual ceremony, altar animation, Journeys grid, Ethics accordion.

**Cosmo Sections** (shorter, punchier)
1. Hero (above)
2. Free Teaser inline (immediately visible)
3. Price strip (one card: **Full Reading $10** + bump toggle)
4. Social tiles (UGC screenshots, 2 rows)
5. FAQ (3 items)
6. Install PWA banner
7. Footer

### 8.4 Copy Variants (ready to paste)

**Cosmo Note**
- Hero H1: “Clarity in 60 seconds.”
- Sub: “Ask one question. Get 3 lines free. Unlock the full reading for $10.”
- CTA: “Get My 3 Lines”
- Trust chip row: “No account · $10 one‑time · 24h refund”
- Teaser example lines:
  - “Watch for a late‑night message Thu–Sun — it clears the vibe.”
  - “A ‘J’ or ‘G’ initial repeats. That’s your green light.”
  - “Reply short. Let them suggest the plan.”
- Paywall button: “Unlock Full Reading — $10”
- Price microcopy: “10+ insights • personal sigil • 7‑day check‑in • refund in 24h.”

**Asteria Guide**
- Keep the original composed ritual language and structure.

### 8.5 Svelte Routing Structure
```
src/routes/
├─ (asteria)/+layout.svelte  // sets data-brand='asteria'
│  └─ +page.svelte           // luxury homepage
└─ (cosmo)/+layout.svelte    // sets data-brand='cosmo'
   └─ +page.svelte           // $10 homepage
```

**`src/routes/(asteria)/+layout.svelte`**
```svelte
<script>
  import '../app.css';
</script>
<svelte:body data-brand="asteria" />
<slot />
```

**`src/routes/(cosmo)/+layout.svelte`**
```svelte
<script>
  import '../app.css';
</script>
<svelte:body data-brand="cosmo" />
<slot />
```

### 8.6 Cosmo Note Homepage (component substitutions)

Create lightweight Cosmo components using the existing API but with flatter visuals and shorter copy.

**`src/lib/components/cosmo/HeroCosmo.svelte`**
```svelte
<section class="section" style="padding-top:72px">
  <div class="grid" style="grid-template-columns: 1.1fr 1fr; align-items:center;">
    <div>
      <h1 class="h1">Clarity in 60 seconds.</h1>
      <p class="sub">3 lines free. Full reading $10. Refund in 24h.</p>
      <a class="btn primary" href="#teaser">Get My 3 Lines</a>
      <div style="display:flex; gap:12px; margin-top:12px; opacity:.9; flex-wrap:wrap">
        <span>No account</span><span>• $10 one‑time</span><span>• Apple/Google Pay</span>
      </div>
    </div>
    <div class="card" style="aspect-ratio:1/1; max-width:520px; margin-left:auto; display:grid; place-items:center">
      <div>[Fast preview art]</div>
    </div>
  </div>
</section>
```

**`src/lib/components/cosmo/TeaserCosmo.svelte`**
```svelte
<section id="teaser" class="section">
  <div class="card" style="padding:20px">
    <div style="display:grid; grid-template-columns:1fr auto; gap:16px; align-items:center">
      <div>
        <div style="opacity:.7; font-size:12px">Your free lines</div>
        <ul style="margin:8px 0 0 16px; padding:0">
          <li>Watch for a late‑night message Thu–Sun— it clears the vibe.</li>
          <li>A ‘J’ or ‘G’ initial repeats. That’s your green light.</li>
          <li>Reply short. Let them suggest the plan.</li>
        </ul>
      </div>
      <div style="text-align:right">
        <div class="card" style="padding:12px; min-width:220px">
          <div style="font-weight:700">Full Reading — $10</div>
          <div style="opacity:.8; font-size:14px">10+ insights • sigil • 7‑day check‑in</div>
          <button class="btn primary" style="margin-top:8px">Unlock</button>
          <label style="display:flex; gap:8px; align-items:center; margin-top:10px">
            <input type="checkbox"/> <span>Add Lucky Dates (+$3)</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</section>
```

**`src/routes/(cosmo)/+page.svelte`**
```svelte
<script>
  import '$lib/styles/tokens.css';
  import HeroCosmo from '$lib/components/cosmo/HeroCosmo.svelte';
  import TeaserCosmo from '$lib/components/cosmo/TeaserCosmo.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import InstallCTA from '$lib/components/InstallCTA.svelte';
  import FooterMain from '$lib/components/FooterMain.svelte';
</script>

<HeroCosmo />
<TeaserCosmo />
<FAQ />
<InstallCTA />
<FooterMain />
```

### 8.7 Content & Motion Differences
- **Asteria:** Keep GSAP altar parallax, palm‑press ritual, lavish spacing, glass cards.
- **Cosmo:** Remove altar parallax; use quick reveals only. No glassmorphism; solid cards. Faster timing (180–220ms) on reveals. Headlines with gradient text.

### 8.8 Analytics Segmentation
Add `brand` to all events so dashboards split cleanly:
```js
dataLayer.push({ event:'purchase', value:10, brand:'cosmo', ... });
```

### 8.9 Domain & App Manifests
- Asteria Guide → primary domain (e.g., asteriaguide.com), icon set with luxe glyph.
- Cosmo Note → separate domain/subdomain (e.g., cosmonote.app), icons with gradient ring.
- Two manifest files if hosted separately; or one manifest toggled by route if single origin.

---

**Result:** You now have two clearly differentiated experiences:
- **Asteria Guide (luxury):** the original ritual‑first homepage and motion system.
- **Cosmo Note ($10):** a compact, punchy variant with flat UI, gradient headlines, immediate teaser, and streamlined sections.

