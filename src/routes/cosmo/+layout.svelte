<script>
  import { onMount } from 'svelte';
  import '../../app.css';

  onMount(() => {
    document.body.setAttribute('data-brand', 'cosmo');
    return () => {
      document.body.removeAttribute('data-brand');
    };
  });
</script>

<slot />