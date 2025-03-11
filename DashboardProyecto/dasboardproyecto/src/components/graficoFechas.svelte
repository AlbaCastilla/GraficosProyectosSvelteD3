<!-- <script>
    import { onMount } from "svelte";
    import { select, scaleBand, scaleLinear, axisBottom, axisLeft } from "d3";
    import { usoFechas, fetchUsoFechas } from "../stores"; // Asegúrate de importar el store correcto
  
    let data = [];
  
    // Función para contar ocurrencias de cada fecha
    function contarFechas(fechas) {
      const conteo = {};
      fechas.forEach(fecha => {
        conteo[fecha] = (conteo[fecha] || 0) + 1;
      });
  
      return Object.entries(conteo).map(([fecha, count]) => ({ fecha, count }));
    }
  
    onMount(async () => {
      await fetchUsoFechas();
  
      usoFechas.subscribe(fechas => {
        data = contarFechas(fechas);
        drawChart();
      });
    });
  
    function drawChart() {
      const width = 600;
      const height = 400;
      const margin = { top: 20, right: 30, bottom: 50, left: 50 };
  
      // Limpiar SVG antes de volver a dibujar
      select("#chart").selectAll("*").remove();
  
      const svg = select("#chart")
        .attr("width", width)
        .attr("height", height);
  
      const xScale = scaleBand()
        .domain(data.map(d => d.fecha))
        .range([margin.left, width - margin.right])
        .padding(0.2);
  
      const yScale = scaleLinear()
        .domain([0, Math.max(...data.map(d => d.count))])
        .range([height - margin.bottom, margin.top]);
  
      const xAxis = axisBottom(xScale);
      const yAxis = axisLeft(yScale).ticks(5);
  
      svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
  
      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);
  
      svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.fecha))
        .attr("y", d => yScale(d.count))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - margin.bottom - yScale(d.count))
        .attr("fill", "steelblue");
    }
  </script>
  
  <svg id="chart"></svg>
    -->


    <script>
        import { onMount } from "svelte";
        import { select, scaleBand, scaleLinear, axisBottom, axisLeft, line } from "d3";
        import { usoFechas, fetchUsoFechas } from "../stores";
    
        let data = [];
    
        /*function contarFechas(fechas) {
            const conteo = {};
            fechas.forEach(fecha => {
                conteo[fecha] = (conteo[fecha] || 0) + 1;
            });
    
            return Object.entries(conteo).map(([fecha, count]) => ({ fecha, count }));
        }
    */
    function contarFechas(fechas) {
    const conteo = {};
    fechas.forEach(fecha => {
        conteo[fecha] = (conteo[fecha] || 0) + 1;
    });

    return Object.entries(conteo)
        .map(([fecha, count]) => ({ fecha, count }))
        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()); // Convertimos a timestamp
}


        onMount(async () => {
            await fetchUsoFechas();
    
            usoFechas.subscribe(fechas => {
                data = contarFechas(fechas);
                drawChart();
            });
        });
    
        function drawChart() {
            const width = 600;
            const height = 400;
            const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    
            // Limpiar SVG antes de dibujar
            select("#chart").selectAll("*").remove();
    
            const svg = select("#chart")
                .attr("width", width)
                .attr("height", height);
    
            const xScale = scaleBand()
                .domain(data.map(d => d.fecha))
                .range([margin.left, width - margin.right])
                .padding(0.2);
    
            const yScale = scaleLinear()
                .domain([0, Math.max(...data.map(d => d.count))])
                .range([height - margin.bottom, margin.top]);
    
            const xAxis = axisBottom(xScale);
            const yAxis = axisLeft(yScale).ticks(5);
    
            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(xAxis)
                .selectAll("text")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "end");
    
            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(yAxis);
    
            const lineGenerator = line()
                .x(d => xScale(d.fecha) + xScale.bandwidth() / 2)
                .y(d => yScale(d.count));
    
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", lineGenerator);
    
            // Añadir puntos (opcional)
            svg.selectAll(".point")
                .data(data)
                .enter().append("circle")
                .attr("class", "point")
                .attr("cx", d => xScale(d.fecha) + xScale.bandwidth() / 2)
                .attr("cy", d => yScale(d.count))
                .attr("r", 4)
                .attr("fill", "steelblue");
        }
    </script>
    <div class="grafico-fechas-estructura">
    <div class="titulo-fechas" style="text-align: center; font-size: 16px; font-weight: bold; margin-bottom: 10px;">
      Frecuencia de uso de la aplicación <br>
      por fecha
  </div>
    <svg id="chart"></svg></div>
    
<!--
   <script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let datos = [
      { fecha: new Date(2024, 0, 1), valor: 10 },
      { fecha: new Date(2024, 1, 1), valor: 30 },
      { fecha: new Date(2024, 2, 1), valor: 50 },
      { fecha: new Date(2024, 3, 1), valor: 40 },
      { fecha: new Date(2024, 4, 1), valor: 80 }
    ];
  
    onMount(() => {
      const width = 500, height = 300, margin = 50;
      
      const svg = d3.select("#grafico")
        .attr("width", width)
        .attr("height", height);
  
      const x = d3.scaleTime()
        .domain(d3.extent(datos, d => d.fecha))
        .range([margin, width - margin]);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(datos, d => d.valor)])
        .range([height - margin, margin]);
  
      const linea = d3.line()
        .x(d => x(d.fecha))
        .y(d => y(d.valor))
        .curve(d3.curveMonotoneX); // Hace la curva más suave
  
      svg.append("path")
        .datum(datos)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", linea);
  
      // Ejes
      svg.append("g")
        .attr("transform", `translate(0,${height - margin})`)
        .call(d3.axisBottom(x));
  
      svg.append("g")
        .attr("transform", `translate(${margin},0)`)
        .call(d3.axisLeft(y));
    });
  </script>
  
  <svg id="grafico"></svg>
  
  <style>
    svg {
      background-color: #f3f3f3;
      border-radius: 8px;
    }
  </style>
  -->