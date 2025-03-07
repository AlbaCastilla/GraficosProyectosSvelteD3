<!--  <script>
    import { onMount } from 'svelte';
    import { tecnologiasById, fetchTecnologiasCount } from '../stores';
    import * as d3 from 'd3';
  
    let tecnologiasData = [];
  
    // Cargar los datos de tecnologías al montar el componente
    onMount(async () => {
      await fetchTecnologiasCount();
      
      // Suscribirse al store de tecnologías para actualizar el gráfico
      tecnologiasById.subscribe((data) => {
        tecnologiasData = data;
        createChart();
      });
    });
  
    function createChart() {
      // Limpiar el gráfico existente
      d3.select('.chart-container svg').remove();
  
      const svg = d3.select('.chart-container')
                    .append('svg')
                    .attr('width', 600)
                    .attr('height', 400);
  
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = svg.attr('width') - margin.left - margin.right;
      const height = svg.attr('height') - margin.top - margin.bottom;
  
      const g = svg.append('g')
                   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  
      // Escalas
      const x = d3.scaleBand()
                  .domain(tecnologiasData.map(d => d.id))
                  .range([0, width])
                  .padding(0.1);
  
      const y = d3.scaleLinear()
                  .domain([0, d3.max(tecnologiasData, d => d3.max(Object.values(d.conteoTecnologias)))])
                  .nice()
                  .range([height, 0]);
  
      // Ejes
      g.append('g')
       .selectAll('.bar')
       .data(tecnologiasData)
       .enter()
       .append('g')
       .attr('transform', d => 'translate(' + x(d.id) + ',0)')
       .selectAll('rect')
       .data(d => Object.entries(d.conteoTecnologias))
       .enter()
       .append('rect')
       .attr('x', (d, i) => i * 50) // Espacio entre barras
       .attr('y', d => y(d[1]))
       .attr('width', 40)
       .attr('height', d => height - y(d[1]))
       .attr('fill', 'steelblue');
  
      // Ejes
      g.append('g')
       .attr('class', 'x-axis')
       .attr('transform', 'translate(0,' + height + ')')
       .call(d3.axisBottom(x));
  
      g.append('g')
       .attr('class', 'y-axis')
       .call(d3.axisLeft(y));
  
      // Añadir etiquetas para cada barra
      g.selectAll('.text')
       .data(tecnologiasData)
       .enter()
       .append('g')
       .attr('transform', d => 'translate(' + x(d.id) + ',0)')
       .selectAll('text')
       .data(d => Object.entries(d.conteoTecnologias))
       .enter()
       .append('text')
       .attr('x', (d, i) => i * 50 + 15) // Centrar texto
       .attr('y', d => y(d[1]) - 5)
       .text(d => d[1])
       .attr('fill', 'white')
       .attr('font-size', '12px')
       .attr('text-anchor', 'middle');
    }
  </script>
  
  <div class="chart-container"></div>
  
  <style>
    .chart-container {
      width: 100%;
      height: 400px;
    }
  </style>
   --

   <script>
    import { onMount } from 'svelte';
    import { tecnologiasById, fetchTecnologiasCount } from '../stores';
    import * as d3 from 'd3';
  
    let tecnologiasData = [];
    let selectedSection = 'all';
    let filteredData = [];
  
    // Cargar los datos de tecnologías al montar el componente
    onMount(async () => {
      await fetchTecnologiasCount();
      tecnologiasById.subscribe((data) => {
        tecnologiasData = data;
        filterData();
        createChart();
      });
    });
  
    function filterData() {
      if (selectedSection === 'all') {
        filteredData = tecnologiasData;
      } else {
        filteredData = tecnologiasData.filter(d => d.id === selectedSection);
      }
    }
  
    function createChart() {
      d3.select('.chart-container svg').remove();
      const svg = d3.select('.chart-container')
                    .append('svg')
                    .attr('width', 600)
                    .attr('height', 400);
  
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = svg.attr('width') - margin.left - margin.right;
      const height = svg.attr('height') - margin.top - margin.bottom;
  
      const g = svg.append('g')
                   .attr('transform', `translate(${margin.left},${margin.top})`);
  
      const x = d3.scaleBand()
                  .domain(filteredData.flatMap(d => Object.keys(d.conteoTecnologias)))
                  .range([0, width])
                  .padding(0.1);
  
      const y = d3.scaleLinear()
                  .domain([0, d3.max(filteredData, d => d3.max(Object.values(d.conteoTecnologias)))]).nice()
                  .range([height, 0]);
  
      g.append('g')
       .selectAll('.bar')
       .data(filteredData.flatMap(d => Object.entries(d.conteoTecnologias)))
       .enter()
       .append('rect')
       .attr('x', d => x(d[0]))
       .attr('y', d => y(d[1]))
       .attr('width', x.bandwidth())
       .attr('height', d => height - y(d[1]))
       .attr('fill', 'steelblue');
  
      g.append('g')
       .attr('transform', `translate(0,${height})`)
       .call(d3.axisBottom(x));
  
      g.append('g')
       .call(d3.axisLeft(y));
    }
  </script>
  
  <div>
    <label><input type="radio" bind:group={selectedSection} value="all" on:change={() => { filterData(); createChart(); }}> Todas</label>
    <label><input type="radio" bind:group={selectedSection} value="0" on:change={() => { filterData(); createChart(); }}> Sección 0</label>
    <label><input type="radio" bind:group={selectedSection} value="1" on:change={() => { filterData(); createChart(); }}> Sección 1</label>
    <label><input type="radio" bind:group={selectedSection} value="2" on:change={() => { filterData(); createChart(); }}> Sección 2</label>
  </div>
  
  <div class="chart-container"></div>
  
  <style>
    .chart-container {
      width: 100%;
      height: 400px;
    }
  </style>
   -->

   <script>
    import { onMount } from 'svelte';
    import { tecnologiasById, fetchTecnologiasCount } from '../stores';
    import * as d3 from 'd3';

    let tecnologiasData = [];
    let selectedId = null; // Estado para filtrar por ID

    onMount(async () => {
        await fetchTecnologiasCount();
        
        // Suscribirse al store de tecnologías para actualizar el gráfico
        tecnologiasById.subscribe((data) => {
            tecnologiasData = data;
            createChart();
        });
    });

    function createChart() {
        // Limpiar el gráfico existente
        d3.select('.chart-container svg').remove();

        const filteredData = selectedId 
            ? tecnologiasData.filter(d => d.id === selectedId) 
            : tecnologiasData;

        const svg = d3.select('.chart-container')
                    .append('svg')
                    .attr('width', 600)
                    .attr('height', 400);

        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const width = svg.attr('width') - margin.left - margin.right;
        const height = svg.attr('height') - margin.top - margin.bottom;

        const g = svg.append('g')
                     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Escalas
        const tecnologias = Array.from(new Set(filteredData.flatMap(d => Object.keys(d.conteoTecnologias))));
        const x = d3.scaleBand()
                    .domain(tecnologias)
                    .range([0, width])
                    .padding(0.1);

        const y = d3.scaleLinear()
                    .domain([0, d3.max(filteredData, d => d3.max(Object.values(d.conteoTecnologias)))])
                    .nice()
                    .range([height, 0]);

        // Ejes
        g.append('g')
         .attr('transform', `translate(0,${height})`)
         .call(d3.axisBottom(x))
         .selectAll('text')
         .attr('transform', 'rotate(-45)')
         .style('text-anchor', 'end');

        g.append('g')
         .call(d3.axisLeft(y));

        // Barras
        g.selectAll('.bar-group')
         .data(filteredData)
         .enter()
         .append('g')
         .selectAll('rect')
         .data(d => Object.entries(d.conteoTecnologias))
         .enter()
         .append('rect')
         .attr('x', d => x(d[0]))
         .attr('y', d => y(d[1]))
         .attr('width', x.bandwidth())
         .attr('height', d => height - y(d[1]))
         .attr('fill', '#5A9BFF');

        // Etiquetas
        g.selectAll('.bar-group')
         .data(filteredData)
         .enter()
         .append('g')
         .selectAll('text')
         .data(d => Object.entries(d.conteoTecnologias))
         .enter()
         .append('text')
         .attr('x', d => x(d[0]) + x.bandwidth() / 2)
         .attr('y', d => y(d[1]) - 5)
         .text(d => d[1])
         .attr('text-anchor', 'middle')
         .attr('fill', 'white');
    }

    function updateChart(id) {
        selectedId = id;
        createChart();
    }
</script>

<link rel="stylesheet" href="/css/tecnologiasGrafico.css">

<!-- Radio buttons para filtrar por ID -->
<div class="filtros-tecnologias">
    <label>
        <input type="radio" name="filter" on:change={() => updateChart(null)} checked>
        Mostrar Todo
    </label>
    {#each tecnologiasData as item}
        <label>
            <input type="radio" name="filter" on:change={() => updateChart(item.id)}>
            {item.id}
        </label>
    {/each}
</div>

<div class="chart-container"></div>
