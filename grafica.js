
d3.json(
    "https://raw.githubusercontent.com/OCNVN/examen_herramientas_visualizacion/main/data.json"
  ).then((d) => {
    // Ordenar datos por rankings
    const data = d.sort((a, b) => a.ranking - b.ranking);

    const width = 900;
    const height = 400;

    // Crear lienzo sobre el cual se dibujará la grafica
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

    // Crear escalador para radio en funcion de la nota
    const radioScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.nota)])
        .range([6, 20]);

    // Crear escalador de color rojo en funcion de la nota
    const rojoColorScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.nota)])
        .range([255, 0])

    // Crear escalador de color verde en funcion de la nota
    const verdeColorScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.nota)])
        .range([0, 255])

    // Crear eje X
    svg.append("g")
        .attr("class", "x axis")
        .transition() // Aplicar animacion a la eje
        .duration(1000)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        
    
    // Crear eje Y
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale))

    // Crear circulos
    svg.selectAll(".punto")
        .data(data)
        .enter().append("circle") 
        .attr("cx", function(d, i) { return xScale(d.ranking) })
        .attr("cy", function(d) { return yScale(d.nota) })
        .attr("r", (d) => radioScale(d.nota))
        .style("fill", (d) => `rgb(${rojoColorScale(d.nota)}, ${verdeColorScale(d.nota)}, 0)`)
        .on("mouseover", (d) => {
            // Mostrar tooltip al pasar el raton por encima
            tooltip.text(d.alumno + ", ranking = " + d.ranking);
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
            // Cambiar la posicion del tooltip cuando el raton se mueve encima del circulo
            return tooltip
              .style("top", d3.event.pageY - 10 + "px")
              .style("left", d3.event.pageX + 10 + "px");
        })
        .on("mouseout", () => tooltip.style("visibility", "hidden")); // Ocultar el tooltip al salir del circulo

    // Definir el elemento para el tooltip
    var tooltip = d3
        .select("#examen")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", 10)
        .style("visibility", "hidden")
        .text("Examen");
});