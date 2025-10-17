<script lang="ts">
  interface InfoCard {
    id: string;
    image: string;
    title: string;
    description: string;
  }

  export let title: string = 'How Shell Casting Works';
  export let videoPlaceholderImage: string = '/closeup.jpg';
  export let infoCards: InfoCard[] = [];
  export let onPlayClick: () => void = () => {};

  let isPlaying = false;

  function handlePlayClick() {
    isPlaying = !isPlaying;
    onPlayClick();
  }
</script>

<section class="how-it-works">
  <h2 class="section-title">{title}</h2>
  <div class="video-container">
    <div class="video-placeholder" style="background-image: url('{videoPlaceholderImage}');">
      <button class="play-button" on:click={handlePlayClick} aria-label="Play video">
        <svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.5036 0.0595703C19.6513 0.0595703 0.3125 19.3984 0.3125 43.2506C0.3125 67.1029 19.6513 86.4417 43.5036 86.4417C67.3558 86.4417 86.6946 67.1029 86.6946 43.2506C86.6946 19.3984 67.3558 0.0595703 43.5036 0.0595703ZM64.1993 44.8127L31.806 63.5108C31.5288 63.6728 31.2157 63.7529 30.9062 63.7529C30.5966 63.7529 30.2835 63.6728 30.0064 63.5108C29.4485 63.1914 29.1065 62.5966 29.1065 61.9533V24.5453C29.1065 23.901 29.4485 23.3072 30.0064 22.9868C30.5606 22.6629 31.2517 22.6629 31.806 22.9868L64.1993 41.6814C64.7572 42.0089 65.0991 42.6028 65.0991 43.247C65.0991 43.8913 64.7572 44.4888 64.1993 44.8127Z" fill="#F3F3F3"/>
          <path d="M32.7031 58.8356L59.6975 43.2508L32.7031 27.666V58.8356Z" fill="#F3F3F3"/>
        </svg>
      </button>
    </div>
  </div>
  <div class="info-cards-grid">
    {#each infoCards as card (card.id)}
      <div class="info-card">
        <h3>{@html card.image}</h3>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  .how-it-works {
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: white;
    text-align: center;
    margin-bottom: 3rem;
    letter-spacing: 1px;
  }

  .video-container {
    margin: 3rem 0;
    display: flex;
    justify-content: center;
  }

  .video-placeholder {
    width: 100%;
    max-width: 600px;
    aspect-ratio: 16 / 9;
    background: linear-gradient(135deg, #1e2846cc, rgba(40, 50, 90, 0.8));
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .video-placeholder::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/placeholder.svg?height=400&width=600') center/cover;
    opacity: 0.3;
  }

  .play-button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    z-index: 2;
    position: relative;
  }

  .play-button:hover {
    transform: scale(1.1);
  }

  .info-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .info-card {
    background: linear-gradient(135deg, #FAEECE 0%, #e8dcc8 100%);
    color: #2a2a2a;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    transition: all 0.3s ease;
  }

  .info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .info-card h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    color: #1a1a1a;
  }

  .info-card p {
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
    color: #4a4a4a;
  }

  @media (max-width: 768px) {
    .section-title {
      font-size: 1.5rem;
    }

    .info-cards-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

