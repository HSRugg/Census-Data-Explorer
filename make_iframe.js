var make_state_frame = function (state) {
var iframe = document.createElement('iframe');
//        iframe.id = "inds_plot_iframe"
//        iframe.src = "state_inds.html";
//        iframe.width = 1500;
//        iframe.height = 1000;
//        document.body.appendChild(iframe);
//    
        document.getElementById('my_p').innerHTML = "Displaying Data For "+state+"."

        document.getElementById('tooltip').style.visibility = "hidden";
        document.getElementById('header').style.visibility = "hidden";
    
//    var d3_script = iframe.contentWindow.document.createElement("script");
//    d3_script.type = "text/javascript";
//    d3_script.src = "https://d3js.org/d3.v3.min.js";
//    iframe.contentWindow.document.body.appendChild(d3_script);
//    
     var iframe = document.createElement('iframe');

      // append the body
      document.body.appendChild(iframe);

      // create a string to use as a new document object
      var val = '<scr' + 'ipt type="text/javascript" src = "https://d3js.org/d3.v3.min.js" >  </scr' + 'ipt>';
      val += '<scr' + 'ipt type="text/javascript" src = "indesty_rank_bars.js" >  </scr' + 'ipt>';

      // get a handle on the <iframe>d document (in a cross-browser way)
      var doc = iframe.contentWindow || iframe.contentDocument;
      if (doc.document) {
        doc = doc.document;
      }

      // open, write content to, and close the document
      doc.open();
      doc.write(val);
      doc.close();
    
    
    
    
//        var outerWidth = 800;
//        var outerHeight = 800;
//        var margin = { left: 120, top: 5, right: 20, bottom: 60 };
//        var xColumn = "year";
//        var yColumn = "avrage_pay";
//        var lineColumn = "industry";
//        var xAxisLabelText = "Year";
//        var xAxisLabelOffset = 48;
//        var yAxisLabelText = "Average Pay";
//        var yAxisLabelOffset = 60;
//        var innerWidth  = outerWidth   - margin.left - margin.right;
//        var innerHeight = outerHeight - margin.top  - margin.bottom;
//
//        var svg = d3.select("body").append("svg")
//            .attr("width", outerWidth)
//            .attr("height", outerHeight);
//
//        var g = svg.append("g")
//            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//        var xAxisG = g.append("g")
//            .attr("class", "x axis")
//            .attr("transform", "translate(0," + innerHeight + ")")
//        var xAxisLabel = xAxisG.append("text")
//            .style("text-anchor", "middle")
//            .attr("transform", "translate(" + (innerWidth / 2) + "," + xAxisLabelOffset + ")")
//            .attr("class", "label")
//            .text(xAxisLabelText);
//        var yAxisG = g.append("g")
//            .attr("class", "y axis");
//        var yAxisLabel = yAxisG.append("text")
//            .style("text-anchor", "middle")
//            .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
//            .attr("class", "label")
//            .text(yAxisLabelText);
//        var colorLegendG = g.append("g")
//            .attr("class", "color-legend")
//            .attr("transform", "translate("+(outerWidth-700) +", 20)");
//        
//        var xScale = d3.time.scale().range([0, innerWidth]);
//        var yScale = d3.scale.linear().range([innerHeight, 0]);
//        var colorScale = d3.scale.ordinal()
//            .domain(['Agriculture, Forestry, Fishing and Hunting',
//       'Mining, Quarrying, and Oil and Gas Extraction', 'Utilities',
//       'Construction', 'Manufacturing', 'Wholesale Trade', 'Retail Trade',
//       'Transportation and Warehousing', 'Information',
//       'Finance and Insurance', 'Real Estate and Rental and Leasing',
//       'Professional, Scientific, and Technical Services',
//       'Management of Companies and Enterprises',
//       'Administrative, Support, Waste Management, and Remediation Services',
//       'Educational Services', 'Health Care and Social Assistance',
//       'Arts, Entertainment, and Recreation',
//       'Accommodation and Food Services',
//       'Other Services (except Public Administration)',
//       'Public Administration'])
//            .range(["#1f77b4",
//                    "#aec7e8",
//                    "#ff7f0e",
//                    "#ffbb78",
//                    "#2ca02c",
//                    "#98df8a",
//                    "#d62728",
//                    "#ff9896",
//                    "#9467bd",
//                    "#c5b0d5",
//                    "#8c564b",
//                    "#c49c94",
//                    "#e377c2",
//                    "#f7b6d2",
//                    "#7f7f7f",
//                    "#c7c7c7",
//                    "#bcbd22",
//                    "#dbdb8d",
//                    "#17becf",
//                    "#9edae5"]);
//        
//        var siFormat = d3.format("s");
//        var customTickFormat = function (d){
//        return siFormat(d).replace("G", "B");
//      };
//     
//      var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
//        .ticks(8);
//      var yAxis = d3.svg.axis().scale(yScale).orient("left")
//        .ticks(6)
//        .tickFormat(customTickFormat)
//        .outerTickSize(0);
//                
//      var line = d3.svg.line()
//        .x(function(d) { return xScale(d[xColumn]); })
//        .y(function(d) { return yScale(d[yColumn]); });
////      var colorLegend = d3.legend.color()
////        .scale(colorScale)
////        .shapePadding(3)
////        .shapeWidth(15*2.18)
////        .shapeHeight(15*2.18)
////        .labelOffset(8);
//        
//        var make_inds_plots = function (state) {
//            function render(data){
//            console.log(data[0])
//            data = data.filter(function(d) { 
//                if(d["industry"]!= "00" && d["state"] == state)
//                { return d; } 
//                })
//            console.log(data[0])
//
//            xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
//            yScale.domain([0, d3.max(data, function (d){ return d[yColumn]; })]);
//            xAxisG.call(xAxis);
//            yAxisG.call(yAxis);
//            var nested = d3.nest()
//              .key(function (d){ return d[lineColumn]; })
//              .entries(data);
//            colorScale.domain(nested.map(function (d){ return d.key; }));
//            var paths = g.selectAll(".chart-line")
//                .data(nested);
//            paths.enter().append("path")
//                .attr("class", "chart-line")
//                .attr("id", function (d){ return d.key.split(' ').join('').replace("(", "").replace(")","").split(',').join(''); });
//            paths.exit().remove();
//
//            paths.attr("d", function (d){ return line(d.values); })
//                .attr("stroke", function (d){ return colorScale(d.key); });
//    //        colorLegendG.call(colorLegend);
//        }
//        function type(d){
//            d.year = new Date(d.year);
//            d.avrage_pay = +d.avrage_pay;
//            return d;
//        }
//        d3.csv("industry_data.csv", type, render);
//        }
////        make_inds_plots(state)
};
