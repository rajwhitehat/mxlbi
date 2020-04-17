import { Component, OnInit,OnChanges, SimpleChanges, Input, AfterViewInit } from '@angular/core';
declare let  drawLineChartAs:Function;
import { AdminService } from 'src/app/shared/services/admin.service';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
declare let  drawmulticolorbarchart: Function;
declare let  stackedbar : Function;
declare let  loadScrollableBarChart: Function;
declare let  drawVerticalBar: Function;
declare let  groupBar: Function;
declare let  Chart;

@Component({
  selector: 'app-salesanalysis',
  templateUrl: './salesanalysis.component.html',
  styleUrls: ['./salesanalysis.component.scss']
})
export class SalesanalysisComponent implements OnInit, AfterViewInit {
 public data:any=[];
 public  highcharts = Highcharts;
 public  vlineChartasFilterData=[{
      tv_spons:5,
      tv_cric:5,
      tv_ron:6,
      tv_radio:6,
      npp:7,
      magazine:3
    }]; 
 
public  sortOrder:any=[]
public  unchangableData = [
  	"2-Feb-20;North", 
  	"9-Feb-20;North", 
  	"16-Feb-20;North",  
  	"23-Feb-20;North", 
  	"2-Feb-20;East", 
  	"9-Feb-20;East", 
  	"16-Feb-20;East",
  	"23-Feb-20;East",
  	"2-Feb-20;West", 
  	"9-Feb-20;West", 
  	"16-Feb-20;West",  
  	"23-Feb-20;West", 
  	"2-Feb-20;South", 
  	"9-Feb-20;South", 
  	"16-Feb-20;South",
  	"23-Feb-20;South",
  ];
public  unchangableData2 = [
    "2-Feb-20;less=2k", 
    "9-Feb-20;less=2k", 
    "16-Feb-20;less=2k",  
    "23-Feb-20;less=2k", 
    "2-Feb-20;2-3k", 
    "9-Feb-20;2-3k", 
    "16-Feb-20;2-3k",
    "23-Feb-20;2-3k",
    "2-Feb-20;3-4k", 
    "9-Feb-20;3-4k", 
    "16-Feb-20;3-4k",  
    "23-Feb-20;3-4k", 
    "2-Feb-20;4-6k", 
    "9-Feb-20;4-6k", 
    "16-Feb-20;4-6k",
    "23-Feb-20;4-6k"
  ];
public   stackedBarData = {
    labels: [
      "2-Feb-20;less=2k", 
      "9-Feb-20;less=2k", 
      "16-Feb-20;less=2k",  
      "23-Feb-20;less=2k", 
      "2-Feb-20;2-3k", 
      "9-Feb-20;2-3k", 
      "16-Feb-20;2-3k",
      "23-Feb-20;2-3k",
      "2-Feb-20;3-4k", 
      "9-Feb-20;3-4k", 
      "16-Feb-20;3-4k",  
      "23-Feb-20;3-4k", 
      "2-Feb-20;4-6k", 
      "9-Feb-20;4-6k", 
      "16-Feb-20;4-6k",
      "23-Feb-20;4-6k"
      ],
    datasets: [
  {
    label: "Nokia",
    backgroundColor: "cyan",
    data: [5, 0, 1, 5, 5, 8, 1, 5, 9, 8, 8, 6, 9, 8, 8, 5, 9, 8, 8, 5],
    stack: 1
  },
  {
    label: "SAMSUNG",
    backgroundColor: "orange",
    data: [15, 21, 21, 25, 25, 28, 21, 25, 19, 18, 18, 16, 19, 18, 18, 15],
    stack: 1
  },
  {
    label: "VIVO",
    backgroundColor: "red",
    data: [30, 20, 21, 25, 35, 28, 21, 15, 19, 18, 18, 16, 19, 8, 46, 51],
    stack: 1
  },
  {
    label: "APPLE",
    backgroundColor: "blue",
    data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
    stack: 1
  },
  {
    label: "REALME",
    backgroundColor: "purple",
    data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
    stack: 1
  },{
    label: "OPPO",
    backgroundColor: "green",
    data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
    stack: 1
  },{
    label: "LAVA",
    backgroundColor: "black",
    data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
    stack: 1
  },
  {
    label: "HONOR",
    backgroundColor: "yellow",
    data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
    stack: 1
  },
  {
    label: "INTEX",
    backgroundColor: "gray",
    data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
    stack: 1
  },
]
};
public   stackedBarDataDuplicate = {
  labels: [
    "2-Feb-20;less=2k", 
    "9-Feb-20;less=2k", 
    "16-Feb-20;less=2k",  
    "23-Feb-20;less=2k", 
    "2-Feb-20;2-3k", 
    "9-Feb-20;2-3k", 
    "16-Feb-20;2-3k",
    "23-Feb-20;2-3k",
    "2-Feb-20;3-4k", 
    "9-Feb-20;3-4k", 
    "16-Feb-20;3-4k",  
    "23-Feb-20;3-4k", 
    "2-Feb-20;4-6k", 
    "9-Feb-20;4-6k", 
    "16-Feb-20;4-6k",
    "23-Feb-20;4-6k"
    ],
  datasets: [
{
  label: "Nokia",
  backgroundColor: "cyan",
  data: [5, 0, 1, 5, 5, 8, 1, 5, 9, 8, 8, 6, 9, 8, 8, 5, 9, 8, 8, 5],
  stack: 1
},
{
  label: "SAMSUNG",
  backgroundColor: "orange",
  data: [15, 21, 21, 25, 25, 28, 21, 25, 19, 18, 18, 16, 19, 18, 18, 15],
  stack: 1
},
{
  label: "VIVO",
  backgroundColor: "red",
  data: [30, 20, 21, 25, 35, 28, 21, 15, 19, 18, 18, 16, 19, 8, 46, 51],
  stack: 1
},
{
  label: "APPLE",
  backgroundColor: "blue",
  data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
  stack: 1
},
{
  label: "REALME",
  backgroundColor: "purple",
  data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
  stack: 1
},{
  label: "OPPO",
  backgroundColor: "green",
  data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
  stack: 1
},{
  label: "LAVA",
  backgroundColor: "black",
  data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
  stack: 1
},
{
  label: "HONOR",
  backgroundColor: "yellow",
  data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
  stack: 1
},
{
  label: "INTEX",
  backgroundColor: "gray",
  data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
  stack: 1
},
]
};
public helpers;
public chartData = {
  labels: [
    "2-Feb-20;North", 
    "9-Feb-20;North", 
    "16-Feb-20;North",  
    "23-Feb-20;North", 
    "2-Feb-20;East", 
    "9-Feb-20;East", 
    "16-Feb-20;East",
    "23-Feb-20;East",
    "2-Feb-20;West", 
    "9-Feb-20;West", 
    "16-Feb-20;West",  
    "23-Feb-20;West", 
    "2-Feb-20;South", 
    "9-Feb-20;South", 
    "16-Feb-20;South",
    "23-Feb-20;South",
  ],
  datasets: [
    {
      label: "Nokia",
      backgroundColor: "cyan",
      data: [15, 20, 21, 25, 25, 28, 37, 45, 19, 46, 18, 22, 19, 46, 18, 15],
      stack: 1
    },
    {
      label: "SAMSUNG",
      backgroundColor: "orange",
      data: [15, 21, 21, 25, 25, 28, 21, 25, 19, 18, 18, 16, 19, 18, 18, 15],
      stack: 1
    },
    {
      label: "VIVO",
      backgroundColor: "red",
      data: [30, 20, 21, 25, 35, 28, 21, 15, 19, 18, 18, 16, 19, 8, 46, 51],
      stack: 1
    },
    {
      label: "APPLE",
      backgroundColor: "blue",
      data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
      stack: 1
    },
    {
      label: "REALME",
      backgroundColor: "purple",
      data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
      stack: 1
    },{
      label: "OPPO",
      backgroundColor: "green",
      data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
      stack: 1
    },{
      label: "LAVA",
      backgroundColor: "black",
      data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
      stack: 1
    },
    {
      label: "HONOR",
      backgroundColor: "yellow",
      data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
      stack: 1
    },
    {
      label: "INTEX",
      backgroundColor: "gray",
      data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
      stack: 1
    },
  ]
};
public chartDataDuplicate = {
  labels: [
    "2-Feb-20;North", 
    "9-Feb-20;North", 
    "16-Feb-20;North",  
    "23-Feb-20;North", 
    "2-Feb-20;East", 
    "9-Feb-20;East", 
    "16-Feb-20;East",
    "23-Feb-20;East",
    "2-Feb-20;West", 
    "9-Feb-20;West", 
    "16-Feb-20;West",  
    "23-Feb-20;West", 
    "2-Feb-20;South", 
    "9-Feb-20;South", 
    "16-Feb-20;South",
    "23-Feb-20;South",
  ],
  datasets: [
    {
      label: "Nokia",
      backgroundColor: "cyan",
      data: [15, 20, 21, 25, 25, 28, 37, 45, 19, 46, 18, 22, 19, 46, 18, 15],
      stack: 1
    },
    {
      label: "SAMSUNG",
      backgroundColor: "orange",
      data: [15, 21, 21, 25, 25, 28, 21, 25, 19, 18, 18, 16, 19, 18, 18, 15],
      stack: 1
    },
    {
      label: "VIVO",
      backgroundColor: "red",
      data: [30, 20, 21, 25, 35, 28, 21, 15, 19, 18, 18, 16, 19, 8, 46, 51],
      stack: 1
    },
    {
      label: "APPLE",
      backgroundColor: "blue",
      data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
      stack: 1
    },
    {
      label: "REALME",
      backgroundColor: "purple",
      data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
      stack: 1
    },{
      label: "OPPO",
      backgroundColor: "green",
      data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
      stack: 1
    },{
      label: "LAVA",
      backgroundColor: "black",
      data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
      stack: 1
    },
    {
      label: "HONOR",
      backgroundColor: "yellow",
      data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
      stack: 1
    },
    {
      label: "INTEX",
      backgroundColor: "gray",
      data: [40, 39, 37, 25, 15, 16, 21, 15, 44, 18, 46, 46, 43, 28, 18, 19],
      stack: 1
    },
  ]
};
public selectedArr1 = this.chartData.datasets.map((it)=>{ 
  return it.data
});
public selectedArr2 = this.stackedBarData.datasets.map((it)=>{ 
  return it.data
});
public newArray1 = [];
public newArray2 = [];
public indexArr1 = [];
public indexArr2 = [];
public ctx1;
public ctx2;
public isOppo = false;
public isVivo = false;
public isBoth = false;
public brands = [];
public brandDuplicate = [];
public zoneDuplicate = [];
  constructor( private http: HttpClient, 
    public service: AdminService) {
      this.getBrandNames();
      Chart.defaults.groupableBar = Chart.helpers.clone(Chart.defaults.bar);
      this.helpers = Chart.helpers; 
      Chart.controllers.groupableBar = Chart.controllers.bar.extend({
        calculateBarX: function (index, datasetIndex) {
          // position the bars based on the stack index
          var stackIndex = this.getMeta().stackIndex;
          return Chart.controllers.bar.prototype.calculateBarX.apply(this, [index, stackIndex]);
        },
    
        hideOtherStacks: function (datasetIndex) {
          var meta = this.getMeta();
          var stackIndex = meta.stackIndex;
    
          this.hiddens = [];
          for (var i = 0; i < datasetIndex; i++) {
            var dsMeta = this.chart.getDatasetMeta(i);
            if (dsMeta.stackIndex !== stackIndex) {
              this.hiddens.push(dsMeta.hidden);
              dsMeta.hidden = true;
            }
          }
        },
    
        unhideOtherStacks: function (datasetIndex) {
          var meta = this.getMeta();
          var stackIndex = meta.stackIndex;
    
          for (var i = 0; i < datasetIndex; i++) {
            var dsMeta = this.chart.getDatasetMeta(i);
            if (dsMeta.stackIndex !== stackIndex) {
              dsMeta.hidden = this.hiddens.unshift();
            }
          }
        },
    
        calculateBarY: function (index, datasetIndex) {
          this.hideOtherStacks(datasetIndex);
          var barY = Chart.controllers.bar.prototype.calculateBarY.apply(this, [index, datasetIndex]);
          this.unhideOtherStacks(datasetIndex);
          return barY;
        },
    
        calculateBarBase: function (datasetIndex, index) {
          this.hideOtherStacks(datasetIndex);
          var barBase = Chart.controllers.bar.prototype.calculateBarBase.apply(this, [datasetIndex, index]);
          this.unhideOtherStacks(datasetIndex);
          return barBase;
        },
    
        getBarCount: function () {
          var stacks = [];
    
          // put the stack index in the dataset meta
          Chart.helpers.each(this.chart.data.datasets, function (dataset, datasetIndex) {
            var meta = this.chart.getDatasetMeta(datasetIndex);
            if (meta.bar && this.chart.isDatasetVisible(datasetIndex)) {
              var stackIndex = stacks.indexOf(dataset.stack);
              if (stackIndex === -1) {
                stackIndex = stacks.length;
                stacks.push(dataset.stack);
              }
              meta.stackIndex = stackIndex;
            }
          }, this);
    
          this.getMeta().stacks = stacks;
          return stacks.length;
        },
      });
    
     }

