
var make_inds_bars = function(state) {
//    d3.select("svg").remove();
    
    var path_to_data = "./industry_data.csv";
    d3.csv(path_to_data, function(data) {
        
         // color scale
    var colorScale = d3.scale.ordinal()
        .domain(['Agriculture, Forestry, Fishing and Hunting',
    'Mining, Quarrying, and Oil and Gas Extraction', 'Utilities',
    'Construction', 'Manufacturing', 'Wholesale Trade', 'Retail Trade',
    'Transportation and Warehousing', 'Information',
    'Finance and Insurance', 'Real Estate and Rental and Leasing',
    'Professional, Scientific, and Technical Services',
    'Management of Companies and Enterprises',
    'Administrative, Support, Waste Management, and Remediation Services',
    'Educational Services', 'Health Care and Social Assistance',
    'Arts, Entertainment, and Recreation',
    'Accommodation and Food Services',
    'Other Services (except Public Administration)',
    'Public Administration'])
    .range(["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a",
                "#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94",
                "#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d",
                "#17becf", "#9edae5"]);  
        
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

        var width = 400;
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