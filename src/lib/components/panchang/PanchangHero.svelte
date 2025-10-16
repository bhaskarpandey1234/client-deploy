<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  type Coords = { lat: number; lon: number } | null;

  const dispatch = createEventDispatcher<{
    fetch: { date: string; tz: string; location: string; coords: Coords }
  }>();

  let locationText = '';
  let date = new Date().toISOString().slice(0, 10);
  let tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  let coords: Coords = null;
  let busy = false;
  let err = '';
  let tzList: string[] = ['UTC','Asia/Kolkata','Europe/London','America/New_York','America/Los_Angeles'];

  onMount(() => {
    if (Intl.supportedValuesOf) {
      const full = Intl.supportedValuesOf('timeZone');
      if (full?.length) tzList = full;
    }
  });

  async function useCurrentLocation() {
    err = '';
    if (!navigator.geolocation) {
      err = 'Geolocation not available.';
      return;
    }
    busy = true;
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 })
      );
      coords = { lat: +pos.coords.latitude.toFixed(6), lon: +pos.coords.longitude.toFixed(6) };
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || tz;
      if (!locationText) locationText = 'Detected location';
    } catch (e) {
      err = 'Could not detect location.';
    } finally {
      busy = false;
    }
  }

  function validate(): boolean {
    err = '';
    if (!date) err = 'Please select a date.';
    if (!locationText && !coords) err = 'Enter a city or use current location.';
    if (!tz) err = 'Please choose a time zone.';
    return !err;
  }

  function submit() {
    if (!validate()) return;
    busy = true;
    dispatch('fetch', { date, tz, location: locationText.trim(), coords });
    setTimeout(() => (busy = false), 300);
  }
</script>

<div class="wrap">
  <section class="card">
    <h1>Today's Panchang — Clear Timings for Clear Decisions</h1>
    <p class="sub">Get Tithi, Nakshatra, Rahukalam, Abhijit, and Choghadiya for your location.</p>

    <div class="grid">
      <div>
        <label for="loc">Location</label>
        <input
          id="loc"
          type="text"
          placeholder="City, Region (e.g., Bengaluru, IN)"
          bind:value={locationText}
        />
        <div class="loc-actions">
          <button class="link" type="button" on:click={useCurrentLocation} disabled={busy}>
            Use current location
          </button>
          {#if coords}
            <span>Detected: {coords.lat}, {coords.lon}</span>
          {/if}
        </div>
      </div>

      <div class="row">
        <div>
          <label for="date">Date</label>
          <input id="date" type="date" bind:value={date} />
        </div>

        <div>
          <label for="tz">Time zone</label>
          <select id="tz" bind:value={tz}>
            {#each tzList as z}
              <option value={z}>{z}</option>
            {/each}
          </select>
        </div>

        <div style="align-self:end;">
          <button class="cta" on:click={submit} disabled={busy}>
            {busy ? 'Working…' : 'Get Panchang'}
          </button>
        </div>
      </div>
    </div>

    <div class="foot">
      <span>Times are local to your chosen location.</span>
      {#if err}<span class="err">• {err}</span>{/if}
    </div>
  </section>
</div>

<style>
  .wrap { display:grid; place-items:center; padding: 24px; background: var(--bg); }
  .card {
    width: min(100%, 760px);
    background: linear-gradient(135deg, #1a2334 0%, #0d1422 100%);
    border: 1px solid #2a364e;
    border-radius: 16px;
    box-shadow: 0 12px 40px rgba(0,0,0,.35);
    padding: 24px;
  }
  @media (min-width: 768px) { .card { padding: 32px; } }

  h1 { font-size: 32px; line-height: 1.15; margin: 0 0 8px 0; color: #e9eef8; }
  .sub { color: #b7c5db; margin-bottom: 20px; }

  .grid { display: grid; gap: 16px; }
  @media (min-width: 820px) { .grid { grid-template-columns: 1.4fr 1fr; } }

  label { display:block; font-size: 13px; color: #b7c5db; margin-bottom: 6px; }
  .row { display:grid; gap: 16px; }
  @media (min-width: 820px) { .row { grid-template-columns: 1.2fr 1fr 1fr; } }

  input[type="text"], input[type="date"], select {
    width: 100%; height: 48px;
    background: #0e1524;
    color: #e9eef8;
    border: 1px solid #2a364e;
    border-radius: 12px;
    padding: 0 12px;
    outline: none;
  }
  input::placeholder { color: #7c879f; }
  input:focus, select:focus { border-color: #c9a86a; box-shadow: 0 0 0 3px rgba(201,168,106,.35); }

  .loc-actions { display:flex; gap: 12px; align-items:center; margin-top: 8px; font-size: 14px; color: #b7c5db; }
  .link {
    background: transparent; border: 0; color: #c9a86a;
    padding: 0; text-decoration: underline; cursor: pointer; font-size: 14px;
  }

  .cta {
    appearance:none; height: 48px; padding: 0 16px; border-radius: 12px;
    border: 1px solid #996f12;
    background: linear-gradient(135deg, #c9a86a, #d4b87a);
    color: #0b0f14; font-weight: 700; cursor: pointer;
  }
  .cta:hover { background: linear-gradient(135deg, #d4b87a, #c9a86a); }
  .cta[disabled] { opacity:.6; cursor: not-allowed; }

  .foot { display:flex; gap: 16px; align-items:center; margin-top: 20px; color: #b7c5db; font-size: 14px; }
  .err { color: #f87171; }
</style>
