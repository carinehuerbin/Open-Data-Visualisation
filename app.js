
function drawMap() {
    
        var dataset;
    
        // define map size
        var width = 1200,
            height = 600;

        var svg = d3.select("#home").append("svg")  // Karte wird hier verknüpft
            .attr("width", width)
            .attr("height", height);


        //load data files
            d3.queue()
                .defer(d3.json, "ch_withoutmunic.json")
                .defer(d3.csv, "G_Klassen_ger.csv")
                .defer(d3.csv, "Solarenergiepotenziale_Gemeinden_used_only2.csv")
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
        
        
        // hier werden die Gemeinden orange markiert, wenn die Maus darüberfährt
        svg.append("g")
            .attr("class", "municipalities")
            .selectAll("path")
            .data(Gemeinden)
            .enter().append("path")
            .attr("id",function(d){return d.id})
            .style("fill", function(d) {  
            
            // die Farbe (fill ist Funktion, die untend dran ausgeführt wird. => überführen in sep. file)
            
            var potenzial = Potenziale.filter(el => {
                return parseInt(el.MunicipalityNumber) === d.properties.id
            })
            if (potenzial.length === 0) {
                return "red"
            }
            /*
            if (parseInt(potenzial[0].Scenario1) > 0) { // in eigene Funktion übertragen, auch hier wieder: Filter
                return "greenyellow"
            }
            if (parseInt(potenzial[0].Scenario1) > 20) { 
                
            // if(parseInt(potenzial[0].Scenario1) => 0 && parseInt(potenzial[0].Scenario1) <= 20) return... geht nicht
            // braucht switch/case?
                
                return "lawngreen"
            }
            if (parseInt(potenzial[0].Scenario1) > 40) {
                return "olivedrab"
            }
            if (parseInt(potenzial[0].Scenario1) > 60) { 
                return "forestgreen"
            }
            if (parseInt(potenzial[0].Scenario1) > 80) {
                return "green"
            }
            */
            if (parseInt(potenzial[0].Scenario1) > 100) {
                return "orange"
            }
            })
            .style('stroke-width', '0.5')
        
        
        // hier folgt die Mouseover-Funktion
        .on("mouseover", function (d) {
            d3.select(this)
            .style("fill", "#008080")
            .style('stroke', "#000")
            .style('stroke-width', function (d) {
            return '1';
          });
           
        // define transition for mouseover  
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
       
        // hier wird der Tooltip erstellt
        div
            .html("<strong>" + d.properties.name + "</strong>" + " ") // d.properties.name = Name der Gemeinde
            .style("left", (d3.event.pageX) + "px")  // hier wird die Grösse des Tooltips definiert
            .style("top", (d3.event.pageY-28) + "px");
            
            var gklasse = GKlassen.filter(el => {
                return parseInt(el.MunicipalityNumber) === d.properties.id 
                
                // filtere den geladenen Datensatz (die Gebäudeklassen nach der Gemeindenummer und der ID, die Übereinstimmungen werden in de Variable geladen)
            })
            
            if (gklasse.length > 0){
                drawDonutChart(gklasse); 
                
                // wenn die ID grösser als 0 ist (also effektiv eine ID vorhanden ist), dann zeichne den Chart
            }
        
        })
       
        
        // hier folgt die Funktion, die definiert, was passiert, wenn die Maus eine Gemeinde verlässt
        .on("mouseout", function (d) {
            d3.select(this)  // select this: das aktuelle Element (hier also die Gemeinde)
              .style("fill", function(d) { 
            
            var potenzial = Potenziale.filter(el => {
                return parseInt(el.MunicipalityNumber) === d.properties.id
            })
            if (potenzial.length === 0) {
                return "red"
            } /*
            if (parseInt(potenzial[0].Scenario1) > 0) { // in eigene Funktion übertragen, auch hier wieder: Filter
                return "greenyellow"
            }
            if (parseInt(potenzial[0].Scenario1) > 20) { 
            }
            if (parseInt(potenzial[0].Scenario1) < 40) {
                return "olivedrab"
            }
            if (parseInt(potenzial[0].Scenario1) > 60) { 
                return "forestgreen"
            }
            if (parseInt(potenzial[0].Scenario1) < 80) {
                return "green"
            } */
            if (parseInt(potenzial[0].Scenario1) > 100) {
                return "orange"
            } 
            }) 
              .style('stroke', "#000")
              .style('stroke-width', '0.5'); 
            
        // define transition for mouseout   
        div.transition()
            .duration(500)
            .style("opacity", 0.9);
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
         
 
    
    }     
};
