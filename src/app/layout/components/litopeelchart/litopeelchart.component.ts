import { Component, OnInit, ElementRef } from '@angular/core';
import {Runtime, Library, Inspector} from "@observablehq/runtime";
declare const football: any;
@Component({
  selector: 'app-litopeelchart',
  templateUrl: './litopeelchart.component.html',
  styleUrls: ['./litopeelchart.component.scss']
})
export class LitopeelchartComponent implements OnInit {

  constructor(private container: ElementRef) { }
  ngOnInit() {
    //console.log('start lito')
    const runtime = new Runtime();
    const main = runtime.module(football, Inspector.into(this.container.nativeElement.querySelector('#intro')));
    //console.log('end lito')
  }

}
