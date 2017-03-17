local_path = "/censues_page"
var make_inds_map_with_counties = function(industry) {
    var path_to_folder = "/Census-Data-Explorer/data_for_US/"
//    var year = "2012";
    var path_to_data = path_to_folder+industry+"_county_emp.csv";
                        
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var my_map = d3.map();

    var path = d3.geoPath();
    console.log(path_to_data)
    var color = d3.scaleLinear()
        .domain([0, 5115])
        .range(["#BBDEFB", "darkblue"]);


    d3.queue()
        .defer(d3.json, "https://d3js.org/us-10m.v1.json")
        .defer(d3.csv(path_to_data, function(d) { my_map.set(d.id, +d.rate); }))
        .await(ready);
            
    console.log(my_map)
    
    function ready(error, us) {
      if (error) throw error;

      svg.append("g")
          .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
          .attr("fill", function(d) { console.log(d.id); return color(my_map.get(d.id)); })
          .attr("d", path)
        .append("title")
          .text(function(d) { return d.rate + "%"; });

      svg.append("path")
          .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
          .attr("class", "states")
          .attr("d", path);
            
            
            
};
}
