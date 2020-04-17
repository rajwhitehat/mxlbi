import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import { DoubleverticalService } from 'src/app/shared/services/doublevertical.service';
declare var doubleVerticalBPWithLabelFun: Function;
import * as d7 from 'node_modules/jquery/dist/d3.v4.min.js'; 
import viz from 'node_modules/jquery/dist/viz.v1.1.0.min.js';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-doubleverticalchart',
  templateUrl: './doubleverticalchart.component.html',
  styleUrls: ['./doubleverticalchart.component.scss']
})
export class DoubleverticalchartComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  message: string = "Hello!"
  showFullScreen(){
    this.messageEvent.emit(this.message);
  }
  dataDoubleVertical:any=[];/*=[['APPLE','AP',1,2000000],
  ['LG','AP',1,12000],
  ['MI','AP',5,50800],
  ['NOKIA','AP',5,136856],
  ['Oppo','AP',6,60000],
  ['SAMSUNG','AP',2652,472090],
  ['SONY','AP',1,19990],
  ['Vivo','AP',21,269049],
  ['MI','AS',1,7300],
  ['NOKIA','AS',2,2350],
  ['Oppo','AS',9408,98490],
  ['SAMSUNG','AS',7,36900],
  ['SONY','AS',9,222100],
  ['LG','BR',1503,50555],
  ['MI','BR',19,205981],
  ['Oppo','BR',55,736941],
  ['SAMSUNG','BR',96,458825],
  ['Vivo','BR',30,358588],
  ['LG','CT',1,16500],
  ['SAMSUNG','CT',1,2000],
  ['APPLE','DL',1,2000],
  ['LG','DL',6,95500],
  ['MI','DL',19,110169],
  ['NOKIA','DL',18,20708],
  ['Oppo','DL',46,388380],
  ['SAMSUNG','DL',97,315483],
  ['Vivo','DL',28,357960],
  ['APPLE','GJ',2,67000],
  ['MI','GJ',4,32380],
  ['NOKIA','GJ',1,1400],
  ['Oppo','GJ',19,185870],
  ['SAMSUNG','GJ',26,310720],
  ['Vivo','GJ',27,304300],
  ['MI','HR',8,62199],
  ['NOKIA','HR',5,6396],
  ['Oppo','HR',1,11990],
  ['SAMSUNG','HR',8,97999],
  ['Vivo','HR',2,28290],
  ['MI','HP',14,96060],
  ['Oppo','HP',2,23500],
  ['SAMSUNG','HP',2,21700],
  ['Vivo','HP',1,7500],
  ['MI','JH',6200,6200],
  ['SAMSUNG','JH',3,4700],
  ['LG','KA',2,34600],
  ['MI','KA',8,92699],
  ['NOKIA','KA',3,4200],
  ['Oppo','KA',23,264998],
  ['SAMSUNG','KA',13,141047],
  ['Vivo','KA',16,254196],
  ['MI','KL',39,260700],
  ['NOKIA','KL',40,54799],
  ['Oppo','KL',34,374942],
  ['SAMSUNG','KL',32,246290],
  ['Vivo','KL',10,112080],
  ['MI','MP',12,102400],
  ['NOKIA','MP',2,2400],
  ['Oppo','MP',7,71290],
  ['SAMSUNG','MP',18030,301719],
  ['Vivo','MP',31,444530],
  ['LG','MH',1,11000],
  ['MI','MH',6,73698],
  ['NOKIA','MH',5,6550],
  ['Oppo','MH',15019,249980],
  ['SAMSUNG','MH',11,93900],
  ['SONY','MH',1,28000],
  ['Vivo','MH',3,64990],
  ['MI','OR',4,42100],
  ['NOKIA','OR',3,4200],
  ['Oppo','OR',6,79960],
  ['SAMSUNG','OR',3,14750],
  ['Vivo','OR',3,40000],
  ['SAMSUNG','PC',1,15500],
  ['MI','PB',7,70500],
  ['NOKIA','PB',2302,4800],
  ['Oppo','PB',63003,96000],
  ['SAMSUNG','PB',11719,142149],
  ['Vivo','PB',42510,164470],
  ['LG','RJ',1,14000],
  ['NOKIA','RJ',3954,12550],
  ['Oppo','RJ',3,31980],
  ['SAMSUNG','RJ',10511,66080],
  ['Vivo','RJ',15,154670],
  ['APPLE','TN',1,25000],
  ['MI','TN',1,14000],
  ['NOKIA','TN',7,11900],
  ['Oppo','TN',7,56066],
  ['SAMSUNG','TN',8,14250],
  ['SONY','TN',1,32000],
  ['Vivo','TN',11,159970],
  ['LG','TN/PC',4,64500],
  ['NOKIA','TN/PC',3,3600],
  ['SAMSUNG','TN/PC',1,18000],
  ['LG','UP',10,261480],
  ['MI','UP',53,331340],
  ['NOKIA','UP',38,95929],
  ['Oppo','UP',49,498355],
  ['SAMSUNG','UP',5347,577281],
  ['SONY','UP',4,126990],
  ['Vivo','UP',17,159559],
  ['Oppo','UT',1,9990],
  ['MI','WB',48,416595],
  ['NOKIA','WB',28,40840],
  ['Oppo','WB',19,193020],
  ['SAMSUNG','WB',58,228794],
  ['Vivo','WB',13,144920]];*/
  constructor( private http: HttpClient, 
    public dChartService: DoubleverticalService,private container: ElementRef) {
      
     }

  ngOnInit() {
    this.dChartService.getDoubleVerticalSalesData().subscribe(res => {      
      this.dataDoubleVertical=res;
       doubleVerticalBPWithLabelFun(d7,this.dataDoubleVertical,this.container.nativeElement.querySelector('.doubleVerticalBPWithLabel'));
      //this.dates = {to: res, from: res}
      //alert(res);
    });    
  }


