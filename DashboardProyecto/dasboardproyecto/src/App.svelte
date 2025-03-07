<script>
  import svelteLogo from './assets/svelte.svg';
  import viteLogo from '/vite.svg';
  import Counter from './lib/Counter.svelte';
  import GraficosFacturas from './components/graficosFacturas.svelte';
  import GraficosProyectos from './components/graficosProyectos.svelte';
  import { writable } from 'svelte/store';

  let selectedComponent = writable('facturas');
</script>

<main>

    <GraficosProyectos />

  
</main>
