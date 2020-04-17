function loadScrollableBarChart(){
  var data=[{"key":"NOKIA","interactions":276200,"unique_authors":141400,"topic":"MOBILE HAND SETS"},
  {"key":"SONY","interactions":28000,"unique_authors":25400,"topic":"MOBILE HAND SETS"},
  {"key":"LG","interactions":27300,"unique_authors":26100,"topic":"MOBILE HAND SETS"},
  {"key":"SAMSUNG","interactions":26500,"unique_authors":26500,"topic":"MOBILE HAND SETS"},
  {"key":"Vivo","interactions":13800,"unique_authors":13800,"topic":"MOBILE HAND SETS"},
  {"key":"LG","interactions":10900,"unique_authors":10500,"topic":"COLOUR TELEVISION"},
  {"key":"MI","interactions":10800,"unique_authors":10300,"topic":"COLOUR TELEVISION"},
  {"key":"SAMSUNG","interactions":9600,"unique_authors":9200,"topic":"COLOUR TELEVISION"},
  {"key":"SONY","interactions":9000,"unique_authors":9000,"topic":"COLOUR TELEVISION"}];
  
    //var data = [{"key":"Brand1","interactions":276200,"unique_authors":141400,"topic":"BMW"},{"key":"Brand2","interactions":28000,"unique_authors":25400,"topic":"BMW"},{"key":"Brand3","interactions":27300,"unique_authors":26100,"topic":"BMW"},{"key":"Brand4","interactions":26500,"unique_authors":26500,"topic":"BMW"},{"key":"Brand5","interactions":13800,"unique_authors":13800,"topic":"BMW"},{"key":"Brand6","interactions":10900,"unique_authors":10500,"topic":"BMW"},{"key":"Brand7","interactions":10800,"unique_authors":10300,"topic":"BMW"},{"key":"Brand8","interactions":9600,"unique_authors":9200,"topic":"BMW"},{"key":"Brand9","interactions":9000,"unique_authors":9000,"topic":"BMW"},{"key":"Brand10","interactions":8300,"unique_authors":5600,"topic":"BMW"},{"key":"Brand2","interactions":27900,"unique_authors":25400,"topic":"Cars"},{"key":"Brand6","interactions":10900,"unique_authors":10500,"topic":"Cars"},{"key":"Brand11","interactions":4500,"unique_authors":4300,"topic":"Cars"},{"key":"Brand12","interactions":4300,"unique_authors":3900,"topic":"Cars"},{"key":"Brand13","interactions":4300,"unique_authors":3500,"topic":"Cars"},{"key":"Brand14","interactions":4100,"unique_authors":3300,"topic":"Cars"},{"key":"Brand15","interactions":3900,"unique_authors":3600,"topic":"Cars"},{"key":"Brand16","interactions":3700,"unique_authors":2500,"topic":"Cars"},{"key":"Brand17","interactions":2900,"unique_authors":2700,"topic":"Cars"},{"key":"Brand18","interactions":2900,"unique_authors":2400,"topic":"Cars"},{"key":"Brand19","interactions":7000,"unique_authors":6700,"topic":"Honda Civic"},{"key":"Brand20","interactions":6600,"unique_authors":6100,"topic":"Honda Civic"},{"key":"Brand21","interactions":4100,"unique_authors":3900,"topic":"Honda Civic"},{"key":"Brand22","interactions":3300,"unique_authors":3100,"topic":"Honda Civic"},{"key":"Brand23","interactions":2800,"unique_authors":2600,"topic":"Honda Civic"},{"key":"Brand24","interactions":2600,"unique_authors":2600,"topic":"Honda Civic"},{"key":"Brand25","interactions":2200,"unique_authors":2100,"topic":"Honda Civic"},{"key":"Brand26","interactions":2100,"unique_authors":2100,"topic":"Honda Civic"},{"key":"Brand27","interactions":1800,"unique_authors":1800,"topic":"Honda Civic"},{"key":"Brand28","interactions":1700,"unique_authors":1600,"topic":"Honda Civic"},{"key":"Brand29","interactions":13600,"unique_authors":13600,"topic":"Ford Mustang"},{"key":"Brand30","interactions":12600,"unique_authors":11200,"topic":"Ford Mustang"},{"key":"Brand31","interactions":8800,"unique_authors":8700,"topic":"Ford Mustang"},{"key":"Brand32","interactions":7200,"unique_authors":7200,"topic":"Ford Mustang"},{"key":"Brand33","interactions":7100,"unique_authors":6500,"topic":"Ford Mustang"},{"key":"Brand34","interactions":6100,"unique_authors":5800,"topic":"Ford Mustang"},{"key":"Brand35","interactions":4900,"unique_authors":4500,"topic":"Ford Mustang"},{"key":"Brand11","interactions":4500,"unique_authors":4300,"topic":"Ford Mustang"},{"key":"Brand12","interactions":4300,"unique_authors":3900,"topic":"Ford Mustang"},{"key":"Brand13","interactions":4300,"unique_authors":3500,"topic":"Ford Mustang"},{"key":"Brand36","interactions":7400,"unique_authors":7300,"topic":"Ford Motor Company"},{"key":"Brand37","interactions":7200,"unique_authors":7100,"topic":"Ford Motor Company"},{"key":"Brand32","interactions":7200,"unique_authors":7200,"topic":"Ford Motor Company"},{"key":"Brand38","interactions":3400,"unique_authors":3000,"topic":"Ford Motor Company"},{"key":"Brand39","interactions":3000,"unique_authors":2900,"topic":"Ford Motor Company"},{"key":"Brand40","interactions":2800,"unique_authors":2700,"topic":"Ford Motor Company"},{"key":"Brand41","interactions":2800,"unique_authors":2700,"topic":"Ford Motor Company"},{"key":"Brand42","interactions":2700,"unique_authors":2700,"topic":"Ford Motor Company"},{"key":"Brand423","interactions":2700,"unique_authors":2700,"topic":"Ford Motor Company"},{"key":"Brand44","interactions":2600,"unique_authors":2500,"topic":"Ford Motor Company"}];
    /*var data=[
        {"key":"Brand1","interactions":276200,"unique_authors":141400,"topic":"BMW"},
        {"key":"Brand2","interactions":28000,"unique_authors":25400,"topic":"BMW"},
        {"key":"Brand3","interactions":27300,"unique_authors":26100,"topic":"BMW"},
        {"key":"Brand4","interactions":26500,"unique_authors":26500,"topic":"BMW"},
        {"key":"Brand5","interactions":13800,"unique_authors":13800,"topic":"BMW"},
        {"key":"Brand6","interactions":10900,"unique_authors":10500,"topic":"BMW"},
        {"key":"Brand7","interactions":10800,"unique_authors":10300,"topic":"BMW"},
        {"key":"Brand8","interactions":9600,"unique_authors":9200,"topic":"BMW"},
        {"key":"Brand9","interactions":9000,"unique_authors":9000,"topic":"BMW"},
        {"key":"Brand10","interactions":8300,"unique_authors":5600,"topic":"BMW"},
        {"key":"Brand2","interactions":27900,"unique_authors":25400,"topic":"Cars"},
        {"key":"Brand6","interactions":10900,"unique_authors":10500,"topic":"Cars"},
        {"key":"Brand11","interactions":4500,"unique_authors":4300,"topic":"Cars"},
        {"key":"Brand12","interactions":4300,"unique_authors":3900,"topic":"Cars"},
        {"key":"Brand13","interactions":4300,"unique_authors":3500,"topic":"Cars"},
        {"key":"Brand14","interactions":4100,"unique_authors":3300,"topic":"Cars"},
        {"key":"Brand15","interactions":3900,"unique_authors":3600,"topic":"Cars"},
        {"key":"Brand16","interactions":3700,"unique_authors":2500,"topic":"Cars"},
        {"key":"Brand17","interactions":2900,"unique_authors":2700,"topic":"Cars"},
        {"key":"Brand18","interactions":2900,"unique_authors":2400,"topic":"Cars"},
        {"key":"Brand19","interactions":7000,"unique_authors":6700,"topic":"Honda Civic"},
        {"key":"Brand20","interactions":6600,"unique_authors":6100,"topic":"Honda Civic"},
        {"key":"Brand21","interactions":4100,"unique_authors":3900,"topic":"Honda Civic"},
        {"key":"Brand22","interactions":3300,"unique_authors":3100,"topic":"Honda Civic"},
        {"key":"Brand23","interactions":2800,"unique_authors":2600,"topic":"Honda Civic"},
        {"key":"Brand24","interactions":2600,"unique_authors":2600,"topic":"Honda Civic"},
        {"key":"Brand25","interactions":2200,"unique_authors":2100,"topic":"Honda Civic"},
        {"key":"Brand26","interactions":2100,"unique_authors":2100,"topic":"Honda Civic"},
        {"key":"Brand27","interactions":1800,"unique_authors":1800,"topic":"Honda Civic"},
        {"key":"Brand28","interactions":1700,"unique_authors":1600,"topic":"Honda Civic"},
        {"key":"Brand29","interactions":13600,"unique_authors":13600,"topic":"Ford Mustang"},
        {"key":"Brand30","interactions":12600,"unique_authors":11200,"topic":"Ford Mustang"},
        {"key":"Brand31","interactions":8800,"unique_authors":8700,"topic":"Ford Mustang"},
        {"key":"Brand32","interactions":7200,"unique_authors":7200,"topic":"Ford Mustang"},
        {"key":"Brand33","interactions":7100,"unique_authors":6500,"topic":"Ford Mustang"},
        {"key":"Brand34","interactions":6100,"unique_authors":5800,"topic":"Ford Mustang"},
        {"key":"Brand35","interactions":4900,"unique_authors":4500,"topic":"Ford Mustang"},
        {"key":"Brand11","interactions":4500,"unique_authors":4300,"topic":"Ford Mustang"},
        {"key":"Brand12","interactions":4300,"unique_authors":3900,"topic":"Ford Mustang"},
        {"key":"Brand13","interactions":4300,"unique_authors":3500,"topic":"Ford Mustang"},
        {"key":"Brand36","interactions":7400,"unique_authors":7300,"topic":"Ford Motor Company"},
        {"key":"Brand37","interactions":7200,"unique_authors":7100,"topic":"Ford Motor Company"},
        {"key":"Brand32","interactions":7200,"unique_authors":7200,"topic":"Ford Motor Company"},
        {"key":"Brand38","interactions":3400,"unique_authors":3000,"topic":"Ford Motor Company"},
        {"key":"Brand39","interactions":3000,"unique_authors":2900,"topic":"Ford Motor Company"},
        {"key":"Brand40","interactions":2800,"unique_authors":2700,"topic":"Ford Motor Company"},
        {"key":"Brand41","interactions":2800,"unique_authors":2700,"topic":"Ford Motor Company"},
        {"key":"Brand42","interactions":2700,"unique_authors":2700,"topic":"Ford Motor Company"},
        {"key":"Brand423","interactions":2700,"unique_authors":2700,"topic":"Ford Motor Company"},
        {"key":"Brand44","interactions":2600,"unique_authors":2500,"topic":"Ford Motor Company"}];
*/

var xf = crossfilter(data);

var topic = xf.dimension(function (d) { return d.topic; }),
    topics = topic.group().reduce(
      function (p, v) { if (!p[v.key]) p[v.key] = 0; p[v.key] += v.interactions; return p; },
      function (p, v) { if (!p[v.key]) p[v.key] = 0; p[v.key] -= v.interactions; return p; },
      function () { return {}; }
    )

var dispatch = d5.dispatch('redraw');
drawHorizontalBars('#chart', dispatch, topic, topics)
dispatch.redraw();

function drawHorizontalBars (selector, dispatch, dimension, group) {
  var margin = {top: 20, right: 20, bottom: 0, left: 100},
    width = 940 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;

  var leftSpacing = 200;

  var color = d5.scale.category20();

  var t = d5.transition()
        .duration(750);
  var x = d5.scale.linear()
      .range([0, width - leftSpacing]);

  var y = d5.scale.ordinal()
      .rangeRoundBands([0, height], 0.1);

  var xAxis = d5.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(7)

  var yAxis = d5.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(0)

  var svg = d5.select(selector).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxisSvg = d5.select('#xaxis').append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", 20)
    .append("g")
      // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  dispatch.on('redraw.' + selector, function () {
    var data = group.all()
    var arr = []
    data.forEach(function(d) {
      d.arr = []
      var obj = d.value;
      for (var i in obj) {
        arr.push(obj[i])
        d.arr.push({
          topic: d.key,
          link: i,
          interactions: obj[i]
        })
      }
    })
    var domain = [0, d5.max(arr)]
    x.domain(domain).nice();
    y.domain(data.map(function(d) { return d.key; }));

    var cont = svg.append('g').attr('style', 'overflow:auto;')

    var g = cont.selectAll("g.topic")
        .data(data).enter().append('g')
          .attr('class', 'topic')
          .attr("transform", function (d) { return "translate(0," + y(d.key) + ")" })

    var bars = g.selectAll('.bar')
      .data(function (d) { return d.arr })
        .enter().append('rect')
          .attr('class', 'bar')

    var y1 = d5.scale.ordinal()
        .rangeRoundBands([0, y.rangeBand()], 0.1)
        .domain([0,1,2,3,4,5,6,7,8,9]);

    bars
        .attr('fill', function (d) { return color(d.topic)})
        .attr("x", function(d) { return leftSpacing; })
        .attr("y", function(d, i) { return y1(i); })
        .attr("height", y1.rangeBand())
        .attr("width", function(d) { return Math.abs(x(d.interactions)) - x(leftSpacing); })

    var texts = g.selectAll('text.link')
      .data(function (d) { return d.arr })
        .enter().append('text')
          .attr('class', 'link')

    texts
        .attr("x", function (d, i) { return 10 })
        .attr("y", function (d, i) { return y1(i) + (y1.rangeBand() / 2) })
        .attr('dy', '.35em')
        .text(function (d) { return d.link.substring(0, (leftSpacing / 5.3)) })
        .on('click', function (d) { window.open(d.link, '_blank'); })

    var xAxisDom = xAxisSvg.selectAll('.x.axis')
    if (xAxisDom.empty()) {
      xAxisDom = xAxisSvg.append("g")
        .attr("class", "x axis")
    }
    xAxisDom
      .attr("transform", "translate("+ (leftSpacing + margin.left) +"," + 1 + ")")
      .call(xAxis);

    xAxisDom
      .selectAll('.tick text')
      .text(function (d) { if (d < 0) return -d; else return d; })

    var yAxisDom = svg.selectAll('.y.axis')
    if (yAxisDom.empty()) {
      yAxisDom = svg.append("g")
        .attr("class", "y axis")
    }
    yAxisDom
     .transition(t)
        .attr("transform", "translate(" + x(0) + ",0)")
        .call(yAxis);
  });
}
}