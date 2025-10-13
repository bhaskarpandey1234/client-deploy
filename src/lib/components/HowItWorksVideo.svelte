<script lang="ts">
  // How It Works component with video for shell casting
  export let videoUrl = '';
  export let posterUrl = '';
  
  const steps = [
    {
      title: "Cast the Shells",
      description: "Tap or shake to cast the sacred shells. Each shell carries its own meaning and energy.",
      icon: "🐚"
    },
    {
      title: "Read the Pattern",
      description: "Our AI interprets the pattern using traditional divination wisdom combined with your question.",
      icon: "✨"
    },
    {
      title: "Receive Guidance",
      description: "Get specific, actionable insights with timing windows and clear next steps.",
      icon: "🔮"
    }
  ];
</script>

<section class="how-it-works-video">
  <h2 class="section-title">How Shell Casting Works</h2>
  
  <div class="video-container">
    {#if videoUrl}
      <video 
        controls 
        poster={posterUrl}
        class="demo-video"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser doesn't support video playback.
      </video>
    {:else}
      <div class="video-placeholder card">
        <div class="placeholder-content">
          <span style="font-size: 64px;">🎬</span>
          <p>Shell Casting Video Demo</p>
          <p style="font-size: 14px; opacity: 0.7;">Video coming soon</p>
        </div>
      </div>
    {/if}
  </div>

  <div class="steps-grid">
    {#each steps as step}
      <div class="step-card card">
        <div class="step-icon">{step.icon}</div>
        <h3 class="step-title">{step.title}</h3>
        <p class="step-description">{step.description}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  .how-it-works-video {
    padding: 64px 0;
    max-width: 1120px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    margin-bottom: 40px;
    color: var(--ink);
  }

  .video-container {
    margin-bottom: 48px;
    border-radius: var(--radius);
    overflow: hidden;
  }

  .demo-video {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    display: block;
    border-radius: var(--radius);
  }

  .video-placeholder {
    aspect-ratio: 16/9;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--panel);
  }

  .placeholder-content {
    text-align: center;
    color: var(--muted);
  }

  .placeholder-content p {
    margin: 8px 0;
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 48px;
  }

  .step-card {
    padding: 32px 24px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .step-icon {
    font-size: 48px;
    line-height: 1;
  }

  .step-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    color: var(--ink);
  }

  .step-description {
    font-size: 15px;
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 768px) {
    .steps-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

