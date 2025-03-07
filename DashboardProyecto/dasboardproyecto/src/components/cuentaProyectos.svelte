<script>
    import { onMount } from 'svelte';
    import { proyectosCount, fetchProyectosCount } from '../stores';  // Importa el store y la función
  
    // Ejecutar fetchProyectosCount cuando el componente se monta
    onMount(() => {
      fetchProyectosCount(); // Obtener el conteo de proyectos
    });
  </script>
  
  <link rel="stylesheet" href="/css/cuentaProyecto.css">

  <div class="proyectos">
    <h2>Cantidad de proyectos</h2>
    <!-- Muestra el número de proyectos del store -->
    <p>{ $proyectosCount }</p>
  </div>
  
  