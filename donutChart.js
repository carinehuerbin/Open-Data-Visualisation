function drawDonutChart (gklasse) { // gklasse ist der Parameter, der an die Funktion übergeben wird => Verknüpfung Datensatz

    var data = [parseInt(gklasse[0].Einfamhaus), parseInt(gklasse[0].Mehrfamhaus), parseInt(gklasse[0].GebOhneNutzung), parseInt(gklasse[0].Uebrige)] 
    // parseInt verwandelt string (Buchstaben) in Zahlenwerte. [0] wählt das erste Element (da Programme mit 0 zu zählen beginnen)
    // Variable data wird innerhalb der Funktion, also lokal definiert und überschreibt die Variable data im App Skript nicht
    
        // load data and variables for donut Chart
        // margin
        var margin = {top: 20, right: 20, bottom: 20, left: 20},
            width = 300 - margin.right - margin.left,
            height = 280 - margin.top - margin.bottom,
            radius = (width-50)/2;

        // color range
        var color = d3.scaleOrdinal()
            .range(["darkorange", "gold", "darkslateblue", "royalblue"]); // hier Farben wählen für den Donut Chart

        // Farben und Namen definieren für den Donut Chart
    var colorNames = [
        {color: "darkorange", name: "Einfam.häuser"},
        {color: "gold", name: "Mehrfam.häuser"},
        {color: "darkslateblue", name: "ohne Wohnnutzung"},
        {color: "royalblue", name: "übrige"},
    ];

        // donut chart arc
        var arc2 = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 40);


        // generate pie chart and donut chart
        var pie = d3.pie()
            .sort(null)
            .value(function(d) { return d; });
        
        var donutChart = pie(data);
        
        var svgDonutChart = d3.select("#tooltip")  
        // hier wird der gezeichnete Donut Chart an den Tooltip angehängt mithilfe eines svg
            .append("svg")
            .attr("width", width)
            .attr("height", height);
        
        svgDonutChart
            .append("g")
            .attr("transform", "translate(130,100)") 
        // transform und translate versetzt den Donut Chart vom Mauszeiger aus => so eingestellt, dass die Grafik direkt im Tooltip sichtbar ist
            .selectAll("path")
            .data(donutChart) // Variable Donut Chart auswählen, da dort die Daten verknüpft sind
            .enter()
            .append("path")
            .attr("d", arc2)
            .style("fill", (d,i) => color (i)) // d = data, i = index (Nummerierung der Elemente)
            .style("stroke", "black")
            .style("stroke-width", "2px");
    
      
    // hier folgt der Code für die Legende des Donut Charts
    var legendRectSize = 10;
    
    var legendSpacing = 5;

    var legend = d3.select("#tooltip")
    .select("svg")
    .append("g")
    .attr("transform", "translate("+margin.left+", "+radius*2+")")
    .selectAll("g")
    .data(colorNames)
    .enter()
    .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        var height = legendRectSize;
        var x = (i%2==1)? 130 : 0;        // Modulo: Division mit Rest
        var y = i > 1? height + 5 : 0;  // Kurzform (einzeilig) einer if/else Bedingung
        return 'translate(' + x + ',' + y + ')';
    })
    
    
legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', function(d) {return color(d.color)})
    .style('stroke', function(d) {return color(d.color)})

legend.append('text')
    .style("fill", "white")
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize)
    .text(function(d) { return d.name; })
    
    
    }