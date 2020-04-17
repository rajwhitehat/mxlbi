import { Component, OnInit } from '@angular/core';
declare var radialChart: Function;
import * as d3 from 'node_modules/jquery/dist/d3.v4.min.js'
declare var drawVerticalBar: Function;
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
   styleUrls: ['./survey.component.scss']
  // styles: [`
  // .node circle {
  //   fill: #999;
  // }
  
  // .node text {
  //   font: 10px sans-serif;
  // }
  
  // .node--internal circle {
  //   fill: #555;
  // }
  
  // .node--internal text {
  //   text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
  // }
  
  // .link {
  //   fill: none;
  //   stroke: #555;
  //   stroke-opacity: 0.4;
  //   stroke-width: 1.5px;
  // }
  // `],
})
export class SurveyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    radialChart(d3);
    drawVerticalBar();
  }

}
