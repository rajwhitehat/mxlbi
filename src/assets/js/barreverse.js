function drawBarReverse(data,divid){
    

    var leftMargin = 50;  // Space to the left of first bar; accomodates y-axis labels
    var rightMargin = 10; // Space to the right of last bar
    var margin = {left: leftMargin, right: rightMargin, top: 10, bottom: 10};
    var barWidth = 30;  // Width of the bars
    var chartHeight = 450;  // Height of chart, from x-axis (ie. y=0)
    var chartWidth = margin.left + data.length * barWidth + margin.right;

    /* This scale produces negative output for negatve input */
    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(data)])
                   .range([0, chartHeight]);

    /*
     * We need a different scale for drawing the y-axis. It needs
     * a reversed range, and a larger domain to accomodate negaive values.
     */
    var yAxisScale = d3.scaleLinear()
                       .domain([d3.min(data), d3.max(data)])
                       .range([chartHeight - yScale(d3.min(data)), 0 ]);

    //var svg = d3.select('#reversechart');
    var drawdivid='#'+divid;
    //document.getElementById(drawdivid).innerHTML='';
   // console.log('-=-=-',drawdivid,document.getElementById('#'+divid))
   d3.select(drawdivid).html('');
    var svg = d3.select(drawdivid);
    svg
        .attr('height', chartHeight + 100)
        .attr('width', chartWidth)
        .style('border', '1px solid');

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d, i) { return margin.left + i * barWidth; })
        .attr("y", function(d, i) { return chartHeight - Math.max(0, yScale(d));})
        .attr("height", function(d) { return Math.abs(yScale(d)); })
        .attr("width", barWidth)
        .style("fill", "grey")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", function(d, i) { return 1 /*- (i * (1/data.length)); */});

    var yAxis = d3.axisLeft(yAxisScale);
    
    svg.append('g')
      .attr('transform', function(d) {
        return 'translate(' + margin.left + ', 0)';
      })
      .call(yAxis);

    /*
    var xScale = d3.scaleLinear()
                    .domain(0, data.length * barWidth)
                    .range(0, chartWidth);

    var xAxis = d3.axisBottom();
    */
    
}