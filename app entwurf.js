
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
            .await(ready)

    function ready (error, data){

        if(error){console.log("Error: "+ error)};

        dataset = data;

        var Gemeinden = topojson.feature(data, data.objects.municipalities).features;
        
        var Seen = topojson.feature(data, data.objects.lakes).features;   
        
        var Kantone = topojson.feature(data, data.objects.cantons).features; 
        
            
        var path = d3.geoPath()
            .projection(null);
        
        
        div =
            d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        
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
            
            
            
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
            
        div
            .html("<strong>" + d.properties.name + "</strong>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY-28) + "px");
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