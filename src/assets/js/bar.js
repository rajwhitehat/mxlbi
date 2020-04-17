function drawBarChart(myData){
let svg = d3.select("#barchart"),
      margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    g.append("g")
    	.attr("class", "x axis");
    
    g.append("g")
    	.attr("class", "y axis");    
    
   
    
    let x = d3.scaleBand()
    	.padding(0.2)
    	.range([0, width]);
    
    let y = d3.scaleLinear()
    	.range([height, 0]);    
    
    function update(myData) {
      x.domain(myData.map(d => d.name));
      y.domain([0, d3.max(myData, d => d.height)]);      
      
      let points = g.selectAll(".point")
      	.data(myData); //update
      
      pointsEnter = points
      	.enter()
      	.append("rect")
      	.attr("class", "point");
      
      points.merge(pointsEnter) //Enter + Update
      	.attr("x", d => x(d.name))
      	.attr("y", d => y(d.height))
      	.attr("width", d => x.bandwidth())
      	.attr("height", d => height - y(d.height))
      
      	.style("fill", "orange");
      
      points.exit()
        .remove();
      
      
      g.select(".x.axis")
      	.call(d3.axisBottom(x))
      	.attr("transform",
              "translate(0, " + height + ")");
      
      g.select(".y.axis")
      	.call(d3.axisLeft(y));      
    }
    
    
    update(myData);
    
    //console.log("w", width, " h", height);
}