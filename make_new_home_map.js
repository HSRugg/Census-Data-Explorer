var make_home_map = function (type) {
    d3.select("svg").remove();
    d3.select("#tooltip").remove();
    document.createElement("svg").setAttribute("id", "line_plot_one");
//    document.getElementById("line_plot_one")
    document.getElementById('my_p').innerHTML = "Click A State To Explore It's Pay and Emploment by Industry"

//    <svg id="line_plot_one" width="1000" height="700"></svg>
    var width = 1000;
    var height = 600;
    // D3 Projection
    var projection = d3.geoAlbersUsa()
                       .translate([width/2, height/2])    // translate to center of screen
                       .scale([1000]);          // scale things down so see entire US

    // Define path generator
    var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
                 .projection(projection);  // tell path generator to use albersUsa projection

    // Define linear scale for output
    var color = d3.scaleLinear()
    .range(["rgb(213,222,217)","rgb(217,91,67)","rgb(69,173,168)"]);

    //Create SVG element and append map to the SVG
    var svg = d3.select("center")
                .append("svg")
                .attr("id", "home_page_map")
                .attr("margin", "auto")
                .attr("width", width)
                .attr("height", height);

    // Append Div for tooltip to SVG
    var div = d3.select("body")
                .append("div")   
                .attr("id", "tooltip")               
                .style("opacity", 0);


        // Load in my states data

    state_json = "https://gist.githubusercontent.com/michellechandra/0b2ce4923dc9b5809922/raw/a476b9098ba0244718b496697c5b350460d32f99/us-states.json"
    d3.csv("/Census-Data-Explorer/data_for_US/US_State_pop_00-09.csv", function(data) {
        // get max for scaler
        var max = d3.max(data, function(d) { return +d.incress_2001;} );

        // Load GeoJSON data and merge with states data
        d3.json(state_json, function(json) {
        // Loop through each state data value in the .csv file
        for (var i = 0; i < data.length; i++) {
            for (year of ['incress_2001',
               'incress_2002', 'incress_2003', 'incress_2004', 'incress_2005',
               'incress_2006', 'incress_2007', 'incress_2008', 'incress_2009']) {
                // Grab State Name
                var dataState = data[i].Place;
                // Grab data value 
                var dataValue = data[i][year];
                // console.log(dataValue);
                // Find the corresponding state inside the GeoJSON
                for (var j = 0; j < json.features.length; j++)  {
                    var jsonState = json.features[j].properties.name;
                    if (dataState == jsonState) {
                    // Copy the data value into the JSON
                    json.features[j].properties[year] = dataValue; 
                    // Stop looking through the JSON
                    break;
                    }
                }
            }
        }

    // Make colorScaler
    var colorScaler = d3.scaleLinear()
                            .domain([-.02,.04])
                            .range(["blue","black"]);

    // Bind the data to the SVG and create one path per GeoJSON feature
    var paths = svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "1")
        .style("fill", function(d) { return "#aca3a3" })
        .on('click', function(d) {make_state_frame(d.properties.name), d3.select("svg").remove();})
        .on("mouseover", function(d) {      
            div.transition()        
               .duration(200)      
               .style("opacity", .9);      
               div.text(d.properties.name)
               .style("left", (d3.event.pageX) + "px")     
               .style("top", (d3.event.pageY - 18) + "px");    
        })   
        // fade out tooltip on mouse out               
        .on("mouseout", function(d) {       
            div.transition()        
               .duration(500)      
               .style("opacity", 0)
        })
        ;


    svg.selectAll("path").transition()
        .delay(1500)
        .style("fill", function(d) { return colorScaler(d.properties.incress_2009) });

    //var make_state_map function () {
    //    svg.selectAll("path").transition()
    //    .duration(8000)
    //    .style("fill", function(d) { return colorScaler(d.properties.incress_2009) });}; 


        });
    });
    
}