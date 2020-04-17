import { Component, OnInit, ElementRef } from '@angular/core';
import {Runtime, Library, Inspector} from "@observablehq/runtime";
//import * as d6 from '../../../../assets/js/d3.v3.min.js';
import * as d6 from 'node_modules/jquery/dist/d3.v4.min.js'; 
declare const hipHop : any;
@Component({
  selector: 'app-hiphop',
  templateUrl: './hiphop.component.html',
  styleUrls: ['./hiphop.component.scss']
})
export class HiphopComponent implements OnInit {
  constructor(private container: ElementRef) { }
  ngOnInit() {  
    hipHop(d6,this.container.nativeElement.querySelector('#playerlist'),this.container.nativeElement.querySelector('#chart'));
  }
}
