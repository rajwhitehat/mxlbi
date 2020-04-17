function litoPeel(d51,vLitoData,divid){
    var w = 1280,h = 450,rx = w / 3,ry = 300,m0,rotate = 0
    div_height = h;  
    var _div = document.createElement('div');
    _div.id="body";  
    d5.xml("../assets/data/lito-peel/MITresults.svg", "image/svg+xml", function(xml) {
    _div.appendChild(xml.documentElement);  
     d5.select("#svg2").attr("width",w/1.7)
          .attr("height",div_height)
          .attr("background-color","#fff");
  });
  //document.getElementById('content').appendChild(_div);
  divid.appendChild(_div);
  var color = d5.scale.category20b();
  // for(var i = 0; i < 20; i++) {
  // console.log(color(i))
  // }
  
  var colorinternal = d5.scale.linear()
      .domain([0, 1])
      .range(["white", "black"]);
  
  function comparator(a, b) {
      if (a.id.charAt(0)=="D" || a.id.charAt(0)=="r" || b.id.charAt(0)=="D" || b.id.charAt(0)=="r") {
    return d5.descending(a.id, b.id);}
    else {
    return d5.descending(parseInt(a.id), parseInt(b.id));
    }
  }
  
  var cluster = d5.layout.cluster()
      .size([360, ry - 120])
      .sort(comparator);
  
  var diagonal = d5.svg.diagonal.radial()
      .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });
  
  var svg = d5.select(divid).append("div")
      .style("width", w + "px")
      .style("height", div_height + "px");
  
  var vis = svg.append("svg:svg")
      .attr("width", w)
      .attr("height", div_height)
    .append("svg:g")
      .attr("transform", "translate(" + rx + "," + ry/1.35 + ")");
  
  vis.append("svg:path")
      .attr("class", "arc")
      .style('fill', '#fff')
      .attr("d", d5.svg.arc().innerRadius(ry - 120).outerRadius(ry).startAngle(0).endAngle(2 * Math.PI));
      datetext=vis.append("svg:text")
      .text("")
      .attr("y",-h/2.5)
  var i = 0,
      start=0,
      duration=1000,
      hold=1500;
      updateconsensus(i,start)
  
      // datetext=vis.append("svg:text")
      //         .text("")
      //         .attr("y",-h/2.5)
  
 
  
  function updateconsensus(i,delay){
      var t = i*29.3;
  
      if (i+1==vLitoData.length) { t=0; };
  
      var nl=d5.select("#timenow")
          .transition()
          .delay(delay+duration)
          .duration(hold)
          .attr("transform", "translate(" + t + ",40)");
var vCounter=0;
for(vCounter=0;vCounter<vLitoData.length;vCounter++)
{
      //d5.json(jsonfile, function(errors,json) {
      //data2=json
      data2=vLitoData[vCounter];
       nodes = cluster.nodes(data2);       
      //-----------------------------------------------LINKS---------------------------------
  
      link = vis.selectAll("path.link")
  
      ldata = link.data(cluster.links(nodes), function(d){ return (d.source.id,d.target.id);})
  
      //enter
      lines=  ldata.enter().append("svg:path")
        .attr("class", "link")
        .style("stroke","skyblue")
        .style("opacity", 0)
        .attr("d", diagonal);
  
      //update (enter)
      ldata
          .transition()
          .delay(delay)
          .duration(duration)
          .style("opacity", 1);
  
      //update (transition)
      link.data(cluster.links(nodes), function(d){ return (d.source.id,d.target.id);})
          //~ .style("opacity", 0)
          .transition()
          .delay(delay)
          .duration(duration)
          //~ .style("stroke","black")
          .style("opacity", 1)
          .attr("d", diagonal);
  
  
      //exit
      ldata.exit()
      //~ .style("stroke","red")
      .transition()
      .duration(duration)
      .delay(delay)
      .style("opacity", 0)
      .remove();
  
  
      //-----------------------------------------------NODES---------------------------------
  
      node = vis.selectAll("g.node");
  
      ndata=node.data(nodes, function(d){ return d.id;})
  
      //enter
      gs=ndata.enter().append("svg:g")
          .style("opacity", 0)
          .attr("class", "node")
          .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
  
  
    gs.append("svg:text")
        .attr("y", "4")
        .attr("x", function(d) { return d.x < 180 ? 8 : -8; })
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
        .text(function(d) { if (d.id.charAt(0)=="D" || d.id.charAt(0)=="r") { return ""; } else { return d.id; } })
        //~ .text(function(d) {  return d.id; })
  
    gs.append("svg:circle")
      .attr("r", 5)
      .style("fill", function(d) { if (d.id.charAt(0)=="D" || d.id.charAt(0)=="r") { return colorinternal(d.p); } else { return color(d.group); }})
      .style("stroke", function(d) { if (d.id.charAt(0)=="D" || d.id.charAt(0)=="r") { return "black"; } else { return color(d.group); }});
  
      ndata
          .transition()
          .delay(delay)
          .duration(duration)
          .style("opacity", 1);
  
      //update (transition)
      node.data(nodes, function(d){ return d.id;})
          //~ .style("opacity", 0)
          .transition()
          .delay(delay)
          .duration(duration)
          .style("opacity", 1)
          .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
  
      node.data(nodes, function(d){ return d.id;})
          .select("text")
          .transition()
          .delay(delay+duration*.5)
          .duration(duration*.35)
          //~ .attr("y", "8")
          .attr("x", function(d) { return d.x < 180 ? 8 : -8; })
          .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
          .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
  
        node.data(nodes, function(d){ return d.id;})
        .select("circle").transition()
          .delay(delay+duration)
          .duration(hold/2)
          .style("fill", function(d) { if (d.id.charAt(0)=="D" || d.id.charAt(0)=="r") { return colorinternal(d.p); } else { return color(d.group); }})
          //~ .style("stroke", function(d) { if (d.id.charAt(0)=="D" || d.id.charAt(0)=="r") { console.log(jsonfile+","+delay+","+duration); return "black"; } else { return color(d.group); }});
          .style("stroke", function(d) { if (d.id.charAt(0)=="D" || d.id.charAt(0)=="r") { return "black"; } else { return color(d.group); }});
  
  
  
  
      //exit
      ndata.exit()
      .transition()
      .duration(duration)
      .delay(delay)
      .style("opacity", 0)
      .remove()
      ;
  
  
      if (i+1==vLitoData.length) {i=0;};
      //console.log(i,jsonfiles.length);
  
      datetext//.text("")
          .transition()
          .style("size", "20")
          .delay(delay+duration)
          .duration(hold)
          //~ .text(jsonfile)
          .text("")
          .each("end", function() { updateconsensus(i+1,delay) })
  
}
  }
  
  }
  
  function cross(a, b) {
    return a[0] * b[1] - a[1] * b[0];
  }
  
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  