<script lang="ts">
  const guides = [
    { category: 'Astrology', name: 'Celtic Tree Zodiac', desc: 'Ancient Celtic wisdom through sacred trees', img: '/celtic.png', url: '/asteria/astrology/celtic/information' },
    { category: 'Astrology', name: 'Chinese Zodiac', desc: 'Eastern zodiac based on lunar calendar', img: '/chinese.png', url: '/asteria/astrology/chinese-zodiac/information' },
    { category: 'Astrology', name: 'Egyptian', desc: 'Ancient Egyptian astrological system', img: '/egyptian.png', url: '/asteria/astrology/egyptian/information' },
    { category: 'Astrology', name: 'Japanese', desc: 'Traditional Japanese star reading', img: '/japanese.png', url: '/asteria/astrology/japanese/information' },
    { category: 'Astrology', name: 'Mayan', desc: 'Mesoamerican calendar astrology', img: '/mayan.png', url: '/asteria/astrology/mayan/information' },
    { category: 'Astrology', name: 'Panchang', desc: 'Hindu calendar and auspicious timing', img: '/panch_logo.png', url: '/asteria/astrology/panchang/information' },
    { category: 'Astrology', name: 'Vedic', desc: 'Ancient Indian Jyotish astrology', img: '/vedic.png', url: '/asteria/astrology/vedic/information' },
    { category: 'Astrology', name: 'Western', desc: 'Traditional zodiac and horoscopes', img: '/western.png', url: '/asteria/astrology/western/information' },
    { category: 'Numerology', name: 'Angel Numbers', desc: 'Divine messages through numbers', img: '/angle.png', url: '/asteria/numerology/angle/information' },
    { category: 'Numerology', name: 'Chaldean', desc: 'Ancient Babylonian number system', img: '/chaldean.png', url: '/asteria/numerology/chaldean/information' },
    { category: 'Numerology', name: 'Chinese', desc: 'Eastern numerology traditions', img: '/chineseN.png', url: '/asteria/numerology/chinese/information' },
    { category: 'Numerology', name: 'Kabbalistic', desc: 'Hebrew mystical numerology', img: '/kabbalistic.png', url: '/asteria/numerology/kabbalistic/information' },
    { category: 'Numerology', name: 'Western', desc: 'Pythagorean number meanings', img: '/westernN.png', url: '/asteria/numerology/western/information' },
    { category: 'Divination', name: 'Conchomancy', desc: 'Shell casting divination', img: '/shell.png', url: '/asteria/divination/conchomancy/information' },
    { category: 'Divination', name: 'I Ching', desc: 'Ancient Chinese oracle', img: '/iching.png', url: '/asteria/divination/i-ching/information' },
    { category: 'Divination', name: 'Oracle Cards', desc: 'Intuitive card guidance', img: '/oracle.png', url: '/asteria/divination/oracle/information' },
    { category: 'Divination', name: 'Palmistry', desc: 'Reading the lines of your hand', img: '/palmistry.png', url: '/asteria/divination/palmistry/information' },
    { category: 'Divination', name: 'Runes', desc: 'Norse alphabet divination', img: '/runes.png', url: '/asteria/divination/runes/information' },
    { category: 'Divination', name: 'Tarot Cards', desc: 'Traditional card reading', img: '/tarot-cards.png', url: '/asteria/divination/tarot-cards/information' }
  ];
</script>

<div class="guides-page">
  <h1>All Guides</h1>
  <p class="subtitle">Explore all mystical practices at a glance</p>
  
  <div class="guides-grid">
    {#each guides as guide}
      <a href={guide.url} class="guide-card">
        <img src={guide.img} alt={guide.name} />
        <div class="guide-content">
          <span class="category">{guide.category}</span>
          <h3>{guide.name}</h3>
          <p>{guide.desc}</p>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .guides-page {
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
    margin-bottom: 48px;
  }

  .guides-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }

  .guide-card {
    background: var(--panel, rgba(20, 17, 39, 0.98));
    border: 1px solid #ffffff1f;
    border-radius: 16px;
    overflow: hidden;
    text-decoration: none;
    transition: transform 0.2s, border-color 0.2s;
  }

  .guide-card:hover {
    transform: translateY(-4px);
    border-color: var(--clarity, #30D5C8);
  }

  .guide-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .guide-content {
    padding: 20px;
  }

  .category {
    font-size: 12px;
    color: var(--clarity, #30D5C8);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  h3 {
    color: var(--ink, #EDEBFF);
    font-size: 1.25rem;
    margin: 8px 0;
  }

  p {
    color: var(--ink, #EDEBFF);
    opacity: 0.7;
    font-size: 14px;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    .guides-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
