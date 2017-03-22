console.log('here:');
var make_inds_lines = function (state) {
    console.log('State:', state);
    
    var outerWidth = 700;
    var outerHeight = 800;
    var margin = { left: 60, top: 5, right: 20, bottom: 60 };
    var xColumn = "year";
    var yColumn = "avrage_pay";
    var lineColumn = "industry";
    var xAxisLabelText = "Year";
    var xAxisLabelOffset = 48;
    var yAxisLabelText = "Average Pay";
    var yAxisLabelOffset = 60;
    var innerWidth  = outerWidth   - margin.left - margin.right;
    var innerHeight = outerHeight - margin.top  - margin.bottom;
    
    // make div for line plot
    var line_plot = document.createElement('div');
        line_plot.id = "line_plot";
        line_plot.style.position = "relative";
        line_plot.style.cssFloat = "left";
        line_plot.style.padding = 50;
    
    // append the body
    document.body.appendChild(line_plot);

    //append svg to div got line plot
    var svg = d3.select("#line_plot").append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight);
    
    // create a group to move things togeather with prior defined values
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // add axis to the group with prior defined values
    var xAxisG = g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + innerHeight + ")")
    var xAxisLabel = xAxisG.append("text")
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + (innerWidth / 2) + "," + xAxisLabelOffset + ")")
        .attr("class", "label")
        .text(xAxisLabelText);
    var yAxisG = g.append("g")
        .attr("class", "y axis");
    var yAxisLabel = yAxisG.append("text")
        .style("text-anchor", "middle")
        .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
        .attr("class", "label")
        .text(yAxisLabelText);
    
    // scales for axis
    var xScale = d3.time.scale().range([0, innerWidth]);
    var yScale = d3.scale.linear().range([innerHeight, 0]);

    //legend
    var colorLegendG = g.append("g")
        .attr("class", "color-legend")
        .attr("transform", "translate("+(outerWidth-700) +", 20)");
    
    // color scale should be the same in inds_rank_bars
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

    // formate ticks for axis
    var siFormat = d3.format("s");
    var customTickFormat = function (d){
    return siFormat(d).replace("G", "B");
    };
    
    // add axis
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
    .ticks(8);
    var yAxis = d3.svg.axis().scale(yScale).orient("left")
    .ticks(6)
    .tickFormat(customTickFormat)
    .outerTickSize(0);
    
    d3.select("yAxis")
        .setAttribute("d", 'd="M-6,0H0V741H-6"');
    
    // difine lines
    var line = d3.svg.line()
    .x(function(d) { return xScale(d[xColumn]); })
    .y(function(d) { return yScale(d[yColumn]); });


        function render(data){
            
        data = data.filter(function(d) { 
            if(d["industry"]!= "00" && d["state"] == state)
            { return d; } 
            })
        console.log(data[0])

        xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
        yScale.domain([0, d3.max(data, function (d){ return d[yColumn]; })]);
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
        var nested = d3.nest()
          .key(function (d){ return d[lineColumn]; })
          .entries(data);
        colorScale.domain(nested.map(function (d){ return d.key; }));
        var paths = g.selectAll(".chart-line")
            .data(nested);
        paths.enter().append("path")
            .attr("class", "chart-line")
            .attr("id", function (d){ return d.key.split(' ').join('').replace("(", "").replace(")","").split(',').join(''); });
        paths.exit().remove();

        paths.attr("d", function (d){ return line(d.values); })
            .attr("stroke", function (d){ return colorScale(d.key); })
            .style("fill", "none");
            
    }
    function type(d){
        d.year = new Date(d.year);
        d.avrage_pay = +d.avrage_pay;
        return d;
    }
    
    d3.csv("industry_data.csv", type, render);
    }