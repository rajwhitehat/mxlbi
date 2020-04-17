import { Component, OnInit, Input, ElementRef } from '@angular/core';
declare var drawZoomChart:Function;
@Component({
  selector: 'app-zoomablecirclepacking',
  templateUrl: './zoomablecirclepacking.component.html',
  styleUrls: ['./zoomablecirclepacking.component.scss']
})
export class ZoomablecirclepackingComponent implements OnInit {
  @Input() childMessage: string;
  constructor(private container: ElementRef) { }

  ngOnInit() {
    drawZoomChart(this.container.nativeElement.querySelector('#zoomid'));
  }

}
