var margin = {top: 20, right: 20, bottom: 160, left: 80},
  width = 1200 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([20, width], .1);

  var x0 = d3.scale.ordinal()
      .rangeRoundBands([20, width], .1);

  var x1 = d3.scale.ordinal();

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var xAxisg = d3.svg.axis()
      .scale(x0)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")

  var colorg = d3.scale.ordinal()
      .range([ "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var color = d3.scale.ordinal()
      .range(["#98abc5", "#8a89a6"]);



// Stacked Bar Chart Starts Here
function stacked(){

  var svg = d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        d3.json("jsonfinal/literate1.json", function(error, data) {

    if (error) throw error;

    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "state"; }));


    data.forEach(function(d) {
      var y0 = 0;
      d.categories1 = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      d.total = d.categories1[d.categories1.length - 1].y1;
    });

    data.sort(function(a, b) { return b.total - a.total; });

    x.domain(data.map(function(d) { return d.state; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
          .attr("y", 0)
          .attr("x", 9)
          .attr("dy", ".2em")
          .attr("transform", "rotate(80)")
          .style("text-anchor", "start");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Literate/Illiterate Population");

    var state = svg.selectAll(".state")
        .data(data)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.state) + ",0)"; });

    state.selectAll("rect")
        .data(function(d) { return d.categories1; })
      .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return color(d.name); });

    var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

  });

}


function grouped(){
  var svg = d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  d3.json("jsonfinal/literateMaleFemale1.json", function(error, data) {

    if (error) throw error;

    var categories = d3.keys(data[0]).filter(function(key) { return key !== "state"; });

    data.forEach(function(d) {
      d.categories1 = categories.map(function(name) { return {name: name, value: +d[name]}; });
    });

    x0.domain(data.map(function(d) { return d.state; }));
    x1.domain(categories).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(d.categories1, function(d) { return d.value; }); })+150000]);


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisg);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number of Persons");

    var state = svg.selectAll(".state")
        .data(data)
      .enter().append("g")
        .attr("class", "state")
        .attr("transform", function(d) { return "translate(" + x0(d.state) + ",0)"; });

      state.selectAll("bar")
          .data(function(d) { return d.categories1; })
        .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.name); })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .style("fill", function(d) { return colorg(d.name); });


      var legend = svg.selectAll(".legend")
          .data(categories)
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", colorg);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });
  });

}


function barchart(){
  var svg = d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>Female Ratio:</strong> <span style='color:red'>" + d["females per 100 males"] + "</span>";
    })

    svg.call(tip);

  d3.json("jsonfinal/malefemaleratio1.json", function(error, data) {
    if (error) throw error;


    data.forEach(function(d){
      d["females per 100 males"]=+d["females per 100 males"]
      console.log(d["females per 100 males"]);
    });

    x.domain(data.map(function(d) { return d.state; }));
    y.domain([0, d3.max(data, function(d) { return d["females per 100 males"]; })]);

  svg.append("text")
      .attr("transform", " translate("+ width/2 +",550)")
      .text("States");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
          .attr("y", 0)
          .attr("x", 9)
          .attr("dy", ".2em")
          .attr("transform", "rotate(80)")
          .style("text-anchor", "start");



    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Females per 100 males");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.state); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d["females per 100 males"]); })
        .attr("height", function(d) { return height - y(d["females per 100 males"]); })
        .on('mouseover', tip.show)
      .on('mouseout', tip.hide);


  });


}
