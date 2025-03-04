<script>
    import CuentaProyectos from './cuentaProyectos.svelte';
  import GraficoGenero from './graficoGenero.svelte';
  import GraficosFacturas from './graficosFacturas.svelte';
    import TecnologiasGrafico from './TecnologiasGrafico.svelte';
</script>
    
<div class="parent">
    <div class="div1"><CuentaProyectos /></div>
    <div class="div2"><GraficosFacturas/></div>
    <div class="div3"><GraficoGenero/></div>
    <div class="div4"><TecnologiasGrafico/></div>
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
    background-color: #ff6347; /* Rojo Tomate */
  }

  .div2 {
    grid-area: 2 / 6 / 7 / 15;
    background-color: #4682b4; /* Azul Acero */
  }

  .div3 {
    grid-area: 2 / 16 / 11 / 20;
    background-color: #32cd32; /* Verde Lima */
  }

  .div4 {
    grid-area: 9 / 2 / 17 / 11;
    background-color: #ffcc00; /* Amarillo */
  }

  /* Asegura que las divisiones tengan un tamaño mínimo */
  .div1, .div2, .div3, .div4 {
    min-width: 50px;
    min-height: 50px;
  }

  
</style>
