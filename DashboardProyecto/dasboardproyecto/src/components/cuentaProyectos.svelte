<script>
    import { onMount } from 'svelte';
    import { proyectosCount, fetchProyectosCount } from '../stores';  // Importa el store y la función
  
    // Ejecutar fetchProyectosCount cuando el componente se monta
    onMount(() => {
      fetchProyectosCount(); // Obtener el conteo de proyectos
    });
  </script>
  
  <div class="proyectos">
    <h2>Cantidad de proyectos</h2>
    <!-- Muestra el número de proyectos del store -->
    <p>{ $proyectosCount }</p>
  </div>
  
  <style>
    .proyectos {
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    
    h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }
    
    p {
      font-size: 32px;
      font-weight: bold;
    }
  </style>
  