  ngOnInit() {
    // stackedbar();
    // loadScrollableBarChart();
    // drawVerticalBar();
  }

 async ngAfterViewInit(){
    let canvas1 = <HTMLCanvasElement>(document.getElementById("myChart"));
     this.ctx1 = canvas1.getContext("2d");
     let canvas2 = <HTMLCanvasElement>(document.getElementById("stackedBarPrice"));
     this.ctx2 = canvas2.getContext("2d");
    //  let url="http://nodejs.n6.iworklab.com/api/motionchart/nationsbar/2019-08-16%7C2019-09-16";
    //  let response = await fetch(url);
    //  this.chartData = await response.json();
    //  console.log('ccc', this.chartData);
     
    new Chart(this.ctx1, {
      type: 'bar',
      data: this.chartData,
      options: {
        scales: {
          xAxes:[
            {
              id:'xAxis1',
              type:"category",
              ticks:{
                callback:function(label){
                  let  month = label.split(";")[0];
                  let  year = label.split(";")[1];
                  return month;
                },
                fontColor : '#444'
              }
            },
            {
              id:'xAxis2',
              type:"category",
              gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
              ticks:{
                callback:function(label){
                  let  month = label.split(";")[0];
                  let  year = label.split(";")[1];
                  if(month === "9-Feb-20"){
                    return year;
                  }else{
                    return "";
                  }
                },
                fontColor : '#444',
                fontStyle: "bold",
              },
            }],

            yAxes: [{
              id: 'Yaxix',
              ticks: {
                max: 100,
                callback: function (value, index, values) {
                  return value + "%";
                }
              },
              stacked: true,
            }]
        },
        events: ['click'],
        legend:{
          position:'bottom',
          display:true
        }
      }
    }); 

    new Chart(this.ctx2, {
      type: 'bar',
      data: this.stackedBarData,
      options: {
        scales: {
          xAxes:[
            {
              id:'xAxis1',
              type:"category",
              ticks:{
                callback:function(label){
                  let  month = label.split(";")[0];
                  let  year = label.split(";")[1];
                  return month;
                },
                fontColor : '#444'
              }
            },
            {
              id:'xAxis2',
              type:"category",
              gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
              ticks:{
                callback:function(label){
                  let  month = label.split(";")[0];
                  let  year = label.split(";")[1];
                  if(month === "9-Feb-20"){
                    return year;
                  }else{
                    return "";
                  }
                },
                fontColor : '#444',
                fontStyle: "bold",
              },
            }],

        yAxes: [{
        ticks: {
          max: 100,
          callback: function(value, index, values) {
              return value + "%";
          }
        },
        stacked: true,
        }]
        },
        events: ['click'],
        legend:{
          position:'bottom',
          display:true
        }
      }
    });
  }

