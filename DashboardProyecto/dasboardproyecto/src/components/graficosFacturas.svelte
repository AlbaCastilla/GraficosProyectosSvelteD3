<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { facturasDocs, fetchFacturasCount } from "../stores";

  let facturasData = [];
  let selectedIva = null;

  onMount(async () => {
    await fetchFacturasCount();

    facturasDocs.subscribe((data) => {
      facturasData = data;
      buildChart();
    });
  });

  // Colores fijos para cada porcentaje de IVA
  const colorMap = {
    4: "#5A9BFF",
    10: "#6BCF89",
    21: "#FFA07A"
  };

  function getColor(iva) {
    return colorMap[iva] || "red"; // Si no está en el mapeo, usa rojo por defecto
  }

  function groupByIva(data) {
    const grouped = {};
    data.forEach(({ iva }) => {
      grouped[iva] = (grouped[iva] || 0) + 1;
    });
    return Object.entries(grouped).map(([iva, count]) => ({
      iva: +iva, // Convertimos la clave a número
      count
    }));
  }

  function buildChart() {
    d3.select("#iva-chart").selectAll("*").remove();

    const groupedData = groupByIva(
      selectedIva ? facturasData.filter(d => d.iva === selectedIva) : facturasData
    );

    const totalProyectos = groupedData.reduce((sum, d) => sum + d.count, 0);

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#iva-chart").attr("viewBox", `0 0 ${width} ${height}`);

    const color = d3.scaleOrdinal().domain(groupedData.map(d => d.iva)).range(
      groupedData.map(d => getColor(d.iva))
    );

    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);

    g.selectAll("path")
      .data(pie(groupedData))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.iva))
      .append("title")
      .text(d => `IVA ${d.data.iva}% - ${d.data.count} proyectos`);

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("class", "cantidad-proyectos")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .text(totalProyectos);
  }

  function updateChart(iva) {
    selectedIva = iva;
    console.log(iva)
    buildChart();
  }
</script>

<link rel="stylesheet" href="/css/graficosFacturas.css">
<!-- <div style="text-align: center; font-size: 16px; font-weight: bold; margin-bottom: 10px;">
  Numero de facturas con iva específico
</div>

<div class="filtros">
  <label>
    <input type="radio" name="filter2" on:change={() => updateChart(null)} checked>
    Mostrar Todo
  </label>
  {#each [...new Set(facturasData.map(d => d.iva))] as iva}
    <label>
      <input type="radio" name="filter2" on:change={() => updateChart(iva)}>
      {iva}%
    </label>
  {/each}
</div>

<svg id="iva-chart"></svg>
 -->
 <link rel="stylesheet" href="/css/graficosFacturas.css">

 <div class="contenedor-grafico">
   <div class="titulo-grafico">
     Número de facturas con IVA específico
   </div>
 
   <div class="contenido">
     <div class="filtros">
       <label>
         <input type="radio" name="filter2" on:change={() => updateChart(null)} checked>
         Mostrar Todo
       </label>
       {#each [...new Set(facturasData.map(d => d.iva))] as iva}
         <label>
           <input type="radio" name="filter2" on:change={() => updateChart(iva)}>
           {iva}%
         </label>
       {/each}
     </div>
 
     <svg id="iva-chart"></svg>
   </div>
 </div>
 
 