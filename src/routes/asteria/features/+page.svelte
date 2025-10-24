<script lang="ts">
  const stories = [
    { title: 'Spotlight of the Week', videoId: 'dQw4w9WgXcQ', author: 'Sarah M.', story: 'My mystical awakening through tarot' },
  ];
</script>

<div class="features-page">
  <h1>User Stories</h1>
  <p class="subtitle">Real experiences from our community</p>
  
  <div class="stories-grid">
    {#each stories as story}
      <div class="story-card">
        <div class="video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/{story.videoId}" 
            title={story.title}
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
        <div class="story-content">
          <h2>{story.title}</h2>
          <p class="author">by {story.author}</p>
          <p>{story.story}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .features-page {
    min-height: 100vh;
    padding: 120px 24px 80px;
    max-width: 1200px;
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

  .stories-grid {
    display: grid;
    gap: 32px;
  }

  .story-card {
    background: var(--panel, rgba(20, 17, 39, 0.98));
    border: 1px solid #ffffff1f;
    border-radius: 16px;
    overflow: hidden;
  }

  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
  }

  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .story-content {
    padding: 24px;
  }

  h2 {
    color: var(--ink, #EDEBFF);
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  .author {
    color: var(--clarity, #30D5C8);
    font-size: 14px;
    margin-bottom: 16px;
  }

  p {
    color: var(--ink, #EDEBFF);
    opacity: 0.8;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
</style>
