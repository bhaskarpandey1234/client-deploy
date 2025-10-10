<!-- src/lib/components/RevealSection.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap, ScrollTrigger } from '$lib/gsap';
  export let y = 16; // px
  export let duration = 0.24;
  let el: HTMLElement; 
  let anim: gsap.core.Tween; 
  let st: ScrollTrigger;

  onMount(()=>{
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1'; el.style.transform = 'none'; return;
    }
    // Set initial state with custom y value
    gsap.set(el, { y: y });
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

<section bind:this={el} class="reveal-wrap"><slot /></section>

<style>
  .reveal-wrap{ opacity:0; }
</style>
