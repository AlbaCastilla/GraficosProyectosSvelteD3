<script>
  import CuentaProyectos from './cuentaProyectos.svelte';
  import GraficosFacturas from './graficosFacturas.svelte';
  import TecnologiasGrafico from './TecnologiasGrafico.svelte';
  import GraficoFechas from './graficoFechas.svelte';
  import CuentaFacturas from './cuentaFacturas.svelte'
  import CuentaFacturasRe from './cuentaFacturasRe.svelte'
  import CuentaUsuarios from './cuentaUsuarios.svelte'
</script>
  
<div class="parent">
  <div class="div1"><CuentaFacturasRe /></div>
  <div class="div2"><GraficosFacturas/></div>
  <div class="div3"><CuentaFacturas/></div>
  <div class="div4"><CuentaUsuarios/></div>
  <div class="div5"><TecnologiasGrafico/></div>
  <div class="div6"><CuentaProyectos/></div>
  <div class="div7"><GraficoFechas/></div>
</div>

<style>
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Tres columnas */
  grid-auto-rows: minmax(auto, max-content); /* Ajustar automáticamente el tamaño de las filas */
  grid-gap: 10px;
  width: 100vw;
  padding: 10px;
}

.div1 {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background: rgba(240, 240, 240, 0.5);
  overflow: auto; /* Para evitar que el contenido se desborde */
  max-width: 100%; /* Que no se salga del grid */
  max-height: 100%;
}

.div2 {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background: rgba(240, 240, 240, 0.5);
  overflow: auto; /* Para evitar que el contenido se desborde */
  max-width: 100%; /* Que no se salga del grid */
  max-height: 100%;
}

.div3 {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background: rgba(240, 240, 240, 0.5);
  overflow: auto; /* Para evitar que el contenido se desborde */
  max-width: 100%; /* Que no se salga del grid */
  max-height: 100%;
}

.div4 {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background: rgba(240, 240, 240, 0.5);
  overflow: auto; /* Para evitar que el contenido se desborde */
  max-width: 100%; /* Que no se salga del grid */
  max-height: 100%;
}

.div1 {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background: rgba(240, 240, 240, 0.5);
  overflow: auto; /* Para evitar que el contenido se desborde */
  max-width: 100%; /* Que no se salga del grid */
  max-height: 100%;
}

.div6 {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background: rgba(240, 240, 240, 0.5);
  overflow: auto; /* Para evitar que el contenido se desborde */
  max-width: 100%; /* Que no se salga del grid */
  max-height: 100%;
}


.div7 {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background: rgba(240, 240, 240, 0.5);
  overflow: auto; /* Para evitar que el contenido se desborde */
  max-width: 100%; /* Que no se salga del grid */
  max-height: 100%;
}

.div5 {
  background: rgba(240, 240, 240, 0.5);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid #ddd;
  border-radius: 10px;
}


.div7 {
  grid-column: span 3;
}

</style>
