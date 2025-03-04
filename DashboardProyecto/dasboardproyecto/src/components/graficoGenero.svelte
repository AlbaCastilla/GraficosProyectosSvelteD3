<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { fetchGeneroCount, generoDocs } from "../stores";

  onMount(async () => {
    await fetchGeneroCount();

    // Suscribirse al store de tecnologías para actualizar el gráfico
    generoDocs.subscribe((data) => {
      buildChart(data);
    });
  });

  function buildChart(tecnologiasData) {
    const svg = d3.select("#pie-chart");
    const height = 300;
    const width = 300;
    const radius = Math.min(height, width) / 2;

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const color = d3.scaleOrdinal().range(["pink", "blue"]);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    const pie = d3.pie().value((d) => d.numero)
    const data_ready = pie(tecnologiasData)

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    g.selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (_, i) => color(i))
      .append("title")
      .text((d) => d.data.sexo);
  }
</script>

<svg id="pie-chart"></svg>

<style>
  svg {
    height: 300px;
    width: 300px;
  }
</style>
