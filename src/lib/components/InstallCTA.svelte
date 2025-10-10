<script lang="ts">
  import { onMount } from 'svelte';
  
  type Platform = 'ios' | 'android' | 'web';
  let platform: Platform = 'web';
  let canInstall = false;

  onMount(() => {
    // Detect platform
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('iphone') || ua.includes('ipad')) {
      platform = 'ios';
    } else if (ua.includes('android')) {
      platform = 'android';
    }

    // Check if PWA is installable
    if ('BeforeInstallPromptEvent' in window) {
      canInstall = true;
    }
  });

  const installInstructions: Record<Platform, string> = {
    ios: 'Tap Share → Add to Home Screen',
    android: 'Tap Menu → Install App',
    web: 'Click Install button in your browser'
  };
</script>

<section class="section install-section">
  <div class="install-card card">
    <div class="install-content">
      <h2 class="install-title">Install Asteria</h2>
      <p class="install-description">
        Get instant access from your home screen. Works offline. No app store required.
      </p>
      <p class="install-instructions">
        {installInstructions[platform]}
      </p>
    </div>
    <div class="install-actions">
      {#if platform === 'ios'}
        <div class="platform-icon">📱</div>
      {:else if platform === 'android'}
        <div class="platform-icon">🤖</div>
      {:else}
        <button class="btn primary">Install Now</button>
      {/if}
    </div>
  </div>
</section>

<style>
  .install-section {
    padding: 64px 24px;
  }
  .install-card {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
    background: linear-gradient(135deg, var(--panel), var(--bg));
    border: 1px solid var(--destiny);
  }
  .install-content {
    flex: 1;
  }
  .install-title {
    font-size: 32px;
    line-height: 40px;
    margin: 0 0 12px;
  }
  .install-description {
    font-size: 16px;
    color: var(--muted);
    margin: 0 0 16px;
  }
  .install-instructions {
    font-size: 14px;
    color: var(--clarity);
    font-weight: 600;
    margin: 0;
  }
  .install-actions {
    display: flex;
    align-items: center;
  }
  .platform-icon {
    font-size: 64px;
  }
  .btn.primary {
    background: var(--destiny);
    color: #fff;
    font-weight: 600;
    padding: 16px 32px;
    font-size: 16px;
  }
  @media (max-width: 768px) {
    .install-card {
      flex-direction: column;
      text-align: center;
      padding: 32px 24px;
    }
  }
</style>