  public filterByValue(type, string, event) {
    if(event.target.checked){
      this.zoneDuplicate.push(string)
    }else{
     let i = this.zoneDuplicate.indexOf(string);
      if(i > 0)
      this.zoneDuplicate.splice(i,1);
    }
    switch(type){
      case 'zone':{
        let  niceArray = this.unchangableData.filter(o => o.toLowerCase().includes(string.toLowerCase()));
    
        let  duplicateVal = this.newArray1.filter(o => o.toLowerCase().includes(string.toLowerCase()))
    
        if(duplicateVal && duplicateVal.length){
          this.newArray1 = this.newArray1.filter(n => !duplicateVal.includes(n))
          if(this.newArray1.length == 0){
            this.chartData.labels = JSON.parse(JSON.stringify(this.chartDataDuplicate.labels));
            let data = JSON.parse(JSON.stringify(this.chartDataDuplicate.datasets));
            this.chartData.datasets = [];
            if(this.brandDuplicate.length>0){
              data.forEach(obj=>{
                if(this.brandDuplicate.indexOf(obj.label) > -1)
                this.chartData.datasets.push(obj)
              })
            }else{
              this.chartData.datasets = data;
            }
            return this.drawZoneOrPriceChart(this.ctx1,
              {
                labels:this.chartDataDuplicate.labels,
                datasets:this.chartData.datasets
            });
          }
          
        }
        else{
          this.newArray1.push.apply(this.newArray1, niceArray)
        }
        console.log(this.newArray1);  
    
        this.unchangableData.forEach((it)=>{
          this.newArray1.forEach((n)=>{
            if(n == it && !this.indexArr1.includes(this.unchangableData.indexOf(it))){    
              this.indexArr1.push(this.unchangableData.indexOf(it));
            }
          })
        })
        this.chartData.datasets.forEach((d, i)=>{   
          d.data = [];
          this.indexArr1.forEach((index)=>{
            d.data.push(this.selectedArr1[i][index])
          })
    
        })
        
        this.chartData.labels = this.newArray1.filter(()=>true);
        this.drawZoneOrPriceChart(this.ctx1,
          {
            labels:this.chartData.labels,
            datasets:this.chartData.datasets
        });
        break;
      }
      case 'price':{
        let  niceArray = this.unchangableData2.filter(o => o.toLowerCase().includes(string.toLowerCase()));
    
        let  duplicateVal = this.newArray2.filter(o => o.toLowerCase().includes(string.toLowerCase()))
    
        if(duplicateVal && duplicateVal.length){
          this.newArray2 = this.newArray2.filter(n => !duplicateVal.includes(n))
          if(this.newArray2.length == 0){
            this.stackedBarData.labels = JSON.parse(JSON.stringify(this.stackedBarDataDuplicate.labels));
            // this.stackedBarData.datasets = JSON.parse(JSON.stringify(this.stackedBarDataDuplicate.datasets));
            let data = JSON.parse(JSON.stringify(this.stackedBarDataDuplicate.datasets));
            this.stackedBarData.datasets = [];
            if(this.brandDuplicate.length>0){
              data.forEach(obj=>{
                if(this.brandDuplicate.indexOf(obj.label) > -1)
                this.stackedBarData.datasets.push(obj)
              })
            }else{
              this.stackedBarData.datasets = data;
            }
           return this.drawZoneOrPriceChart(this.ctx2,
              {
                labels:this.stackedBarData.labels,
                datasets:this.stackedBarData.datasets
              });
          }
        }
        else{
          this.newArray2.push.apply(this.newArray2, niceArray)
        }
    
        this.unchangableData2.forEach((it)=>{
          this.newArray2.forEach((n)=>{
            if(n == it && !this.indexArr2.includes(this.unchangableData2.indexOf(it))){    
              this.indexArr2.push(this.unchangableData2.indexOf(it));
            }
          })
        })
    
        this.stackedBarData.datasets.forEach((d, i)=>{   
          d.data = [];
          this.indexArr2.forEach((index)=>{
            d.data.push(this.selectedArr2[i][index])
          })
    
        })
       
        this.stackedBarData.labels = this.newArray2.filter(()=>true);
        this.drawZoneOrPriceChart(this.ctx2,
          {
            labels:this.stackedBarData.labels,
            datasets:this.stackedBarData.datasets
          });
      }
    }

  } 

