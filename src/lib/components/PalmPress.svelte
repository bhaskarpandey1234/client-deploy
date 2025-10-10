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
