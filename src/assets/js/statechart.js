

  var _a = {
    Feature: function(n, t) {
        ht(n.geometry, t);
    },
    FeatureCollection: function(n, t) {
        for (var e = n.features, r = -1, i = e.length; ++r < i; ) ht(e[r].geometry, t);
    }
}
function stateMap(){

var w = 650;
var h = 650;
var proj = d3.geo.mercator();
var path = d3.geo.path().projection(proj);
var t = proj.translate(); // the projection's default translation
var s = proj.scale() // the projection's default scale

var buckets = 9,
  colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"]; // alternatively colorbrewer.YlGnBu[9]

var map = d3.select("#chart").append("svg:svg")
  .attr("width", w)
  .attr("height", h)
  //.call(d3.behavior.zoom().on("zoom", redraw))
  .call(initialize);

var india = map.append("svg:g")
  .attr("id", "india");

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);


  function initialize() {
    proj.scale(6700);
    proj.translate([-1240, 720]);
  }
  d3.json("state.json", function (json) {

    var maxTotal = d3.max(json.features, function (d) { return d.total });
  
    var colorScale = d3.scale.quantile()
      .domain(d3.range(buckets).map(function (d) { return (d / buckets) * maxTotal }))
      .range(colors);
  
  
    var y = d3.scale.sqrt()
      .domain([0, 10000])
      .range([0,300]);
  
    var yAxis = d3.svg.axis()
        .scale(y)
        .tickValues(colorScale.domain())
        .orient("right");
  
  
    india.selectAll("path")
      .data(json.features)
      .enter().append("path")
      .attr("d", path)
      .style("fill", colors[0])
      .style("opacity", 0.5)
  
      .on('click', function (d, i) {
        d3.select(this).transition().duration(300).style("opacity", 1);
        div.transition().duration(300)
          .style("opacity", 1)
        div.text(d.id + " : " + d.total)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 30) + "px");
      })
  
      .on('mouseleave', function (d, i) {
        d3.select(this).transition().duration(300)
          .style("opacity", 0.5);
        div.transition().duration(300)
          .style("opacity", 0);
      })
      .on('mouseenter', function (d, i) {
        d3.select(this).transition().duration(300)
          .style("opacity", 0.5);
        div.transition().duration(300)
          .style("opacity", 0);
  
      });
  
    india.selectAll("path").transition().duration(1000)
      .style("fill", function (d) { return colorScale(d.total); });
  
  
  
    //Adding legend for our Choropleth
  
   
    var g = india.append("g")
              .attr("class", "key")
              .attr("transform", "translate(445, 305)")
              .call(yAxis);
  
          g.selectAll("rect")
              .data(colorScale.range().map(function(d, i) {
                  return {
                      y0: i ? y(colorScale.domain()[i - 1]) : y.range()[0],
                      y1: i < colorScale.domain().length ? y(colorScale.domain()[i]) : y.range()[1],
                      z: d
                  };
              }))
              .enter().append("rect")
                  .attr("width", 7)
                  .attr("y", function(d) { return d.y0; })
                  .attr("height", function(d) { return d.y1 - d.y0; })
                  .style("fill", function(d) { return d.z; });
  
  
  });

}


