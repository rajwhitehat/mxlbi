import { Component, OnInit, Input } from '@angular/core';
declare var loadGroupBarChart:Function;
@Component({
  selector: 'app-groupbarchart',
  templateUrl: './groupbarchart.component.html',
  styleUrls: ['./groupbarchart.component.scss']
})
export class GroupbarchartComponent implements OnInit {
  @Input() childMessage: string;
  constructor() { }
  ngOnInit() {
    loadGroupBarChart();
  }
}
