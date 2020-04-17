function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["nations.json",new URL("../data/facebookData.json", 'http://localhost:4200/assets/data/facebookData.json')]]);
  console.log(fileAttachments);

  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md``
)});
  main.variable(observer("viewof year")).define("viewof year", ["Scrubber","d3"], function(Scrubber,d3){return(
Scrubber(d3.range(1800, 2010, 0.1), {format: Math.floor, loop: false})
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

span.observablehq--function.observablehq--inspect {
  display: none;
}

span.observablehq--inspect {
  display: none;
}

</style><div style="display: flex; align-items: center; min-height: 33px; font: 10px sans-serif; margin-left: ${margin.left}px;"><div>${color.domain().map(region => html`<span class="${id}" style="--color: ${color(region)}">${document.createTextNode(region)}</span>`)}`;
}
);
  main.variable(observer("chart")).define("chart", ["d3","width","height","xAxis","yAxis","grid","dataAt","x","y","radius","color"], function(d3,width,height,xAxis,yAxis,grid,dataAt,x,y,radius,color)
{
  const svg = d3.create("svg")
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
      .sort((a, b) => d3.descending(a.population, b.population))
      .attr("cx", d => x(d.income))
      .attr("cy", d => y(d.lifeExpectancy))
      .attr("r", d => radius(d.population))
      .attr("fill", d => color(d.region))
      .call(circle => circle.append("title")
        .text(d => [d.name, d.region].join("\n")));

  return Object.assign(svg.node(), {
    update(data) {
      circle.data(data, d => d.name)
          .sort((a, b) => d3.descending(a.population, b.population))
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
  main.variable(observer("x")).define("x", ["d3","margin","width"], function(d3,margin,width){return(
d3.scaleLog([200, 1e5], [margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear([14, 86], [height - margin.bottom, margin.top])
)});
  main.variable(observer("radius")).define("radius", ["d3","width"], function(d3,width){return(
d3.scaleSqrt([0, 5e8], [0, width / 24])
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal(data.map(d => d.region), d3.schemeCategory10).unknown("black")
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width"], function(height,margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80, ","))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Income per capita (dollars) →"))
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y"], function(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
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
  main.variable(observer("bisectYear")).define("bisectYear", ["d3"], function(d3){return(
d3.bisector(([year]) => year).left
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 20, bottom: 35, left: 40}
)});
  main.variable(observer("height")).define("height", function(){return(
560
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  return main;
}
















function define1(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Scrubber

This reusable input is intended to drive animations while providing the reader interactive control on demand: the animation pauses when the user interacts with the slider, but can be resumed by clicking the play button.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`To use in your notebook:

~~~js
import {Scrubber} from "@mbostock/scrubber"
~~~
`
)});
  main.variable(observer("viewof i")).define("viewof i", ["Scrubber","numbers"], function(Scrubber,numbers){return(
Scrubber(numbers)
)});
  main.variable(observer("i")).define("i", ["Generators", "viewof i"], (G, _) => G.input(_));
  main.variable(observer("numbers")).define("numbers", function(){return(
Array.from({length: 256}, (_, i) => i)
)});
  main.variable(observer()).define(["md","i"], function(md,i){return(
md`The current value of *i* is ${i}.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Given an array of *values* representing the discrete frames of the animation, such as an array of numbers or dates, Scrubber returns a [view-compatible input](/@observablehq/introduction-to-views). (More precisely, it returns a [disposable generator](/@observablehq/invalidation) so that the animation stops automatically on invalidation.)`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Options

Scrubber has several options which you can pass as the second argument.`
)});
  main.variable(observer("autoplay")).define("autoplay", ["md"], function(md){return(
md`The *autoplay* option, which defaults to true, specifies whether the animation plays automatically. Set it to false to require the reader to click on the play button.`
)});
  main.variable(observer()).define(["Scrubber","numbers"], function(Scrubber,numbers){return(
Scrubber(numbers, {autoplay: false})
)});
  main.variable(observer("loop")).define("loop", ["md"], function(md){return(
md`The *loop* option, which defaults to true, specifies whether the animation should automatically restart from the beginning after the end is reached. Set it to false to require the reader to click the play button to restart the animation after it ends.`
)});
  main.variable(observer()).define(["Scrubber","numbers"], function(Scrubber,numbers){return(
Scrubber(numbers, {loop: false})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The *alternate* option, which defaults to false, specifies whether the animation should reverse direction when it reaches the end, rather than repeat from the start.`
)});
  main.variable(observer()).define(["Scrubber","numbers"], function(Scrubber,numbers){return(
Scrubber(numbers, {loop: false, alternate: true})
)});
  main.variable(observer("delay")).define("delay", ["md"], function(md){return(
md`The *delay* option, which defaults to null, specifies how long to wait between frames in milliseconds. A null value means to use [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), which typically means sixty times per second (about 17ms). Non-null delays use [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval).`
)});
  main.variable(observer()).define(["Scrubber"], function(Scrubber){return(
Scrubber(["red", "green", "blue"], {delay: 1000})
)});
  main.variable(observer("format")).define("format", ["md"], function(md){return(
md`The *format* option, which defaults to the identity function, specifies how to display the currently-selected value. The *format* function is passed the current value, the current (zero-based) index, and the values array.`
)});
  main.variable(observer("dates")).define("dates", function(){return(
Array.from({length: 365}, (_, i) => {
  const date = new Date(2019, 0, 1);
  date.setDate(i + 1);
  return date;
})
)});
  main.variable(observer("viewof date")).define("viewof date", ["Scrubber","dates"], function(Scrubber,dates){return(
Scrubber(dates, {
  autoplay: false,
  format: date => date.toLocaleString("en", {month: "long", day: "numeric"})
})
)});
  main.variable(observer("date")).define("date", ["Generators", "viewof date"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`If you have suggestions for other options you’d like to see, please let me know!`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Implementation`
)});
  main.variable(observer("Scrubber")).define("Scrubber", ["html","Generators"], function(html,Generators){return(
function Scrubber(values, {
  format = value => value,
  delay = null,
  autoplay = false,
  loop = true,
  alternate = false
} = {}) {
  values = Array.from(values);
  const form = html`<form style="font: 12px var(--sans-serif); display: flex; height: 33px; align-items: center;">
  <button name=b type=button style="margin-right: 0.4em; width: 5em;"></button>
  <label style="display: flex; align-items: center;">
    <input name=i type=range min=0 max=${values.length - 1} value=0 step=1 style="width: 180px;">
    <output name=o style="margin-left: 0.4em;"></output>
  </label>
</form>`;
  let timer = null;
  let direction = 1;
  function start() {
    form.b.textContent = "Pause";
    timer = delay === null
      ? requestAnimationFrame(tick)
      : setInterval(tick, delay);
  }
  function stop() {
    form.b.textContent = "Play";
    if (delay === null) cancelAnimationFrame(timer);
    else clearInterval(timer);
    timer = null;
  }
  function tick() {
    if (delay === null) timer = requestAnimationFrame(tick);
    if (form.i.valueAsNumber === (direction > 0 ? values.length - 1 : direction < 0 ? 0 : NaN)) {
      if (!loop) return stop();
      if (alternate) direction = -direction;
    }
    form.i.valueAsNumber = (form.i.valueAsNumber + direction + values.length) % values.length;
    form.i.dispatchEvent(new CustomEvent("input", {bubbles: true}));
  }
  form.i.oninput = event => {
    if (event && event.isTrusted && timer) form.b.onclick();
    form.value = values[form.i.valueAsNumber];
    form.o.value = format(form.value, form.i.valueAsNumber, values);
  };
  form.b.onclick = () => {
    if (timer) return stop();
    direction = alternate && form.i.valueAsNumber === values.length - 1 ? -1 : 1;
    form.i.valueAsNumber = (form.i.valueAsNumber + direction) % values.length;
    form.i.dispatchEvent(new CustomEvent("input", {bubbles: true}));
    start();
  };
  form.i.oninput();
  if (autoplay) start();
  else stop();
  return Generators.disposable(form, stop);
}
)});
  return main;
}
