import { Component, OnInit, Input } from '@angular/core';
declare var drawBarChart:Function;
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
  @Input() childMessage: string;
  myData :any= [];
  @Input() inputvFilterData:[];
  ngOnChanges(changes) {
    if(changes.inputvFilterData.previousValue==undefined && changes.inputvFilterData.currentValue!=undefined)
    {
      console.log('bar check child filter',this.inputvFilterData);
    }
    else if (changes.inputvFilterData.previousValue!=changes.inputvFilterData.currentValue){
      console.log('bar check child filter',this.inputvFilterData);
    }
  }
  constructor() { }

  ngOnInit() {
    this.myData = [
      {name:"John", age:23, height:1.93},
      {name:"Prashant", age:22, height:1.70},
      {name:"Sonia", age:27, height:1.60},
      {name:"Vicente", age:73, height:0.32}
    ];
    drawBarChart(this.myData);
  }

}
