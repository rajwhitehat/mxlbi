import { Component, OnInit } from '@angular/core';
import {Runtime, Library, Inspector} from "@observablehq/runtime";

declare const chords: any;
@Component({
  selector: 'app-chordgraph',
  templateUrl: './chordgraph.component.html',
  styleUrls: ['./chordgraph.component.scss']
})
export class ChordgraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const runtime = new Runtime();
    const main = runtime.module(chords, Inspector.into('#chart'));
  }

}
