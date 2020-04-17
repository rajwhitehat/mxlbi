// https://observablehq.com/@zazu/mouseover-chord-diagram@175
function chords(runtime, observer) {
    const main = runtime.module();
    main.variable(observer()).define(["md"], function(md){return(
  md``
  )});
    main.variable(observer("chart")).define("chart", ["d3","width","height","chord","data","color","arc","innerRadius","ribbon"], function(d3,width,height,chord,data,color,arc,innerRadius,ribbon)
  {
    const svg = d3.create("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .style("width", "100%")
        .style("height", "auto");
  
    const chords = chord(data.matrix);
  
    const group = svg.append("g")
      .selectAll("g")
      .data(chords.groups)
      .join("g");
  
    function onMouseOver(selected) {
      group
        .filter( d => d.index !== selected.index)
        .style("opacity", 0.3);
  
      svg.selectAll(".chord")
        .filter( d => d.source.index !== selected.index)
        .style("opacity", 0.3);
    }
  
    function onMouseOut() {
      group.style("opacity", 1);
      svg.selectAll(".chord")
        .style("opacity", 1);
    }
  
    group.append("path")
        .attr("fill", d => color(d.index))
        .attr("stroke", d => color(d.index))
        .attr("d", arc)
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut);
  
    group.append("text")
        .each(d => { d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr("dy", ".35em")
        .attr("transform", d => `
          rotate(${(d.angle * 180 / Math.PI - 90)})
          translate(${innerRadius + 26})
          ${d.angle > Math.PI ? "rotate(180)" : ""}
        `)
        .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
        .text(d => data.nameByIndex.get(d.index));
  
    svg.append("g")
        .attr("fill-opacity", 0.67)
      .selectAll("path")
      .data(chords)
      .join("path")
        .attr("class", "chord")
        .attr("stroke", d => d3.rgb(color(d.source.index)).darker())
        .attr("fill", d => color(d.source.index))
        .attr("d", ribbon)
        .on("mouseover", d => onMouseOver(d.source))
        .on("mouseout", d => onMouseOut(d.source));
  
  
  
    return svg.node();
  }
  );
    main.variable(observer("data")).define("data", ["d3"], async function(d3)
  {
    const imports = await d3.json("https://www.rblumenthal.de/polyvisdata.php?f=chorddata");
    // const imports = await d3.json("../files/chorddata.json")
    // const imports = await FileAttachment("../files/chorddata").json();
  
    const indexByName = new Map;
    const nameByIndex = new Map;
    const matrix = [];
    let n = 0;
  
    // Returns the Flare package name for the given class name.
    function name(name) {
      return name;//.substring(0, name.lastIndexOf(".")).substring(6);
    }
  
    // Compute a unique index for each package name.
    imports.forEach(d => {
      if (!indexByName.has(d = name(d.name))) {
        nameByIndex.set(n, d);
        indexByName.set(d, n++);
      }
    });
  
    // Construct a square matrix counting package imports.
    imports.forEach(d => {
      const source = indexByName.get(name(d.name));
      let row = matrix[source];
      if (!row) row = matrix[source] = Array.from({length: n}).fill(0);
      d.imports.forEach(d => row[indexByName.get(name(d))]++);
    });
  
    return {
      matrix,
      indexByName,
      nameByIndex
    };
  }
  );
    main.variable(observer("chord")).define("chord", ["d3"], function(d3){return(
  d3.chord()
      .padAngle(.02)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending)
  )});
    main.variable(observer("arc")).define("arc", ["d3","innerRadius"], function(d3,innerRadius){return(
  d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(innerRadius + 20)
  )});
    main.variable(observer("ribbon")).define("ribbon", ["d3","innerRadius"], function(d3,innerRadius){return(
  d3.ribbon()
      .radius(innerRadius)
  )});
    main.variable(observer("color")).define("color", ["d3"], function(d3){return(
  d3.scaleOrdinal(d3.schemeCategory10)
  )});
    main.variable(observer("outerRadius")).define("outerRadius", ["width","height"], function(width,height){return(
  Math.min(width, height) * 0.5
  )});
    main.variable(observer("innerRadius")).define("innerRadius", ["outerRadius"], function(outerRadius){return(
  outerRadius - 124
  )});
    main.variable(observer("width")).define("width", function(){return(
  964
  )});
    main.variable(observer("height")).define("height", ["width"], function(width){return(
  width
  )});
    main.variable(observer("d3")).define("d3", ["require"], function(require){return(
  require("d3@5")
  )});
    return main;
  }
  