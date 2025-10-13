<script lang="ts">
  export let id: string;
  export let size = 20;
  export let stroke = "var(--icon, #c9a86a)";
  export let strokeWidth = 1.6;
  export let upright = true; // reserved for future stylistic tweaks
</script>

{#if id==='cowrie'}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="cowrie">
  <ellipse cx="12" cy="12" rx="7" ry="10"></ellipse>
  <path d="M8 12c2.4-2 5.6-2 8 0M8 10c2.4-2 5.6-2 8 0M8 14c2.4 2 5.6 2 8 0"/>
</svg>
{:else if id==='conch'}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="conch">
  <path d="M3 12c6-5 9-6 12-5 3 1 4 4 3 7-1 3-5 5-8 5-2 0-4-2-4-4 0-1 0-2 1-3z"/>
  <path d="M10 10c1.7-.9 3.1-.5 3.7.5.6 1.1.1 2.5-1.6 3.4"/>
</svg>
{:else if id==='scallop'}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="scallop">
  <path d="M12 5c-4 0-7 3-7 7 0 2 1 3 2 4h10c1-1 2-2 2-4 0-4-3-7-7-7z"/>
  <path d="M12 6v10M8 7l4 9M16 7l-4 9"/>
</svg>
{:else if id==='clam'}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="clam">
  <path d="M4 13c2-3 6-5 8-5s6 2 8 5c-2 2-6 4-8 4s-6-2-8-4z"/>
  <path d="M6 13c2 1 4 2 6 2s4-1 6-2"/>
</svg>
{:else if id==='limpet'}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="limpet">
  <path d="M12 6l7 11H5l7-11z"/>
  <path d="M9 17l3-6 3 6"/>
</svg>
{:else if id==='olive'}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="olive">
  <ellipse cx="12" cy="12" rx="6" ry="9"/>
  <path d="M15 7c-2 2-4 6-4 10"/>
</svg>
{:else if id==='auger'}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="auger">
  <path d="M6 4c5 0 9 4 9 9 0 4-3 7-7 7"/>
  <path d="M7 7l4 1M8 10l4 1M9 13l3 1M10 16l2 1"/>
</svg>
{:else if id==='turban'}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="turban">
  <path d="M12 6c-5 0-9 3-9 6 0 3 4 6 9 6s9-3 9-6c0-3-4-6-9-6z"/>
  <path d="M4 12c3-2 7-2 10 0 2 1 4 3 4 3"/>
</svg>
{:else if id==='sundial'}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="sundial">
  <circle cx="12" cy="12" r="7"/>
  <path d="M12 12l4-6M12 5v2M12 19v-2M5 12h2M17 12h2"/>
</svg>
{:else if id==='top'}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="top shell">
  <path d="M12 4c3 0 6 3 6 6 0 5-4 8-6 10-2-2-6-5-6-10 0-3 3-6 6-6z"/>
  <path d="M9 10c1-1 3-1 4 0"/>
</svg>
{:else if id==='star'}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="star shell">
  <path d="M12 3l2.7 5.6 6.2.9-4.5 4.4 1 6.2L12 17l-5.4 3.1 1-6.2L3 9.5l6.2-.9z"/>
</svg>
{:else if id==='moon'}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="moon shell">
  <path d="M14 3a9 9 0 1 0 7 14.5A8 8 0 0 1 14 3z"/>
</svg>
{:else}
<svg viewBox="0 0 24 24" {stroke} fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} width={size} height={size} aria-label="shell">
  <circle cx="12" cy="12" r="8"/>
</svg>
{/if}