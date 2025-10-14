<script lang="ts">
  // Reusable "How It Works" component with video and steps
  
  // Type definition for step data
  export type Step = {
    title: string;
    description: string;
    icon: string;
  };

  // Props
  export let title: string = "How It Works";
  export let videoUrl: string = '';
  export let posterUrl: string = '';
  export let placeholderIcon: string = '🎬';
  export let placeholderText: string = 'Video Demo';
  export let placeholderSubtext: string = 'Video coming soon';
  export let showVideo: boolean = true;
  export let steps: Step[] = [];

  // Default steps if none provided
  const defaultSteps: Step[] = [
    {
      title: "Step 1",
      description: "First step description goes here.",
      icon: "1️⃣"
    },
    {
      title: "Step 2",
      description: "Second step description goes here.",
      icon: "2️⃣"
    },
    {
      title: "Step 3",
      description: "Third step description goes here.",
      icon: "3️⃣"
    }
  ];

  // Use provided steps or default
  $: displaySteps = steps.length > 0 ? steps : defaultSteps;
</script>

<section class="how-it-works-video">
  <h2 class="section-title">{title}</h2>
  
  {#if showVideo}
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
            <span style="font-size: 64px;">{placeholderIcon}</span>
            <p>{placeholderText}</p>
            <p style="font-size: 14px; opacity: 0.7;">{placeholderSubtext}</p>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <div class="steps-grid" style="grid-template-columns: repeat({displaySteps.length > 3 ? 'auto-fit' : displaySteps.length}, minmax(200px, 1fr));">
    {#each displaySteps as step}
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

