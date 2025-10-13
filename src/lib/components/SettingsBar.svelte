<script lang="ts">
  import { onMount } from 'svelte';
  import * as sound from '$lib/sound';
  import * as haptics from '$lib/haptics';

  let soundOn = true;
  let hapticsOn = true;
  let volume = 0.7;

  onMount(() => {
    sound.setEnabled(soundOn);
    sound.setVolume(volume);
    haptics.setEnabled(hapticsOn);
  });

  function toggleSound() {
    soundOn = !soundOn;
    sound.setEnabled(soundOn);
  }

  function toggleHaptics() {
    hapticsOn = !hapticsOn;
    haptics.setEnabled(hapticsOn);
  }

  function updateVolume() {
    sound.setVolume(volume);
  }
</script>

<div class="settings">
  <label><input type="checkbox" bind:checked={soundOn} on:change={toggleSound} /> Sound</label>
  <label><input type="checkbox" bind:checked={hapticsOn} on:change={toggleHaptics} /> Haptics</label>
  <label style="display:flex; align-items:center; gap:8px;">
    Volume
    <input type="range" min="0" max="1" step="0.01" bind:value={volume} on:input={updateVolume} />
  </label>
</div>

<style>
  .settings {
    display:flex; flex-wrap:wrap; gap:12px;
    background: var(--panel);
    border:1px solid #2a364e; border-radius:12px;
    padding:8px 12px;
  }
  label { font-size:.9rem; color:#bfd0ea; display:flex; gap:6px; }
  input[type="range"] { width:140px; accent-color: var(--accent); }
</style>