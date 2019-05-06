
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


        var path = d3.geoPath()
            .projection(null);

        svg.append("g")
            .attr("class", "municipalities")
            .selectAll("path")
            .data(Gemeinden)
            .enter().append("path")
            .attr("id",function(d){return d.id})
            .style("fill", "grey")    
            .attr("d", path);
    }

    };