  public drawZoneOrPriceChart(ctx, data){
    new Chart(ctx, {
      type: 'groupableBar',
      data: data,
      options: {
        scales: {
          xAxes:[
            {
              id:'xAxis1',
              type:"category",
              ticks:{
                callback:function(label){
                  let  month = label.split(";")[0];
                  let  year = label.split(";")[1];
                  return month;
                },
                fontColor : '#444'
              }
            },
            {
              id:'xAxis2',
              type:"category",
              gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
              ticks:{
                callback:function(label){
                  let  month = label.split(";")[0];
                  let  year = label.split(";")[1];
                  if(month === "9-Feb-20"){
                    return year;
                  }else{
                    return "";
                  }
                },
                fontColor : '#444',
                fontStyle: "bold",
              },
            }],

        yAxes: [{
        ticks: {
          max: 100,
          callback: (value, index, values)=> {
              return value + "%";
          }
        },
        stacked: true,
        }]
        },
        events: ['click'],
        legend:{
          position:'bottom',
          display:true
        }
      }
    });
  }
  
  public globalFilters(type, event){
    if(event.target.checked){
      this.brandDuplicate.push(type)
    }else{
      let i = this.brandDuplicate.findIndex(o=> o==type);
      if(i > -1)
      this.brandDuplicate.splice(i,1);
    }
    console.log(this.brandDuplicate);
    this.service.globalFilterSubject.next(this.brandDuplicate)
    let dataSets1 =[];
    let dataSets2 =[];
    if(this.brandDuplicate.length > 0){
      this.chartData.datasets = JSON.parse(JSON.stringify(this.chartDataDuplicate.datasets));
      this.stackedBarData.datasets = JSON.parse(JSON.stringify(this.stackedBarDataDuplicate.datasets));
      this.chartData.datasets.forEach(obj=>{
        if(this.brandDuplicate.indexOf(obj.label) > -1)
        dataSets1.push(obj);
      })
      this.stackedBarData.datasets.forEach(obj=>{
        if(this.brandDuplicate.indexOf(obj.label) > -1)
        dataSets2.push(obj);
      })
      this.drawZoneOrPriceChart(this.ctx1,
        {
          labels:this.chartData.labels,
          datasets: dataSets1
      });
      this.drawZoneOrPriceChart(this.ctx2,
        {
          labels:this.stackedBarData.labels,
          datasets: dataSets2
      });
      this.chartData.datasets = dataSets1;
      this.stackedBarData.datasets = dataSets2;
      console.log(this.chartDataDuplicate);

    }else{
      this.drawZoneOrPriceChart(this.ctx1,
        {
          labels:this.chartDataDuplicate.labels,
          datasets: this.chartDataDuplicate.datasets
      });
      console.log(this.chartDataDuplicate);
      
      this.drawZoneOrPriceChart(this.ctx2,
        {
          labels:this.stackedBarDataDuplicate.labels,
          datasets: this.stackedBarDataDuplicate.datasets
      });
      this.chartData.datasets = JSON.parse(JSON.stringify(this.chartDataDuplicate.datasets));
      this.stackedBarData.datasets = JSON.parse(JSON.stringify(this.stackedBarDataDuplicate.datasets));
      console.log(this.chartDataDuplicate);
      
    }


  }

  public  getBrandNames(){
    this.chartData.datasets.forEach(obj=>{
    this.brands.push(obj.label);
    });
    console.log(this.brands);
  }
  
}
