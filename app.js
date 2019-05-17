
function drawMap() {
    
        var dataset;
    
        // define map size
        var width = 950,
            height = 600;

        var svg = d3.select("#home").append("svg")  // Karte wird hier verknüpft
            .attr("width", width)
            .attr("height", height); 


        //load data files
            d3.queue()
                .defer(d3.json, "ch_withoutmunic.json")
                .defer(d3.csv, "G_Klassen_ger.csv")
                .defer(d3.csv, "Solarenergiepotenziale_usedonly2.csv")
                .await(ready) 
    
    
        // die Funktion d3.queue lädt die Datensätze der Reihe nach in die unten angegebenen Variablen (error, data, GKlassen, Potenziale)

        function ready (error, data, GKlassen, Potenziale){

        if(error){console.log("Error: "+ error)};

        dataset = data;
        
        
        // define data variables
        var Gemeinden = topojson.feature(data, data.objects.municipalities).features;
        
        var Seen = topojson.feature(data, data.objects.lakes).features;   
        
        var Kantone = topojson.feature(data, data.objects.cantons).features; 
        
        
        var path = d3.geoPath()
            .projection(null);
        
        // define tooltip as div
        div =
            d3.select("body").append("div")
            .attr("class", "tooltip")
            .attr("id", "tooltip")
            .style("opacity", 0); 
       
        // define donutChart as div which should go inside the tooltip
        divdonutChart =
            d3.select("tooltip").append("div")
            .attr("class", "chart", id="donutChart")
            .style("opacity", 0);
        
        
        svg.append("g")
            .attr("class", "municipalities")
            .selectAll("path")
            .data(Gemeinden)
            .enter().append("path")
            .attr("id",function(d){return d.id})
            .style('stroke-width', '0.5')
            .style("fill", function(d) {  
            
            var potenzial = Potenziale.filter(el => {
            return parseInt(el.MunicipalityNumber) === d.properties.id
                })
             if (potenzial.length === 0) {
                    return "lightgrey"
                }
             return drawScenarios(potenzial)

            })
        
        
        // hier folgt die Mouseover-Funktion
        .on("mouseover", function (d) {
            d3.select(this)
            .style("fill", "#008080")
            .style('stroke', "#000")
            .style('stroke-width', function (d) {
            return '1';
          });
           
            
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
       
        // hier wird der Tooltip erstellt
        div
            .html("<strong>" + " Anteile der Gebäudeklassen" + "<br>" + " in der Gemeinde " + "<br>" + d.properties.name + "<br>" + " " + "</strong>")
            .style("left", (d3.event.pageX) + "px")  // hier wird die Position des Tooltips definiert
            .style("top", (d3.event.pageY-20) + "px");
            
            var gklasse = GKlassen.filter(el => {
                return parseInt(el.MunicipalityNumber) === d.properties.id 
                
                // filtere den geladenen Datensatz (die Gebäudeklassen nach der Gemeindenummer und der ID, die Übereinstimmungen werden in die Variable geladen)
            })
            
            if (gklasse.length > 0){
                drawDonutChart(gklasse); 
                
                // wenn die ID grösser als 0 ist (also effektiv eine ID vorhanden ist), dann zeichne den Chart
            }
        })
       
        
        
        .on("mouseout", function (d) {
            d3.select(this)
            .style('stroke', "#000")
              .style('stroke-width', '0.5')// select this: das aktuelle Element (hier also die Gemeinde)
              .style("fill", function(d) { 
            
                var potenzial = Potenziale.filter(el => {
            return parseInt(el.MunicipalityNumber) === d.properties.id
            })
            if (potenzial.length === 0) {
                return "lightgrey"
            }
            return drawScenarios(potenzial)
            })

            
            
 
        div.transition()
            .duration(500)
            .style("opacity", 0);
        })
		      .attr("d", path); 
   
        
        // Hervorhebung der Kantone mit dickeren Linien
        svg.append("g")
            .attr("class", "cantons")
            .selectAll("path")
            .data(Kantone)
            .enter().append("path")
            .attr("id",function(d){return d.id})
            .style("fill", "none")
            .style('stroke',"#000")
            .style('stroke-width', '1')
        
            .attr("d", path);
        
            
        // Farbe und Farblinien für die Seen => Orientierung auf der Karte und sieht besser aus
        svg.append("g")
            .attr("class", "lakes")
            .selectAll("path")
            .data(Seen)
            .enter().append("path")
            .attr("id",function(d){return d.id})
            .style("fill", "skyblue")
            .style('stroke', "darkblue")
    
            .attr("d", path);
         
 
    d3.selectAll('svg')
        .attr("transform", "translate(40, 20)scale(1.3)"); // makes the Swiss map larger and moves it inside the svg;
    }    
    
};