<!-- <script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()} -->

<script>
  import { onMount } from 'svelte';
  import '../../app.css';

  onMount(() => {
    document.body.setAttribute('data-brand', 'asteria');
    return () => {
      document.body.removeAttribute('data-brand');
    };
  });
</script>

<slot />