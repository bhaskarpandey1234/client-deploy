<!-- Server-side redirect handled in +page.server.ts -->
<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  // Fallback client-side redirect if server redirect didn't work
  onMount(() => {
    goto('/asteria');
  });
</script>

<div style="min-height: 100vh; display: grid; place-items: center;">
  <p>Redirecting...</p>
</div>