var sortOrder = [];


function callDataChord(d3,data, colors, sortOrders) {
    function sort(a, b) { return this.d3.ascending(sortOrder.indexOf(a), sortOrder.indexOf(b)); }
  
    sortOrder = sortOrders;

    var ch = viz.ch().data(data)
        .padding(.02)
        .sort(sort)
        .innerRadius(230)
        .outerRadius(250)
        .duration(1000)
        .chordOpacity(0.3)
        .labelPadding(.10)
        .fill(function (d) { return colors[d]; });

    var width = 1800, height = 1800;
//chordChart
    //var svg = this.d3.select("body").append("svg").attr("height", height).attr("width", width);
    var svg = this.d3.select(".chordChart").append("svg").attr("height", height).attr("width", width);
    // var svg = d3.select("#chordChart").append("svg").attr("height", height).attr("width", width);
//"#ChordChart"

    // svg.append("g").attr("transform", "translate(600,320)").call(ch);
    svg.append("g").attr("transform", "translate(600,420)").call(ch);
    // adjust height of frame in bl.ocks.org
    this.d3.select(self.frameElement).style("height", height + "px").style("width", width + "px");
}