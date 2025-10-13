<script lang="ts">
  import { onMount } from 'svelte';
  import ShellSVG from './ShellSVG.svelte';
  import * as sound from '$lib/sound';
  import * as haptics from '$lib/haptics';
  import { lunarInfo } from '$lib/lunar';

  let casting = false;
  let lastCast: any = null;
  let lunar = lunarInfo();

  const shells = ['cowrie', 'conch', 'scallop', 'clam', 'limpet', 'olive', 'auger', 'turban', 'sundial', 'top', 'star', 'moon'];

  function simulateRareOmen() {
    // Simulate lucky window for demo
    return Math.random() < 0.15; // 15% chance
  }

  function castShells() {
    if (casting) return;
    casting = true;
    lunar = lunarInfo(); // Update moon phase

    // User gesture hook for AudioContext
    sound.ensureStarted();
    sound.playCast();
    haptics.vibrate(haptics.CAST_PATTERN);

    const isLucky = simulateRareOmen();
    lastCast = { lucky: isLucky, lunar };

    setTimeout(() => {
      sound.playSettle();
      haptics.vibrate(haptics.SETTLE_PATTERN);
      
      // Rare omen sparkle
      if (isLucky) {
        sound.playRare();
        haptics.vibrate(haptics.LUCKY_PATTERN);
      }
      
      casting = false;
    }, 420);
  }
</script>

<div class="cast-container">
  <button class="cast-btn" on:click={castShells} disabled={casting}>
    {casting ? 'Casting...' : 'Cast Shells'}
  </button>
  
  <div class="shells-preview">
    {#each shells.slice(0, 6) as shell}
      <div class="shell-icon">
        <ShellSVG id={shell} size={24} />
      </div>
    {/each}
  </div>
  
  {#if lastCast}
    <div class="cast-result">
      {#if lastCast.lucky}
        <div class="lucky-window">
          ✨ Lucky Window! ✨
        </div>
      {/if}
      <div class="lunar-info">
        Moon: {lastCast.lunar.phase} ({Math.round(lastCast.lunar.fraction * 100)}%)
      </div>
    </div>
  {/if}
</div>

<style>
  .cast-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 24px;
  }

  .cast-btn {
    padding: 12px 24px;
    background: var(--glass);
    border: 1px solid #ffffff22;
    border-radius: 12px;
    color: var(--ink);
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .cast-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    background: #ffffff15;
  }

  .cast-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .shells-preview {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .shell-icon {
    padding: 8px;
    background: var(--glass);
    border-radius: 8px;
    border: 1px solid #ffffff11;
  }

  .cast-result {
    margin-top: 16px;
    text-align: center;
  }

  .lucky-window {
    background: linear-gradient(45deg, var(--icon), #ffd700);
    -webkit-background-clip: text;
    color: transparent;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 8px;
    animation: sparkle 1.5s ease-in-out infinite;
  }

  .lunar-info {
    font-size: 14px;
    opacity: 0.8;
    color: var(--muted);
  }

  @keyframes sparkle {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
</style>