// doubleVerticalBPWithLabelFunV31(d7,data)
// {
// let color ={LG:"#3366CC", 
// APPLE:"#DC3912",  
// MI:"#FF9900",
// NOKIA:"#109618", 
// Oppo:"#990099", 
// SAMSUNG:"#0099C6",
// SONY:"#FFC0CB",
// Vivo:"#ffff00"
// };
// var svg = d7.select("#doubleVerticalBPWithLabel").append("svg").attr("width", '900').attr("height", 500);

// svg.append("text").attr("x",250).attr("y",70)
// 	.attr("class","header").text("Sales by Volume");	
// svg.append("text").attr("x",750).attr("y",70)
// 	.attr("class","header").text("Sales by Value");
// var g =[svg.append("g").attr("transform","translate(150,100)")
// 		,svg.append("g").attr("transform","translate(700,100)")];
//     // console.log('ggggg1');
//     // console.log(viz);
//     console.log(d7);console.log('hhhhhhh');
// var bp=[viz.bP()
// 		.data(data)
// 		.min(12)
// 		.pad(1)
// 		.height(450)
// 		.width(100)
// 		.barSize(35)
// 		.fill(d=>color[d.primary])		
// 	,viz.bP()
// 		.data(data)
// 		.value(d=>d[3])
// 		.min(12)
// 		.pad(1)
// 		.height(450)
// 		.width(100)
// 		.barSize(35)
// 		.fill(d=>color[d.primary])
// ];
// [0,1].forEach(function(i){
// 	g[i].call(bp[i])
	
// 	g[i].append("text").attr("x",-50).attr("y",-8).style("text-anchor","middle").text("Brand");
// 	g[i].append("text").attr("x", 250).attr("y",-8).style("text-anchor","middle").text("State");
	
// 	g[i].append("line").attr("x1",-100).attr("x2",0);
// 	g[i].append("line").attr("x1",200).attr("x2",300);
	
// 	g[i].append("line").attr("y1",610).attr("y2",610).attr("x1",-100).attr("x2",0);
// 	g[i].append("line").attr("y1",610).attr("y2",610).attr("x1",200).attr("x2",300);
	
// 	g[i].selectAll(".mainBars")
// 		.on("mouseover",mouseover)
// 		.on("mouseout",mouseout);

// 	g[i].selectAll(".mainBars").append("text").attr("class","label")
// 		.attr("x",d=>(d.part=="primary"? -30: 120))
// 		.attr("y",d=>+6)
// 		.text(d=>d.key)
// 		.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
	
// 	g[i].selectAll(".mainBars").append("text").attr("class","perc")
// 		.attr("x",d=>(d.part=="primary"? -100: 80))
// 		.attr("y",d=>+6)
// 		.text(function(d){ return d7.format("0.0%")(d.percent)})
// 		.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
// });

// function mouseover(d){
// 	[0,1].forEach(function(i){
// 		bp[i].mouseover(d);
		
// 		g[i].selectAll(".mainBars").select(".perc")
// 		.text(function(d){ return d7.format("0.0%")(d.percent)});
// 	});
// }
// function mouseout(d){
// 	[0,1].forEach(function(i){
// 		bp[i].mouseout(d);
		
// 		g[i].selectAll(".mainBars").select(".perc")
// 		.text(function(d){ return d7.format("0.0%")(d.percent)});
// 	});
// }
// d7.select(self.frameElement).style("height", "800px");
// }
}
