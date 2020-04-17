// https://observablehq.com/@mbostock/the-wealth-health-of-nations@175
import define1 from "./450051d7f1174df8@186.js";

export default function define(runtime, observer) {
  const main = runtime.module();

  const fileAttachments = new Map([["nations.json",new URL("../assets/data/nations.json",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# The Wealth & Health of Nations

This is a recreation of a [Gapminder visualization](http://gapminder.org/world/) made famous by [Hans Rosling](https://www.ted.com/talks/hans_rosling_the_best_stats_you_ve_ever_seen). It shows per-capita income (*x*), life expectancy (*y*) and population (*area*) of 180 nations over the last 209 years, colored by region. Data prior to 1950 is sparse, so this chart uses [bisection](https://en.wikipedia.org/wiki/Binary_search_algorithm) and [linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation) to fill in missing data points.`
)});

  main.variable(observer("viewof year")).define("viewof year", ["Scrubber","d1"], function(Scrubber,d3){return(
Scrubber(d1.range(1800, 2010, 0.1), {format: Math.floor, loop: false})
)});

  main.variable(observer("year")).define("year", ["Generators", "viewof year"], (G, _) => G.input(_));
  main.variable(observer("legend")).define("legend", ["DOM","html","margin","color"], function(DOM,html,margin,color)
{
  const id = DOM.uid().id;
  return html`<style>

.${id} {
  display: inline-flex;
  align-items: center;
  margin-right: 1em;
}

.${id}::before {
  content: "";
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  background: var(--color);
}

</style><div style="display: flex; align-items: center; min-height: 33px; font: 10px sans-serif; margin-left: ${margin.left}px;"><div>${color.domain().map(region => html`<span class="${id}" style="--color: ${color(region)}">${document.createTextNode(region)}</span>`)}`;
}
);
  main.variable(observer("chart")).define("chart", ["d1","width","height","xAxis","yAxis","grid","dataAt","x","y","radius","color"], function(d1,width,height,xAxis,yAxis,grid,dataAt,x,y,radius,color)
{
  const svg = d1.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
      .call(grid);

  const circle = svg.append("g")
      .attr("stroke", "black")
    .selectAll("circle")
    .data(dataAt(1800), d => d.name)
    .join("circle")
      .sort((a, b) => d1.descending(a.population, b.population))
      .attr("cx", d => x(d.income))
      .attr("cy", d => y(d.lifeExpectancy))
      .attr("r", d => radius(d.population))
      .attr("fill", d => color(d.region))
      .call(circle => circle.append("title")
        .text(d => [d.name, d.region].join("\n")));

  return Object.assign(svg.node(), {
    update(data) {
      circle.data(data, d => d.name)
          .sort((a, b) => d1.descending(a.population, b.population))
          .attr("cx", d => x(d.income))
          .attr("cy", d => y(d.lifeExpectancy))
          .attr("r", d => radius(d.population));
    }
  });
}
);
  main.variable(observer()).define(["chart","currentData"], function(chart,currentData){return(
chart.update(currentData)
)});
  main.variable(observer("currentData")).define("currentData", ["dataAt","year"], function(dataAt,year){return(
dataAt(year)
)});
  main.variable(observer("x")).define("x", ["d1","margin","width"], function(d1,margin,width){return(
d1.scaleLog([200, 1e5], [margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d1","height","margin"], function(d1,height,margin){return(
d1.scaleLinear([14, 86], [height - margin.bottom, margin.top])
)});
  main.variable(observer("radius")).define("radius", ["d1","width"], function(d1,width){return(
d1.scaleSqrt([0, 5e8], [0, width / 24])
)});
  main.variable(observer("color")).define("color", ["d1","data"], function(d1,data){return(
d1.scaleOrdinal(data.map(d => d.region), d1.schemeCategory10).unknown("black")
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d1","x","width"], function(height,margin,d1,x,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d1.axisBottom(x).ticks(width / 80, ","))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Income per capita (dollars) →"))
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d1","y"], function(margin,d1,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d1.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Life expectancy (years)"))
)});
  main.variable(observer("grid")).define("grid", ["x","margin","height","y","width"], function(x,margin,height,y,width){return(
g => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g.append("g")
      .selectAll("line")
      .data(x.ticks())
      .join("line")
        .attr("x1", d => 0.5 + x(d))
        .attr("x2", d => 0.5 + x(d))
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom))
    .call(g => g.append("g")
      .selectAll("line")
      .data(y.ticks())
      .join("line")
        .attr("y1", d => 0.5 + y(d))
        .attr("y2", d => 0.5 + y(d))
        .attr("x1", margin.left)
        .attr("x2", width - margin.right))
)});
  main.variable(observer("dataAt")).define("dataAt", ["data","valueAt"], function(data,valueAt){return(
function dataAt(year) {
  return data.map(d => ({
    name: d.name,
    region: d.region,
    income: valueAt(d.income, year),
    population: valueAt(d.population, year),
    lifeExpectancy: valueAt(d.lifeExpectancy, year)
  }));
}
)});
  main.variable(observer("valueAt")).define("valueAt", ["bisectYear"], function(bisectYear){return(
function valueAt(values, year) {
  const i = bisectYear(values, year, 0, values.length - 1);
  const a = values[i];
  if (i > 0) {
    const b = values[i - 1];
    const t = (year - a[0]) / (b[0] - a[0]);
    return a[1] * (1 - t) + b[1] * t;
  }
  return a[1];
}
)});
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("nations.json").json()
)});
  main.variable(observer("bisectYear")).define("bisectYear", ["d1"], function(d1){return(
d1.bisector(([year]) => year).left
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 20, bottom: 35, left: 40}
)});
  main.variable(observer("height")).define("height", function(){return(
560
)});
  main.variable(observer("d1")).define("d1", ["require"], function(require){return(
require("d3@5")
)});
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  return main;
}
