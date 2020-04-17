import { Component, OnInit, SimpleChanges, Input, ElementRef, AfterViewInit } from '@angular/core';
declare let drawLineChartAs:Function;
import { AdminService } from 'src/app/shared/services/admin.service';
import { HttpClient } from '@angular/common/http';
declare var Chart;
@Component({
  selector: 'app-linechartas',
  templateUrl: './linechartas.component.html',
  styleUrls: ['./linechartas.component.scss']
})
export class LinechartasComponent implements OnInit, AfterViewInit {
  @Input() childMessage: string;
  @Input() inputvFilterData:[];  
  @Input() id:string;  
  public data1:any={
    labels: ["2-Feb-20", "9-Feb-20", "16-Feb-20", "23-Feb-20"],
    datasets: [
      {
        label: "Nokia",
        borderColor: "cyan",
        data: [29, 21, 47, 51],
        stack: 1
      },
      {
        label: "SAMSUNG",
        borderColor: "orange",
        data: [29, 28, 35, 5],
        stack: 1
      },
      {
        label: "VIVO",
        borderColor: "red",
        data: [57, 47, 33, 10],
        stack: 1
      },
      {
        label: "APPLE",
        borderColor: "blue",
        data: [9, 39, 56, 4],
        stack: 1
      },
      {
        label: "REALME",
        borderColor: "purple",
        data: [55, 29, 36, 18],
        stack: 1
      },{
        label: "OPPO",
        borderColor: "green",
        data:[5, 46, 32, 31],
        stack: 1
      },{
        label: "LAVA",
        borderColor: "white",
        data: [58, 43, 21, 34],
        stack: 1
      },
      {
        label: "HONOR",
        borderColor: "yellow",
        data: [17, 20, 9, 51],
        stack: 1
      },
      {
        label: "INTEX",
        borderColor: "gray",
        data: [50, 2, 20, 11],
        stack: 1
      },
    ]
  };
  public data2:any={
    labels: ["2-Feb-20", "9-Feb-20", "16-Feb-20", "23-Feb-20"],
    datasets: [
      {
        label: "Nokia",
        borderColor: "cyan",
        data: [8, 28, 57, 13],
        stack: 1
      },
      {
        label: "SAMSUNG",
        borderColor: "orange",
        data: [59, 46, 34, 32],
        stack: 1
      },
      {
        label: "VIVO",
        borderColor: "red",
        data: [26, 38, 31, 58],
        stack: 1
      },
      {
        label: "APPLE",
        borderColor: "blue",
        data: [59, 31, 56, 23],
        stack: 1
      },
      {
        label: "REALME",
        borderColor: "purple",
        data: [15, 8, 21, 47],
        stack: 1
      },{
        label: "OPPO",
        borderColor: "green",
        data:[5, 46, 32, 31],
        stack: 1
      },{
        label: "LAVA",
        borderColor: "white",
        data: [18, 34, 50, 19],
        stack: 1
      },
      {
        label: "HONOR",
        borderColor: "yellow",
        data: [43, 42, 2, 0],
        stack: 1
      },
      {
        label: "INTEX",
        borderColor: "gray",
        data: [50, 2, 20, 11],
        stack: 1
      },
    ]
  };
  public brandDuplicate=[];
  constructor(private http: HttpClient, public service:AdminService,private container: ElementRef) { }

  ngOnInit() {
    this.service.globalFilterSubject.subscribe((res:any)=>{
      console.log("dddd",res);
      this.brandDuplicate =res;
      let data1 =[];
      let data2 =[];
      if(res.length > 0){
        this.data1.datasets.forEach(obj=>{
          if(res.indexOf(obj.label) > -1)
          data1.push(obj)
        })
        this.data2.datasets.forEach(obj=>{
          if(res.indexOf(obj.label) > -1)
          data2.push(obj)
        })      
      }else{
        data1 = this.data1.datasets;
        data2 = this.data2.datasets;
      }
      if(this.id == 'lineChart1'){
        this.drawLineChart({
          labels: ["2-Feb-20", "9-Feb-20", "16-Feb-20", "23-Feb-20"],
          datasets: data1
        });
      }else{
        this.drawLineChart({
          labels: ["2-Feb-20", "9-Feb-20", "16-Feb-20", "23-Feb-20"],
          datasets: data2
        });
      }
    })
}


ngAfterViewInit(){
  console.log("nh called");
  
  this.drawLineChart(this.id === 'lineChart1' ? this.data1 : this.data2);

}
public drawLineChart(data){
  let canvas = <HTMLCanvasElement>(document.getElementById(this.id))
  let ctx = canvas.getContext('2d');
  // Chart.defaults.line.spanGaps = true;
  new Chart(ctx, {
    type: 'line',
    data: data,
    options:{
      legend:{
        position:'bottom',
        display:true
      },
    }
  });
}

}
