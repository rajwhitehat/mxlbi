
function hipHop(a99,playerlist,chart){
    //console.log(d5);
   // loadv3();
    var m = [150, 20, 20, 20],
        w = 800 - m[1] - m[3],
        h = 584 - m[0] - m[2];
    
    var timeScale = d5.scale.linear().domain([1979,2013]).range([0,650]);
    var pointsScale = d5.scale.linear().domain([0,3500]).range([350,100]);
    var data = [];
    var cachedStats = {};
    
    var vis = d5.select(chart).append("svg:svg")
        .attr("class", "nba")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
      .append("svg:g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
    
    var mentionsList = d5.select("#mentionsList").append("ul");
    var playersList = d5.select(playerlist).append("ul")
    .style('padding', '0')
    
    var yearList = [];
    for(i = 1979; i <= 2013; i++) {
      yearList.push(i);
    }
    
    var toppanel = vis.append("svg:g")
      .attr("class", "toppanel")
      .attr("transform", "translate(0,20)");
    var nametoppanel = toppanel.append("svg:text")
      .attr("font-size", "28px")
      .attr("font-weight", "bold");
    var akatoppanel = toppanel.append("svg:text")
      .attr("y", "25")
      .attr("font-size", "16px")
      .attr("font-weight", "bold");
    var lifetimementionstoppanel = toppanel.append("svg:text")
      .attr("y", "50")
      .attr("font-size", "16px")
      .attr("font-weight", "bold");
    var mentionstoppanel = toppanel.append("svg:text")
      .attr("y", "70")
      .attr("font-size", "16px")
      .attr("font-weight", "bold");
    var pointstoppanel = toppanel.append("svg:text")
      .attr("class", "pointstoppanel")
      .attr("y", "90")
      .attr("font-size", "16px")
      .attr("font-weight", "bold");
    
    vis.append("svg:text")
      .attr("x", "720")
      .attr("y", "230")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .attr("fill", "#ff2f51")
      .text("SEASON");
    vis.append("svg:text")
      .attr("x", "722")
      .attr("y", "242")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .attr("fill", "#ff2f51")
      .text("POINTS");
    
    vis.selectAll(".yearHover").data(yearList)
      .enter().append("rect").attr("class","yearHover")
      .attr("width", "19").attr("height","380").attr("x", function(d) { return timeScale(d) -9; })
      .style("opacity", "0")
      .on("mouseover", function(d) {
        if(cachedStats[d] === undefined) {
    
        } else {
          var yearStats = cachedStats[d];
          mentionstoppanel.text(yearStats.mentions + " MENTIONS IN " + d);
          pointstoppanel.text((yearStats.points ? yearStats.points : 0) + " POINTS IN "+(d-1) + "-" + d + " SEASON");
        }
        d5.select(this).style("opacity", "0.2");
      })
      .on("mouseout", function(d) {
        d5.select(this).transition().duration(200).style("opacity", "0");
      });
    
    function update(playername) {
      vis.selectAll(".years").data([]).exit().remove();
      vis.selectAll(".mentions").data([]).exit().remove();
      vis.selectAll(".pointspath").remove();
      vis.selectAll(".points").remove();
      mentionsList.selectAll(".quote").remove();
      var myData = data.filter(function(d) { return d.key == playername })[0];
      nametoppanel.text(myData.name);
    
      mentionstoppanel.text("");
      pointstoppanel.text("");
    
      akatoppanel.text(myData.aka);
      lifetimementionstoppanel.text(myData.total_mentions + " LIFETIME MENTIONS");
    
      var yearNest = d5.nest().key(function(d) { return d.obj.year; }).sortKeys(d5.ascending);
      var nested = yearNest.entries(myData.mentions);
      cachedStats = {};
      // compute aggregate stats so we can query them easily
      for (var o in nested) {
        var y = nested[o];
        cachedStats[y.key] = {'mentions':y.values.length};
      }
    
      var stats = myData.stats;
      for (var s in stats) {
        var stat = stats[s];
        if(cachedStats[stat.year]) {
          cachedStats[stat.year].points = stat.points;
        } else {
          cachedStats[stat.year] = {'points': stat.points, 'mentions':0};
        }
      }
    
      var years = vis.selectAll(".years")
        .data(nested)
        .enter()
          .append("g")
            .attr("class","years")
            .attr("transform", function(d) { return "translate(" + timeScale(d.key) + ",350)"});
    
      var quoteRow = mentionsList.selectAll(".quote")
        .data(nested)
        .enter()
          .append("div")
            .attr("class", "row quote")
            .style("background-color", function(d,i) {
    
              var f = 10 + (i % 2) * 15;
              return d5.rgb(f,f,f).toString();
            });
    
      var quoteRowHeader = quoteRow.append("div")
        .attr("class", "large-2 columns mentionsYear")
      quoteRowHeader.append("div").attr("class", "bigYear").text(function(d) { return d.key });
      quoteRowHeader.append("span").attr("class", "quoteMentionCount").text(function(d) { return d.values.length + " MENTIONS"; });
      var quoteRowBody = quoteRow.append("div")
        .attr("class", "large-10 columns");
    
      var singleQuote = quoteRowBody.selectAll(".singleQuote").data(function(d) { return d.values;})
        .enter().append("div").attr("class", "singleQuote").append("a").attr("href", function(d) { return "http://rapgenius.com" + d.href })
          .attr("target", "_blank");
    
      singleQuote.append("span").html(function(d) { return d.excerpt });
      singleQuote.append("span").attr("class", "singleQuoteDetail").html(function(d) { return d.title });
    
    
      years.selectAll(".mentions")
        .data(function(d) { return d.values })
        .enter()
          .append("rect")
            .attr("class", "mentions")
            .attr("x", "-4")
            .attr("y", function(d,i) { return i * -10; })
            .attr("height", "8")
            .attr("width", "8")
            .style("fill", "black");
    
    
      var line = d5.svg.line()
      .x(function(d) { return timeScale(d.year); })
      .y(function(d) { return pointsScale(d.points); })
      .interpolate("linear");
    
    vis.append("path").datum(stats)
      .attr("class", "pointspath")
      .attr("d", function(d) { return line(d); })
      .style("stroke", "#ff2f51")
      .style("fill", "none")
      .style("stroke-width", 4);
    
      var points = vis.selectAll(".points")
        .data(stats)
          .enter()
            .append("g")
              .attr("class","points")
              .attr("transform", function(d) {
                return "translate(" + timeScale(d.year) + "," + pointsScale(d.points) + ")"
              });
    
      points.append('circle')
      .attr("cx", "0")
      .attr("cy", "0")
      .attr("r", "5")
      .style("fill", "#eee")
      .style("stroke", "#ff2f51")
      .style("stroke-width", 3);
    }; // /update
    
    var axis = d5.svg.axis().scale(timeScale).tickValues([1980,1985,1990,1995,2000,2005,2010]).tickSize(6)
                .tickFormat(d5.format(".0f"));
    
    var pointsAxis = d5.svg.axis().scale(pointsScale).tickSize(6).orient("right");
    
    vis.append("g")
      .attr("transform", "translate(0,380)")
      .attr("class", "axis")
      .call(axis);
    vis.append("g")
      .attr("transform", "translate(665,0)")
      .attr("class", "pointsAxis")
      .call(pointsAxis);
    
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    d5.json("../assets/data/hip-hop.json", function(json) {
      var playerCells = playersList.selectAll(".players").data(json)
        .enter().append("li")
          .attr("class", "players")
          .style("list-style", "none")
          .style("padding", "5px")
          .classed("kobe", function(d) { return d.key == "kobe" })
          .on("click", function(d)  {
            d5.selectAll(".players").classed('selected', false);
            d5.select(this).classed('selected', true);
            var url = [location.protocol, '//', location.host, location.pathname].join('');
            // this is broken window.history.replaceState(d.key, "",  url + "?player=" + d.key);
            update(d.key);
          });
    
    //   playerCells.append("img").attr("src", function(d) { return "../assets/data/images/" + d.key + ".jpg"; })
    //     .attr("width", "24")
    //     .attr("height", "24");
      playerCells.append("span").text(function(d) { return d.name; });
    
      data = json;
    
      var urlPlayer = getParameterByName("player");
      if(urlPlayer) {
        update(urlPlayer);
      } else {
        d5.select(".kobe").classed('selected', true);
        update("kobe");
      }
    });
    }
    