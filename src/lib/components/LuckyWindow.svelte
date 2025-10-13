<script lang="ts">
  export let visible = false;
  export let size = 100;
</script>

{#if visible}
  <div class="omen" style="width:{size}px; height:{size}px;" aria-label="Lucky Window">
    <div class="sparkle"></div>
  </div>
{/if}

<style>
  .omen {
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: none;
    border-radius: 50%;
    box-shadow:
      0 0 0 2px rgba(201,168,106,.42),
      0 0 32px rgba(201,168,106,.35),
      0 0 64px rgba(201,168,106,.25);
    animation: omenPulse 1.6s ease-in-out infinite;
    background:
      radial-gradient(closest-side, rgba(201,168,106,.22), transparent 70%),
      conic-gradient(from 0deg, rgba(201,168,106,.35), transparent 90%);
  }

  .sparkle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #ffd700, transparent);
    border-radius: 50%;
    animation: sparkleRotate 2s linear infinite;
  }

  @keyframes omenPulse {
    0%, 100% { transform: translate(-50%, -50%) scale(.94); opacity: .8; }
    50% { transform: translate(-50%, -50%) scale(1.06); opacity: 1; }
  }

  @keyframes sparkleRotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
</style>