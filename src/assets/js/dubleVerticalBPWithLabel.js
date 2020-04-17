function doubleVerticalBPWithLabelFun(D7,data,chartid)
{
var color ={LG:"#3366CC", 
APPLE:"#DC3912",  
MI:"#FF9900",
NOKIA:"#109618", 
Oppo:"#990099", 
SAMSUNG:"#0099C6",
SONY:"#FFC0CB",
Vivo:"#ffff00"
};
var svg = D7.select(chartid).append("svg").attr("width", '900').attr("height", 500);

svg.append("text").attr("x",250).attr("y",70)
	.attr("class","header").text("Sales by Volume");	
svg.append("text").attr("x",750).attr("y",70)
	.attr("class","header").text("Sales by Value");
var g =[svg.append("g").attr("transform","translate(150,100)")
		,svg.append("g").attr("transform","translate(700,100)")];

var bp=[ viz.bP()
		.data(data)
		.min(12)
		.pad(1)
		.height(450)
		.width(100)
		.barSize(35)
		.fill(d=>color[d.primary])		
	,viz.bP()
		.data(data)
		.value(d=>d[3])
		.min(12)
		.pad(1)
		.height(450)
		.width(100)
		.barSize(35)
		.fill(d=>color[d.primary])
];
[0,1].forEach(function(i){
	g[i].call(bp[i])
	
	g[i].append("text").attr("x",-50).attr("y",-8).style("text-anchor","middle").text("Brand");
	g[i].append("text").attr("x", 250).attr("y",-8).style("text-anchor","middle").text("State");
	
	g[i].append("line").attr("x1",-100).attr("x2",0);
	g[i].append("line").attr("x1",200).attr("x2",300);
	
	g[i].append("line").attr("y1",610).attr("y2",610).attr("x1",-100).attr("x2",0);
	g[i].append("line").attr("y1",610).attr("y2",610).attr("x1",200).attr("x2",300);
	
	g[i].selectAll(".mainBars")
		.on("mouseover",mouseover)
		.on("mouseout",mouseout);

	g[i].selectAll(".mainBars").append("text").attr("class","label")
		.attr("x",d=>(d.part=="primary"? -30: 120))
		.attr("y",d=>+6)
		.text(d=>d.key)
		.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
	
	g[i].selectAll(".mainBars").append("text").attr("class","perc")
		.attr("x",d=>(d.part=="primary"? -100: 80))
		.attr("y",d=>+6)
		.text(function(d){ return D7.format("0.0%")(d.percent)})
		.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
});

function mouseover(d){
	[0,1].forEach(function(i){
		bp[i].mouseover(d);
		
		g[i].selectAll(".mainBars").select(".perc")
		.text(function(d){ return D7.format("0.0%")(d.percent)});
	});
}
function mouseout(d){
	[0,1].forEach(function(i){
		bp[i].mouseout(d);
		
		g[i].selectAll(".mainBars").select(".perc")
		.text(function(d){ return D7.format("0.0%")(d.percent)});
	});
}
D7.select(self.frameElement).style("height", "800px");
}