<script>
    import { onMount } from 'svelte';
    import { contarFactourasReCount, fetchContarFacturasReCount } from '../stores';  // Importa el store y la función
  
    // Ejecutar fetchProyectosCount cuando el componente se monta
    onMount(() => {
        fetchContarFacturasReCount(); // Obtener el conteo de proyectos
    });
  </script>
  
  <link rel="stylesheet" href="/css/cuentaProyecto.css">

  <div class="proyectos">
    <h2>Cantidad de Facturas Recibidas</h2>
    <!-- Muestra el número de proyectos del store -->
    <p>{ $contarFactourasReCount }</p>
  </div>
  
  