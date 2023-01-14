
d3.json(
    "https://raw.githubusercontent.com/OCNVN/examen_herramientas_visualizacion/main/data.json"
  ).then((d) => {
    // Ordenar datos por rankings
    const data = d.sort((a, b) => a.ranking - b.ranking);

    const width = 900;
    const height = 400;

    var svg = d3
        .select("#examen")
        .append("svg")
        .attr("width", width + 100)
        .attr("height", height + 100)
        .append("g")
        .attr("transform", "translate(" + 50 + "," + 50 + ")");;

    // Crear escalador del eje X
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.ranking)])
        .range([0, width]);

    // Crear escalador del eje Y
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.nota)])
        .range([height, 0]);

    // Crear escalador para radio
    const radioScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.nota)])
        .range([3, 20]);

    // Crear escalador de color rojo
    const rojoColorScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.nota)])
        .range([255, 0])

    // Crear escalador de color verde
    const verdeColorScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.nota)])
        .range([0, 255])

    // Crear eje X
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));
    
    // Crear eje Y
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale));

    
    // Crear circulos
    svg.selectAll(".punto")
        .data(data)
        .enter().append("circle") 
        .attr("cx", function(d, i) { return xScale(d.ranking) })
        .attr("cy", function(d) { return yScale(d.nota) })
        .attr("r", (d) => radioScale(d.nota))
        .style("fill", (d) => `rgb(${rojoColorScale(d.nota)}, ${verdeColorScale(d.nota)}, 0)`)
});