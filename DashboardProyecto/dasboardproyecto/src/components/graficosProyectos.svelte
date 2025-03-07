<script>
    import CuentaProyectos from './cuentaProyectos.svelte';
  import GraficoGenero from './graficoGenero.svelte';
  import GraficosFacturas from './graficosFacturas.svelte';
    import TecnologiasGrafico from './TecnologiasGrafico.svelte';
    import GraficoFechas from './graficoFechas.svelte';
</script>
    
<div class="parent">
    <div class="div1"><CuentaProyectos /></div>
    <div class="div2"><GraficosFacturas/></div>
    <div class="div3"><GraficoGenero/></div>
    <div class="div4"><TecnologiasGrafico/></div>
    <div class="div5"><GraficoFechas/></div>
</div>

<style>
  .parent {
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: repeat(18, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 100vw; /* Solo ocupa el ancho completo, sin forzar altura */
  }

  .div1 {
    grid-area: 3 / 2 / 6 / 5;
    border: 2px solid #ddd; /* Color de borde más suave */
    border-radius: 10px; /* Bordes redondeados */
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1); /* Sombra ligera */
    padding: 10px; /* Espacio interno */
    background: rgba(240, 240, 240, 0.5); /* Gris claro con transparencia */
  }

  .div2 {
    grid-area: 2 / 6 / 7 / 15;
    border: 2px solid #ddd; /* Color de borde más suave */
    border-radius: 10px; /* Bordes redondeados */
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1); /* Sombra ligera */
    padding: 10px; /* Espacio interno */
    background: rgba(240, 240, 240, 0.5); /* Gris claro con transparencia */
  }

  .div3 {
    grid-area: 2 / 16 / 11 / 20;
    background-color: #32cd32; /* Verde Lima */
  }

  .div4 {
    grid-area: 9 / 2 / 16 / 14;
    border: 2px solid #ddd; /* Color de borde más suave */
    border-radius: 10px; /* Bordes redondeados */
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1); /* Sombra ligera */
    padding: 10px; /* Espacio interno */
    background: rgba(240, 240, 240, 0.5); /* Gris claro con transparencia */
  }

  .div5 {
    grid-area: 9 / 12 / 17 / 20; /* Ajusta el tamaño según necesidad */
    background-color: #9370db; /* Lila */
  }

  /* Asegura que las divisiones tengan un tamaño mínimo */
  .div1, .div2, .div3, .div4, .div5 {
    min-width: 50px;
    min-height: 50px;
  }

  
</style>
