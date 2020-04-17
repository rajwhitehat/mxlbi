// function GetChartCSVData(){
//   var data = [{"id":"Vinove","value":"0"}
//     ];

// var newData = { name :"State", children : [] },
//     levels = ["state","district","block","school"];

// data.forEach(function(d){
//     var depthCursor = newData.children;
//     levels.forEach(function( property, depth )
//     {
//         var index;
//         depthCursor.forEach(function(child,i)
//         {
//             if ( d[property] == child.name ) 
//                 index = i;
//         });

//         if ( isNaN(index) ) 
//         {
//             depthCursor.push({name : d[property], children : []});
//             index = depthCursor.length - 1;
//         }

//         depthCursor = depthCursor[index].children;

//         if ( depth === levels.length - 1 )
//         {
//             depthCursor.push({ name : d.name});
//         }
//     });
// });
// return newData;
// }

// function radialChart(d3){
// var svg = d3.select("#radial"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height"),
//     g = svg.append("g").attr("transform", "translate(" + (width / 2 - 15) + "," + (height / 2 + 25) + ")");

// var stratify = d3.stratify()
//     .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

// var tree = d3.cluster()
//     .size([360, 390])
//     .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

// d3.csv("../assets/data/flare.csv", function(error, data) {
//  // d3.json(GetChartCSVData(), function(error, data) {
//   if (error) throw error;

//   var root = tree(stratify(data)
//       .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); }));

//   var link = g.selectAll(".link")
//     .data(root.descendants().slice(1))
//     .enter().append("path")
//       .attr("class", "link")
//       .attr("d", function(d) {
//         return "M" + project(d.x, d.y)
//             + "C" + project(d.x, (d.y + d.parent.y) / 2)
//             + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
//             + " " + project(d.parent.x, d.parent.y);
//       });

//   var node = g.selectAll(".node")
//     .data(root.descendants())
//     .enter().append("g")
//       .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
//       .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; });

//   node.append("circle")
//       .attr("r", 2.5);

//   node.append("text")
//       .attr("dy", ".31em")
//       .attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; })
//       .style("text-anchor", function(d) { return d.x < 180 === !d.children ? "start" : "end"; })
//       .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
//       .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
// });

// function project(x, y) {
//   var angle = (x - 90) / 180 * Math.PI, radius = y;
//   return [radius * Math.cos(angle), radius * Math.sin(angle)];
// }
// }
function radialChart(d3){
    var diameter = 960,
        radius = diameter / 2,
        innerRadius = radius - 120;

    var cluster = d3.cluster()
        .size([360, innerRadius]);

    const line = d3.radialLine()
        .radius(function(d) { return d.y; })
        .angle(function(d) { return d.x / 180 * Math.PI; })
        .curve(d3.curveBundle.beta(0.95));

    var svg = d3.select("#radial").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

    var link = svg.append("g").selectAll(".link"),
        node = svg.append("g").selectAll(".node");

    d3.json("../assets/data/readme-flare-imports.json", function(error, classes) {
        if (error) throw error;

        var root = d3.hierarchy(packageHierarchy(classes), (d) => d.children);

        var links = packageImports(root.descendants());

        console.dir(links);

        cluster(root);

        var nodes = root.descendants();

        link = link
            .data(links)
            .enter().append('path')
            .attr('class', 'link')
            //.merge(edges)
            .attr('d', d => line(d.source.path(d.target)));

        node = node
            .data(nodes.filter(function(n) { return !n.children; }))
            .enter().append("text")
            .attr("class", "node")
            .attr("dy", ".31em")
            .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
            .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
            .text(function(d) { return d.data.key; })
            .on("mouseover", mouseovered)
            .on("mouseout", mouseouted);
    });

  

    d3.select(self.frameElement).style("height", diameter + "px");

    // Lazily construct the package hierarchy from class names.
    function packageHierarchy(classes) {
        var map = {};

        function find(name, data) {
            var node = map[name], i;
            if (!node) {
                node = map[name] = data || {name: name, children: []};
                if (name.length) {
                    node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                    node.parent.children.push(node);
                    node.key = name.substring(i + 1);
                }
            }
            return node;
        }

        classes.forEach(function(d) {
            find(d.name, d);
        });

        return map[""];
    }

    // Return a list of imports for the given array of nodes.
    function packageImports(nodes) {
        var map = {},
            imports = [];

        // Compute a map from name to node.
        nodes.forEach(function(d) {
            map[d.data.name] = d;
        });

        // For each import, construct a link from the source to target node.
        nodes.forEach(function(d) {
            if (d.data.imports) d.data.imports.forEach(function(i) {
                imports.push({source: map[d.data.name], target: map[i]});
            });
        });

        return imports;
    }
    function mouseovered(d) {
        node
            .each(function(n) { n.target = n.source = false; });

        link
            .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
            .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
            .filter(function(l) { return l.target === d || l.source === d; })
            .each(function() { this.parentNode.appendChild(this); });

        node
            .classed("node--target", function(n) { return n.target; })
            .classed("node--source", function(n) { return n.source; });
    }

    function mouseouted(d) {
        console.log("moouseout");
        link
            .classed("link--target", false)
            .classed("link--source", false);

        node
            .classed("node--target", false)
            .classed("node--source", false);
    }
}
