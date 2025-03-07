<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { facturasDocs, fetchFacturasCount } from "../stores";

  /*let data_synthetic = [
    {
      valor: "546",
      emailUsuario: "fer@gmail.com",
      nif: "12345678Z",
      nifUsuario: "",
      companiaNombreUsuario: "",
      timestamp: {
        seconds: 1741008347,
        nanoseconds: 873000000,
      },
      iva: 10,
      total: 600.6,
      direccionUsuario: "",
      numeroFactura: 5,
      direccion: "prueba26",
      companiaNombre: "prueba26",
    },
    {
      nif: "12345678Z",
      direccionUsuario: "",
      iva: 21,
      companiaNombre: "prueba41",
      numeroFactura: 6,
      nifUsuario: "",
      timestamp: {
        seconds: 1741014678,
        nanoseconds: 615000000,
      },
      direccion: "prueba41",
      companiaNombreUsuario: "",
      emailUsuario: "fer@gmail.com",
      total: 920.81,
      valor: "761",
    },
    {
      nif: "12345678Z",
      valor: "123",
      companiaNombre: "salsa",
      companiaNombreUsuario: "adosad",
      total: 20,
      emailUsuario: "prueba",
      direccion: "prueba",
      numeroFactura: 1,
      displayNameUsuario: "prueba",
      nifUsuario: "12345678Z",
      phoneNumberUsuario: "213",
      direccionUsuario: "prueba",
      iva: 24,
    },
    {
      direccion: "prueba25",
      numeroFactura: 4,
      total: 681.23,
      emailUsuario: "fer@gmail.com",
      companiaNombre: "prueba25",
      direccionUsuario: "",
      nif: "12345678Z",
      timestamp: {
        seconds: 1741007849,
        nanoseconds: 909000000,
      },
      iva: 21,
      nifUsuario: "",
      companiaNombreUsuario: "",
      valor: "563",
    },
    {
      numeroFactura: 1,
      phoneNumberUsuario: "",
      nif: "12345678Z",
      iva: 10,
      emailUsuario: "fer@gmail.com",
      direccionUsuario: "",
      nifUsuario: "",
      timestamp: {
        seconds: 1741004788,
        nanoseconds: 356000000,
      },
      companiaNombre: "hola",
      valor: "323",
      companiaNombreUsuario: "",
      displayNameUsuario: "",
      total: 390.83,
      direccion: "hola",
    },
    {
      timestamp: {
        seconds: 1741081514,
        nanoseconds: 545000000,
      },
      emailUsuario: "",
      total: 355.68,
      valor: "342",
      numeroFactura: 7,
      nifUsuario: "",
      direccion: "Calle Gonzalo",
      nif: "12345678Z",
      direccionUsuario: "",
      companiaNombreUsuario: "",
      companiaNombre: "Gonzalo",
      iva: 4,
    },
    {
      numeroFactura: 3,
      iva: 5,
      total: 526.35,
      timestamp: {
        seconds: 1741007399,
        nanoseconds: 453000000,
      },
      displayNameUsuario: "",
      nif: "12345678Z",
      companiaNombreUsuario: "",
      emailUsuario: "fer@gmail.com",
      direccionUsuario: "",
      companiaNombre: "prueba24",
      phoneNumberUsuario: "",
      direccion: "prueba24",
      valor: "435",
      nifUsuario: "",
    },
  ];

  onMount(() => {
    buildChart(data_synthetic);
  }); */

  onMount(async () => {
    await fetchFacturasCount();

    // Suscribirse al store de tecnologías para actualizar el gráfico
    facturasDocs.subscribe((data) => {
        buildChart(data);
    });
    
});

function buildChart(data) {
      console.log("HOLA ", data)
    const svg = d3.select("#iva-chart");
    const height = 300;
    const width = 300;

    const barWidth = 10;

    const scaleY = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.iva)])
      .range([height, 0]);

    let offsetX = 0;

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", () => {
        const x = offsetX;
        offsetX += barWidth + 5;
        return x;
      })
      .attr("y", (d) => scaleY(d.iva))
      .attr("width", barWidth)
      .attr("height", (d) => height - scaleY(d.iva))
      .attr("fill", (d) => (d.iva > 21 ? "#00ff00" : "#ff0000"))
      .append("title")
      .text((d) => `${d.iva}%`);
  }
</script>

<div class="container">
  <h1>IVA</h1>
  <div class="chart-contenedor">
    <svg id="iva-chart"></svg>
    <h2>Proyectos</h2>
  </div>
</div>

<style>
  svg {
    height: 300px;
    width: 300px;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chart-contenedor {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
