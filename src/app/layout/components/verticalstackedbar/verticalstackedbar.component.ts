import { Component, OnInit, Input } from '@angular/core';
declare var drawVerticalChart:Function;
@Component({
  selector: 'app-verticalstackedbar',
  templateUrl: './verticalstackedbar.component.html',
  styleUrls: ['./verticalstackedbar.component.scss']
})
export class VerticalstackedbarComponent implements OnInit {
  @Input() childMessage: string;
  constructor() { }
  ngOnInit() {
    drawVerticalChart();
  }
}
