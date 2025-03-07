<script>
    import { onMount } from 'svelte';
    import { contarUsuariosCount, fetchContarUsuariosCount } from '../stores';  // Importa el store y la función
  
    // Ejecutar fetchProyectosCount cuando el componente se monta
    onMount(() => {
        fetchContarUsuariosCount(); // Obtener el conteo de proyectos
    });
  </script>
  
  <link rel="stylesheet" href="/css/cuentaProyecto.css">

  <div class="proyectos">
    <h2>Cantidad de Usuarios Registrados</h2>
    <!-- Muestra el número de proyectos del store -->
    <p>{ $contarUsuariosCount }</p>
  </div>
  
  