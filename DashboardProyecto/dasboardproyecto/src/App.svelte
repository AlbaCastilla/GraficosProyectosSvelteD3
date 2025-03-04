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
  <div class="switch-container">
    <button on:click={() => selectedComponent.set('facturas')}>Gráficos Facturas</button>
    <button on:click={() => selectedComponent.set('proyectos')}>Gráficos Proyectos</button>
  </div>

  {#if $selectedComponent === 'facturas'}
  {:else}
    <GraficosProyectos />
  {/if}

  
</main>

<style>
  .switch-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .switch-container button {
    margin: 5px;
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }

  .switch-container button:hover {
    background-color: #0056b3;
  }
</style>