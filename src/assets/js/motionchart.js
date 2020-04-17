var thisYear;
var minYear = 404;
var maxYear = 425;
var mYear = [404, 411, 418, 425];
var mType = 'week';

thisYear = minYear;
function x(d) { return d.sales; }
function y(d) { return d.lifeExpectancy; }
function radius(d) { return d.population; }
function color(d) { return d.region; }
function key(d) { return d.name; }
var margin = {top: 29.5, right: 29.5, bottom: 29.5, left: 59.5},
   // width = 960 - margin.right,
   // height = 500 - margin.top - margin.bottom;
   width=500,
   height=425;
    var xScale = d2.scale.log().domain([300, 1e5]).range([0, width]),
    yScale = d2.scale.linear().domain([10, 85]).range([height, 0]),
    radiusScale = d2.scale.sqrt().domain([0, 5e8]).range([0, 40]),
    colorScale = d2.scale.category10();


function GetMotionChartSVG(){
    var containerData=[];
    // Various scales. These domains make assumptions of data, naturally.


// The x & y axes.
var xAxis = d2.svg.axis().orient("bottom").scale(xScale).ticks(12, d2.format(",d")),
yAxis = d2.svg.axis().scale(yScale).orient("left");
    var svg = d2.select("#chartrnd").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add the x-axis.
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Add the y-axis.
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

// Add an x-axis label.
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("sales amount");

// Add a y-axis label.
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("social count");
   // return svg;
   var label = svg.append("text")
    .attr("class", "year label")
    .attr("text-anchor", "end")
    .attr("y", height - 24)
    .attr("x", width)
    .text(minYear);
    containerData.push(svg);
    containerData.push(label);
    return containerData;
}

function MotionChartStart(svg, label, nations, miYear, maYear, mmType)
{
    this.minYear = miYear;
    this.maxYear = maYear;
    this.mType = mmType;
    this.thisYear = this.minYear;
    svg.selectAll(".dot").remove();
    //alert("Start Clicked");
    // Load the data.
   // A bisector since many nation's data is sparsely-defined.
  var bisect = d2.bisector(function(d) { return d[0]; });

  // Add a dot per nation. Initialize the data at 2000, and set the colors.
  // console.log(thisYear);
  var dot = svg.append("g")
      .attr("class", "dots")
      .selectAll(".dot")
      .data(interpolateData(this.thisYear))
      .enter().append("circle")
      .attr("class", "dot")
      .style("fill", function(d) { return colorScale(color(d)); })
      .call(position)
      .sort(order);

  // Add a title.
  dot.append("title")
      .text(function(d) { return 'Brand: ' + d.name + ' Sales:' + d.sales; });

  // Add an overlay for the year label.
  var box = label.node().getBBox();

  var overlay = svg.append("rect")
        .attr("class", "overlay")
        .attr("x", box.x)
        .attr("y", box.y)
        .attr("width", box.width)
        .attr("height", box.height);
        //.on("mouseover", enableInteraction);

  // Start a transition that interpolates the data based on year.
  svg.transition()
      .duration(30000)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);

  // Positions the dots based on data.
  function position(dot) {
    dot .attr("cx", function(d) { return xScale(x(d)); })
        .attr("cy", function(d) { return yScale(y(d)); })
        .attr("r", function(d) { return radiusScale(radius(d)); });
  }

  // Defines a sort order so that the smallest dots are drawn on top.
  function order(a, b) {
    return radius(b) - radius(a);
  }

  // After the transition finishes, you can mouseover to change the year.
  function enableInteraction() {
    var yearScale = d2.scale.linear()
        .domain([minYear, maxYear])
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

    // Cancel the current transition, if any.
    svg.transition().duration(0);

    overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

    function mouseover() {
      label.classed("active", true);
    }

    function mouseout() {
      label.classed("active", false);
    }

    function mousemove() {
      displayYear(yearScale.invert(d2.mouse(this)[0]));
    }
  }

  // Tweens the entire chart by first tweening the year, and then the data.
  // For the interpolated data, the dots and label are redrawn.
  function tweenYear() {
      var year = d2.interpolateNumber(thisYear, maxYear);    
      return function(t) { displayYear(year(t)); };    
  }

  // Updates the display to show the specified year.
  function displayYear(year) {   
    if(mType == 'week')
    { 
      if(mYear.includes(Math.round(year)))
      {
        dot.data(interpolateData(year), key).call(position).sort(order);
        thisYear = Math.round(year);
        label.text(Math.round(year));
      }
    }
    else
    { 
        dot.data(interpolateData(year), key).call(position).sort(order);
        thisYear = Math.round(year);
        label.text(Math.round(year));      
    }
  }

  // Interpolates the dataset for the given (fractional) year.
  function interpolateData(year) {
    return nations.map(function(d) {
      return {
        name: d.name, 
        region: d.region,
        sales: interpolateValues(d.sales, year),
        population: interpolateValues(d.population, year),
        lifeExpectancy: interpolateValues(d.lifeExpectancy, year)
      };
    });
  }

  // Finds (and possibly interpolates) the value for the specified year.
  function interpolateValues(values, year) {
    var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
    if (i > 0) {
      var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);      
      return a[1] * (1 - t) + b[1] * t;
    }
    return a[1];
  }


}


function MotionChartStop(svg)
{
  //alert("stop Clicked");
  svg.transition().duration(0);
}