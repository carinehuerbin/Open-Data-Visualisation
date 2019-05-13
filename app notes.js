
function drawMap() {
    
        var dataset;
    
        // define map size
        var width = 1200,
            height = 600;

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);


        //load data files
            d3.queue()
                .defer(d3.json, "ch_withoutmunic.json")
                .defer(d3.csv, "G_Klassen_ger.csv")
                .defer(d3.csv, "Solarenergiepotenziale_Gemeinden_used_only.csv")
                .await(ready)


    function ready (error, data){

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
            .attr("class", "tooltip", id="tooltip")
            .style("opacity", 0); 
       
        // define donutChart as div which should go inside the tooltip
        divdonutChart =
            d3.select("tooltip").append("div")
            .attr("class", "chart", id="donutChart")
            .style("opacity", 0);
        
        
        
        // load data and variables for donut Chart here
        // margin
        var margin = {top: 20, right: 20, bottom: 20, left: 20},
            width = 500 - margin.right - margin.left,
            height = 500 - margin.top - margin.bottom,
            radius = width/2;

        // color range
        var color = d3.scaleOrdinal()
            .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);


        // donut chart arc
        var arc2 = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 70);

        // arc for the labels position
        var labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        // generate pie chart and donut chart
        var pie = d3.pie()
            .sort(null)
            .value(function(d) { return d; });
        
        var donutChart = pie(data)
        
        var svgDonutChart = d3.select("donutChart")
            .append("svg")
            .attr("width", 50)
            .attr("height", 50);
        
        d3.select("svgDonutChart")
            .append("g")
            .attr("transform", "translate(250,250)")
            .selectAll("path")
            .data(pie)
            .enter()
            .append("path")
            .attr("d", arc2)
            .style("fill", (d,i) => fillScale (i))
            .style("stroke", "black")
            .style("stroke-width", "2px");
        
        
        // highlight municipalities...
        svg.append("g")
            .attr("class", "municipalities")
            .selectAll("path")
            .data(Gemeinden)
            .enter().append("path")
            .attr("id",function(d){return d.id})
            .style("fill", "WhiteSmoke")   
            .style('stroke-width', '0.5')
        
        // ...when moving the mouse
        .on("mouseover", function (d) {
            d3.select(this)
            .style("fill", "Orange")
            .style('stroke', "#000")
            .style('stroke-width', function (d) {
            return '1';
          });
           
        // define transition for mouseover  
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
       
        // load tooltip
        div
            .html("<strong>" + d.properties.name + "</strong>" + " " + "#donutChart") // here the donutChart should be added (but adds only text?)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY-28) + "px");
            })
        
        // define mouseout function
        .on("mouseout", function (d) {
            d3.select(this)
              .style("fill", "WhiteSmoke")
              .style('stroke', "#000")
              .style('stroke-width', '0.5');
            
        // define transition for mouseout   
        div.transition()
            .duration(500)
            .style("opacity", 0.9);
        })
		      .attr("d", path);
   
        
        // highlight cantons lines
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
        
            
        // color and style the lakes
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
