(function () {
    packages = {

        // Lazily construct the package hierarchy from class names.
        root: function (classes) {
            var map = {};

            function find(name, data) {
                var node = map[name], i;
                if (!node) {
                    node = map[name] = data || { name: name, children: [] };
                    if (name.length) {
                        node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                        node.parent.children.push(node);
                        node.key = name.substring(i + 1);
                    }
                }
                return node;
            }

            classes.forEach(function (d) {
                find(d.name, d);
            });

            return map[""];
        },

        // Return a list of imports for the given array of nodes.
        imports: function (nodes) {
            var map = {},
                imports = [];

            // Compute a map from name to node.
            nodes.forEach(function (d) {
                map[d.data.name] = d;
            });

            // For each import, construct a link from the source to target node.
            nodes.forEach(function (d) {
                if (d.data.imports) d.data.imports.forEach(function (i) {
                    imports.push({ source: map[d.data.name], target: map[i] });
                });
            });

            return imports;
        }

    };
})();


function onCall() {
    var cluster = d3.layout.cluster()
        .size([360, 960 / 2 - 120])
        .sort(null)
        .value(function (d) { return d.size; });

    var bundle = d3.layout.bundle();

    var line = d3.svg.line.radial()
        .interpolate("bundle")
        .tension(.85)
        .radius(function (d) { return d.y; })
        .angle(function (d) { return d.x / 180 * Math.PI; });

    var vis = d3.select("body").append("svg:svg")
        .attr("width", 960)
        .attr("height", 960)
        .append("svg:g")
        .attr("transform", "translate(480,480)");

    d3.json("./assets/Data.json", function (classes) {
        var nodes = cluster(packages.root(classes)),
            links = packages.imports(nodes);

        vis.selectAll("path.link")
            .data(bundle(links))
            .enter().append("svg:path")
            .attr("class", "link")
            .attr("d", line);

        vis.selectAll("g.node")
            .data(nodes.filter(function (n) { return !n.children; }))
            .enter().append("svg:g")
            .attr("class", "node")
            .attr("transform", function (d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
            .append("svg:text")
            .attr("dx", function (d) { return d.x < 180 ? 8 : -8; })
            .attr("dy", ".31em")
            .attr("text-anchor", function (d) { return d.x < 180 ? "start" : "end"; })
            .attr("transform", function (d) { return d.x < 180 ? null : "rotate(180)"; })
            .text(function (d) { return d.data.key; });
    });

    d3.select(self.frameElement).style("height", "960px");
}