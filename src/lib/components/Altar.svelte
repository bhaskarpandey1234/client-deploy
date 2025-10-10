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


