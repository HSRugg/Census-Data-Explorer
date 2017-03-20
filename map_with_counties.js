

    
var make_inds_map_with_counties = function(industry) {

    try {
        d3.select('svg').remove()    
}
catch(err) {
   //pass
}
document.getElementById('my_p').innerHTML = "Displaying  "+industry+" Data From 2012"

document.getElementById('tooltip').style.visibility = "hidden";
document.getElementById('header').remove()


var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var my_map = d3.map();
var name_map = d3.map();
var map_2011 = d3.map();

var path = d3.geoPath();

//var x = d3.scaleLinear()
//    .domain([1, 10])
//    .rangeRound([600, 860]);

var color = d3.scaleLog()
    .base(Math.E)
    .domain([Math.exp(0), Math.exp(10)])
    .range(["#BBDEFB", "darkblue"]);

var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(600,40)");

g.selectAll("rect")
  .data([Math.exp(0), Math.exp(2), Math.exp(4), Math.exp(6), Math.exp(8), Math.exp(10), Math.exp(12)])
    .enter()
    .append("rect")
    .attr("height", 8)
    .attr("x", function(d, i) { return (i*35); })
    .attr("width", 34)
    .attr("fill", function(d) { return color(d); })
    .attr("text", function(d) { return d});
    

g.append("text")
    .attr("class", "caption")
    .attr("x", function(d, i) { return (i*40); })
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("Log Scaled Employment Rate");

g.selectAll("line")
  .data([Math.exp(0), Math.exp(2), Math.exp(4), Math.exp(6), Math.exp(8), Math.exp(10), Math.exp(12)])
    .enter()
    .append("line")
    .style("stroke", "black")  
    .attr("x1", function(d, i) { return (i*35+10); })     
    .attr("y1", 30)      
    .attr("x2", function(d, i) { return (i*35+17); })    
    .attr("y2", 30);   

var superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹",
    formatPower = function(d) { return (d + "").split("").map(function(c) { return superscript[c]; })}

var keyLaybels = d3.select(".key").selectAll("keyLaybels")
        .data([Math.exp(0), Math.exp(2), Math.exp(4), Math.exp(6), Math.exp(8), Math.exp(10), Math.exp(12)])
        .enter()
        .append("text")
        .style('text-anchor','start')
        .attr('transform', function(d,i,j) { return 'translate(14,0)' });
    
keyLaybels.attr("class", "value")
              .attr("x", function(d, i) { return i * 35 - 20})
              .attr("y", 30)
              .attr("dx", -3)
              .attr("dy", ".35em")
              .attr("text-anchor", "end")
              .text(function(d) { return ("e" + formatPower(Math.round(Math.log(d)))).replace(",",""); });
				

		
d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v1.json")
    .defer(d3.csv, "/Census-Data-Explorer/data_for_US/Construction_county_emp.csv", function(d) { my_map.set(d.id, +d.rate), name_map.set(d.id, d.name); } )
    .await(ready);
    
    function ready(error, us) {
      if (error) throw error;
        

var missing_arr = [];

var missing_fliter = function(d) { 
            d.forEach(function(element) {
                if(typeof(my_map.get(element.id)) == 'undefined')
                { missing_arr.push(element.id) } 
                })
 };
console.log(missing_arr);  
        

           
  missing_fliter(topojson.feature(us, us.objects.counties).features);
  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("fill", function(d) { return color(my_map.get(d.id))})
      .attr("d", path)
    .append("title")
      .text(function(d) { return name_map.get(d.id); });

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
        
}
}
//make_inds_map_with_counties("Construction")