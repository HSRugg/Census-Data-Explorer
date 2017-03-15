var make_line_for_state = function(state) {
    d3.select("svg").remove();
    var path_to_data = "https://cdn.rawgit.com/HSRugg/DSI-SF-4-HSRugg/master/data/census_data/"+state+"_small_all_eds.csv"
    d3.csv(path_to_data, function(data) {
    console.log(state);



    var data = data.filter(function(d) { 
        if(d["industry"]=="00")
        { return d; } 
    })
    
    // clean data types
    data.forEach(function(d) {
        d.Emp = +d.Emp;
        d.Average_pay = +d.Average_pay;
    })
    
    function filter_for_male(data) {
    return data.sex == "Male";
    };
    function filter_for_female(data) {
    return data.sex == "Female";
    };

    function filter_for_no_high(data) {
    return data.education == "Less Than High School";
    };
    function filter_for_high_school(data) {
    return data.education == "High School Graduate";
    };
    function filter_for_some_college(data) {
    return data.education == "Some College";
    };
    function filter_for_advanced(data) {
    return data.education == "Advanced Degree";
    };
    function filter_for_unknown(data) {
    return data.education == "Unavalble";
    };
        
    var maxpay = d3.max(data, 
        function(d) { return +d.Average_pay;} );

    var vis = d3.select("#line_plot_one"),
        WIDTH = 700,
        HEIGHT = 600,
        MARGINS = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 80
        },
        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2004,2012]),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,maxpay*1.2]),
        xAxis = d3.svg.axis().scale(xScale).tickFormat(d3.format("d")),
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("fill","#333")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 25)
        .attr("x", 4)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");
    
    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);

    var lineGen = d3.svg.line()
        .x(function(d) {
            return xScale(d.year)})
        .y(function(d) {
            return yScale(d.Average_pay)})
        .interpolate("basis");

    vis.append('svg:path')
        .attr('d', lineGen(data.filter(filter_for_male).filter(filter_for_no_high)))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .style("stroke-dasharray", ("3, 3"));
    vis.append('svg:path')
        .attr('d', lineGen(data.filter(filter_for_female).filter(filter_for_no_high)))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr("data-legend", "No High School");

    vis.append('svg:path')
        .attr('d', lineGen(data.filter(filter_for_male).filter(filter_for_high_school)))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .style("stroke-dasharray", ("3, 3"));
    vis.append('svg:path')
        .attr('d', lineGen(data.filter(filter_for_female).filter(filter_for_high_school)))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr("data-legend", "High School");

    vis.append('svg:path')
        .attr('d', lineGen(data.filter(filter_for_male).filter(filter_for_some_college)))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .style("stroke-dasharray", ("3, 3"));
    vis.append('svg:path')
        .attr('d', lineGen(data.filter(filter_for_female).filter(filter_for_some_college)))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr("data-legend", "Some College");

    vis.append('svg:path')
        .attr('d', lineGen(data.filter(filter_for_male).filter(filter_for_advanced)))
        .attr('stroke', 'orange')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .style("stroke-dasharray", ("3, 3"));
    vis.append('svg:path')
        .attr('d', lineGen(data.filter(filter_for_female).filter(filter_for_advanced)))
        .attr('stroke', 'orange')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr("data-legend", "Advanced Degree");

    vis.append('svg:path')
        .attr('d', lineGen(data.filter(filter_for_male).filter(filter_for_unknown)))
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .style("stroke-dasharray", ("3, 3"));
    vis.append('svg:path')
        .attr('d', lineGen(data.filter(filter_for_female).filter(filter_for_unknown)))
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr("data-legend", "Unavailable");

    var legenedX = 450;
    // add legend
    var legend = vis.append("g")
        .attr("class","legend")
        .attr("transform","translate("+legenedX+",20)")
        .style("font-size","12px")
        .call(d3.legend);
         
    var legend_two = vis.append("rect")
      .attr("width","100px")
      .attr("height","72px")
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr("opacity", .9)
      .attr("x", legenedX + 120)
      .attr("y", 4)
        
    
    var line_types = [(3,3),(3,0)]
  
    vis.append("line")
      .attr("x1", legenedX+ 190)
      .attr("x2", legenedX+ 205)
      .attr("y1", 25)
      .attr("y2", 25)
      .style("stroke-dasharray", (3,3))
      .attr('stroke-width', 2)
      .style("stroke", 'black');
        
    vis.append("line")
      .attr("x1", legenedX+190)
      .attr("x2", legenedX+205)
      .attr("y1", 50)
      .attr("y2", 50)
      .style("stroke-dasharray", (3,0))
      .attr('stroke-width', 2)
      .style("stroke", 'black');

    vis.append("text")
      .attr("x", legenedX+180)
      .attr("y", 25)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text("Male");
    vis.append("text")
      .attr("x", legenedX+180)
      .attr("y", 50)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text("Female");
    


    vis.append("text")      // text label for the x axis
        .attr("x", 70 )
        .attr("y", 12 )
        .style("text-anchor", "middle")
        .text("Yearly Wage");
        
     vis.append("text")      // text label for the x axis
        .attr("x", 70 )
        .attr("y", -10 )
        .style("text-anchor", "middle")
        .text("Average");
        
        
        

})};
