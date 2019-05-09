
function drawMap() {
    
        var dataset;

        var width = 960,
            height = 500;

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
    

        //load data files
        d3.queue()
            .defer(d3.json, "ch_withoutmunic.json")
            .defer(d3.json, "G_Klassen_ger.json")
            .await(ready)


    function ready (error, data){

        if(error){console.log("Error: "+ error)};

        dataset = data;

        var Gemeinden = topojson.feature(data, data.objects.municipalities).features;
  
     // evtl. nicht benötigt   Gemeinden.forEach(function (name){
     /*   G_Klassen_ger.some(function (csvrow){
        if(name == csvrow.MunicipalityNumber) {
            municipalities.properties.data2 = csvrow; 
            return true;           
                }    
            });    
        });
        */ 
        
        var Seen = topojson.feature(data, data.objects.lakes).features;   
        
        var Kantone = topojson.feature(data, data.objects.cantons).features; 
        
        
        var path = d3.geoPath()
            .projection(null);
        
        
        div =
            d3.select("body").append("div")
            .attr("class", "tooltip") // ergänzen id = tooltip
            //.attr("class", "donutChart", id="donutChart")
            .style("opacity", 0);
       
        // hier Variablen zu donutChart einfüllen       

        
        svg.append("g")
            .attr("class", "municipalities")
            .selectAll("path")
            .data(Gemeinden)
            .enter().append("path")
            .attr("id",function(d){return d.id})
            .style("fill", "WhiteSmoke")   
            .style('stroke-width', '0.5')
        
        
        
        .on("mouseover", function (d) {
            d3.select(this)
            .style("fill", "Orange")
            .style('stroke', "#000")
            .style('stroke-width', function (d) {
            return '1';
          });
            
           // evtl. nicht benötigt /* bei Mouseover kommt eine Funktion rein mit der Anweisung, welche Daten mit dem Donut Chart angezeigt werden sollen: 
          /*  .on("click", function (d) {
            d3.select('#donutChart').select(d.properties.data); 
            */ 
            
            
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
       
            
            // hier drunter im Tooltip den Donut Chart reinladen / verknüpfen via ID oder Gemeindename
        div
            .html("<strong>" + d.properties.name + "</strong>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY-28) + "px");
            
            // append svg: d als data
            /* svg.append(data)
                .attr("class", "Einfamhaus")
                .selectAll("path")
                .data(Einfamhaus)
                .enter().append("path")
                // donut styling here
                
                 /* hier das ganze Donut Chart zeug reinkopieren */
            
            })
        
        .on("mouseout", function (d) {
            d3.select(this)
              .style("fill", "WhiteSmoke")
              .style('stroke', "#000")
              .style('stroke-width', '0.5');
            
            
        div.transition()
            .duration(500)
            .style("opacity", 0.9);
        })
	  
		      .attr("d", path);

        
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