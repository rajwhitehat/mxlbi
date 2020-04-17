import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {
  @Input() childMessage: string;
  public lineChartData: Array<any>;
  public chartHovered(e: any): void {
  }
  public lineChartLabels: Array<any>;
  public lineChartOptions: any = {
    responsive: true
  };
  
  public lineChartLegend: boolean;
  public lineChartType: string;
  constructor() { }
  // onItemSelect(item: any) {
  //   if (this.selectedItems.length === 1) {
  //     this.lineChartData = [
  //       { data: [65, 59, 80, 81, 56, 55, 40], label: 'LG' }
  //     ];
  //     this.chart.update();
  //   } else {
  //     this.lineChartData = [
  //       { data: [65, 59, 80, 81, 56, 55, 40], label: 'LG' },
  //       { data: [28, 48, 40, 19, 86, 27, 90], label: 'Onida' },
  //       { data: [18, 48, 77, 9, 100, 27, 40], label: 'Sony' }
  //     ];
  //     this.chart.update();
  //   }
  // }
  ngOnInit() {
    this.lineChartData=(this.childMessage=="Sales Graph")? [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'LG' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Onida' },
      { data: [18, 48, 77, 9, 100, 27, 40], label: 'Sony' }
    ]:[
      { data: [884.283, 0, 478.542, 0, 415.109, 147.77, 440.195], label: '4 NINE' },
      { data: [194.662, 463.431, 0, 744.488, 366.475, 0, 253.332], label: 'SAMSUNG' },
      { data: [187.038, 819.893, 344.762, 260.318, 124.294, 0, 215.023], label: 'INTEX' },
      { data: [363.578, 0, 0, 230.942, 0, 0, 118.543], label: 'XIAOMI' },
      { data: [377.29, 179.01, 0, 440.585, 416.622, 0, 0], label: 'LG' },
      { data: [377.798, 0, 0, 0, 699.038, 0, 0], label: 'HAIER' },
      { data: [270.842, 0, 0, 0, 370.752, 0, 0], label: 'SONY' },
      { data: [0, 291.505, 202.191, 0, 0, 0, 214.216], label: 'ACER' },
      { data: [0, 361.578, 912.658, 471.873, 0, 0, 104.006], label: 'OPPO' },
      { data: [0, 0, 433.653, 614.524, 0, 0, 0], label: 'VIVO' }
    ];;
    this.lineChartLabels= (this.childMessage=="Sales Graph")?[
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ]:
    [
      '2001','2002','2003','2004','2005','2006','2007'
    ];
    this.lineChartLegend = true;
    this.lineChartType = 'line';
  }
}
