<script>
    import { onMount } from 'svelte';
    import { contarFactourasCount, fetchContarFacturasCount } from '../stores';  // Importa el store y la función
  
    // Ejecutar fetchProyectosCount cuando el componente se monta
    onMount(() => {
        fetchContarFacturasCount(); // Obtener el conteo de proyectos
    });
  </script>
  
  <link rel="stylesheet" href="/css/cuentaProyecto.css">

  <div class="proyectos">
    <h2>Cantidad de Facturas Emitidas</h2>
    <!-- Muestra el número de proyectos del store -->
    <p>{ $contarFactourasCount }</p>
  </div>
  
  