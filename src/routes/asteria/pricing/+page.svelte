<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let selectedLang = 'EN';
  let countries: string[] = [];

  const countryMap: Record<string, string[]> = {
    'EN': ['India', 'Serbia', 'United States', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Belgium', 'Austria', 'Poland'],
    'RS/HR': ['Serbia', 'Croatia'],
    'RU': ['Serbia', 'United States', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Belgium', 'Austria', 'Poland'],
    'TR': ['Serbia', 'United States', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Belgium', 'Austria', 'Poland']
  };

  const pricingByCountry: Record<string, { full: string; timing: string; deep: string }> = {
    'India': { full: '₹800', timing: '₹1040', deep: '₹2320' },
    'Serbia': { full: '€9', timing: '€12', deep: '€27' },
    'Croatia': { full: '€9', timing: '€12', deep: '€27' },
    'United States': { full: '$10', timing: '$13', deep: '$29' },
    'United Kingdom': { full: '£8', timing: '£10', deep: '£23' },
    'Germany': { full: '€9', timing: '€12', deep: '€27' },
    'France': { full: '€9', timing: '€12', deep: '€27' },
    'Spain': { full: '€9', timing: '€12', deep: '€27' },
    'Italy': { full: '€9', timing: '€12', deep: '€27' },
    'Netherlands': { full: '€9', timing: '€12', deep: '€27' },
    'Belgium': { full: '€9', timing: '€12', deep: '€27' },
    'Austria': { full: '€9', timing: '€12', deep: '€27' },
    'Poland': { full: 'zł40', timing: 'zł52', deep: 'zł116' }
  };

  onMount(() => {
    const lang = $page.url.searchParams.get('lang') || 'EN';
    selectedLang = lang;
    countries = countryMap[lang] || countryMap['EN'];
  });

  function handleLangChange(e: Event) {
    selectedLang = (e.target as HTMLSelectElement).value;
    countries = countryMap[selectedLang];
  }
</script>

<div class="pricing-page">
  <h1>Pricing</h1>
  <p class="subtitle">Choose your country to see pricing in your currency</p>
  
  <div class="lang-selector-wrapper">
    <label for="lang">Language:</label>
    <select id="lang" bind:value={selectedLang} on:change={handleLangChange}>
      <option value="EN">EN</option>
      <option value="RS/HR">RS/HR</option>
      <option value="RU">RU</option>
      <option value="TR">TR</option>
    </select>
  </div>

  <div class="countries-grid">
    {#each countries as country}
      <div class="country-card">
        <h3>{country}</h3>
        <div class="pricing-options">
          <div class="price-item">
            <span class="label">Full Reading</span>
            <span class="price">{pricingByCountry[country].full}</span>
          </div>
          <div class="price-item">
            <span class="label">With Timing</span>
            <span class="price">{pricingByCountry[country].timing}</span>
          </div>
          <div class="price-item">
            <span class="label">Deep Dive</span>
            <span class="price">{pricingByCountry[country].deep}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .pricing-page {
    min-height: 100vh;
    padding: 120px 24px 80px;
    max-width: 1400px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    background: linear-gradient(90deg, var(--destiny, #9C6CFF), var(--clarity, #30D5C8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 16px;
  }

  .subtitle {
    text-align: center;
    color: var(--ink, #EDEBFF);
    opacity: 0.7;
    margin-bottom: 32px;
  }

  .lang-selector-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-bottom: 48px;
  }

  .lang-selector-wrapper label {
    color: var(--ink, #EDEBFF);
    font-weight: 500;
  }

  .lang-selector-wrapper select {
    padding: 8px 16px;
    background: var(--panel, rgba(20, 17, 39, 0.98));
    border: 1px solid #ffffff22;
    border-radius: 8px;
    color: var(--ink, #EDEBFF);
    font-size: 15px;
    cursor: pointer;
  }

  .countries-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

  .country-card {
    background: var(--panel, rgba(20, 17, 39, 0.98));
    border: 1px solid #ffffff1f;
    border-radius: 16px;
    padding: 24px;
  }

  h3 {
    color: var(--clarity, #30D5C8);
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
  }

  .pricing-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .price-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }

  .label {
    color: var(--ink, #EDEBFF);
    font-size: 14px;
  }

  .price {
    color: var(--destiny, #9C6CFF);
    font-size: 18px;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    .countries-grid {
      grid-template-columns: 1fr;
    }
  }
</style>