
var make_circles_for_state = function(state) {
    d3.select("svg").remove();
    
    var path_to_data = "./industry_data.csv";
    d3.csv(path_to_data, function(data) {
        
        var year = "2004";
        var data = data.filter(function(d) { 
            if( d["state"] == state && d["year"]==year && d["industry"]!="00" && d["industry"]!="000" && d["industry"]!="0000")
            { return d; } 
                })
        data.forEach(function(d) {
            d.Emp = +d.Emp;
            d.Payroll = +d.Payroll;
            d.avrage_pay = +d.avrage_pay;
        });
        function filter_for_some_college(data) {
        return data.education == "Some College";
        };
        function filter_for_advanced(data) {
        return data.education == "Advanced Degree";
        };
        function filter_for_unknown(data) {
        return data.education == "Unavalble";
        };
                              
                                              
        data = data.sort(function (a,b) {return d3.descending(a.avrage_pay, b.avrage_pay); });

        var max = d3.max(data, function(d) { return +d.avrage_pay;} );
        console.log(max);
        console.log(data[0].industry);   

        var width = 500;
        var height = 800;
        var widthScaler = d3.scale.linear()
                        .domain([0,max])
                        .range([0,width]);


        var canvas = d3.select("body")
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .style("padding", "20px 0px 0px 0px");
        
        var spacing = 36;
        var bars = canvas.selectAll("rect")
                            .data(data)
                            .enter()
                                .append("rect")
                                .attr("width", 0)
                                .attr("height", spacing-2)
                                .attr("y", function(d, i) { return i * spacing})
                                .attr("fill", "white")
                                .on("mouseover", function (d) {d3.selectAll("#"+d.industry.split(' ').join('').split(',').join('').replace("(", "").replace(")","")).style("stroke-width", "5");})
                                .on("mouseout", function (d) {d3.selectAll("#"+d.industry.split(' ').join('').split(',').join('').replace("(", "").replace(")","")).style("stroke-width", "1"); });
                                                             

        var texts = canvas.selectAll("mytexts")
                                    .data(data)
                                    .enter()
                                    .append("text")
                                    .style('text-anchor','start')
                                    .attr('transform', function(d,i,j) { return 'translate(14,0)' });
        texts.attr("class", "value")
                      .attr("y", function(d, i) { return i * spacing+spacing/2})
                      .attr("dx", -3)
                      .attr("dy", ".35em")
                      .attr("text-anchor", "end")
                      .text(function(d) { return d.industry; });


        bars.transition()
            .duration(1500)
            .attr("width", function(d) { return widthScaler(d.avrage_pay); })
            .attr("fill", function(d) {return colorScale(d.industry)});
            
        
        }        
    )};

make_circles_for_state("Utah")