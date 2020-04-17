import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { ChartService } from 'src/app/shared/services/chart.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BaseChartDirective } from 'ng2-charts';
import {Runtime, Library, Inspector} from "@observablehq/runtime";
declare const define: any;

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  form: FormGroup;
  rightFilterCondition:any=[];
    dates: any;
    dataSource: Object;
    dataSourceMap: Object;
    dropdownList = [];
    selectedItems  = [];
    @ViewChild(BaseChartDirective,{static: false}) chart: BaseChartDirective;
    dropdownListChart = [];
    selectedItemsChart = [];
    dropdownSettings: IDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    dropdownSettingsChart: IDropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      closeDropDownOnSelection: true
    };
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    clickPerson(){
      alert('event has called');
    }
    public barChartLabels: string[] = [
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012'
    ];
    public barChartType: string;
    public barChartLegend: boolean;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];

    // Doughnut
    public doughnutChartLabels: string[] = [
      'China',
      'India',
      'United States',
      'United Kingdom',
      'New Zealand',
      'Phillipines'
    ];
    public doughnutChartData: number[] = [150, 90, 180,75,40,100];
    public doughnutChartType: string;
    public doughnutChartOptions:any = {
      legend: {position: 'bottom'}
    }

    // Radar
    public radarChartLabels: string[] = [
        'negative',
        'neutral',
        'positive',
        'unassigned'
    ];
    public radarChartData: any = [
        { data: [65, 59, 90, 81], label: 'Series A' },
        { data: [28, 48, 40, 19], label: 'Series B' }
    ];
    public radarChartType: string;

    // Pie
    public pieChartLabels: string[] = [
      'China',
      'India',
      'United States',
      'United Kingdom',
      'New Zealand',
      'Phillipines'
    ];
    public pieChartData: number[] = [150, 90, 180,75,40,100];

    public pieChartType: string;

    // PolarArea
    public polarAreaChartLabels: string[] = [
      'China',
      'India',
      'United States',
      'United Kingdom',
      'New Zealand',
      'Phillipines'
    ];
    public polarAreaChartData: number[] = [150, 90, 180,75,40,100];

    public polarAreaLegend: boolean;

    public polarAreaChartType: string;

    // lineChart
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean;
    public lineChartType: string;
    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }

    constructor(private _formBuilder: FormBuilder,
      private http: HttpClient, public chartService: ChartService, private modalService: NgbModal) {
      this._unsubscribeAll = new Subject();
        this.dataSource = {
            chart: {
              caption: '',
              lowerLimit: '0',
              upperLimit: '100',
              showValue: '1',
              numberSuffix: '%',
              theme: 'fusion',
              showToolTip: '0'
            },
            // Gauge Data
            colorRange: {
              color: [
                {
                  minValue: '0',
                  maxValue: '50',
                  code: '#F2726F'
                },
                {
                  minValue: '50',
                  maxValue: '75',
                  code: '#FFC533'
                },
                {
                  minValue: '75',
                  maxValue: '100',
                  code: '#62B58F'
                }
              ]
            },
            dials: {
              dial: [
                {
                  value: '81'
                }
              ]
            }
          }; // end of this.dataSource

          this.dataSourceMap = {
            chart: {
              caption: '',
              subcaption: '',
              numbersuffix: '%',
              includevalueinlabels: '1',
              labelsepchar: ': ',
              entityFillHoverColor: '#FFF9C4',
              theme: 'fusion'
            },
            // Aesthetics; ranges synced with the slider
            colorrange: {
              minvalue: '0',
              code: '#FFE0B2',
              gradient: '1',
              color: [
                {
                  minvalue: '0.5',
                  maxvalue: '1.0',
                  color: '#FFD74D'
                },
                {
                  minvalue: '1.0',
                  maxvalue: '2.0',
                  color: '#FB8C00'
                },
                {
                  minvalue: '2.0',
                  maxvalue: '3.0',
                  color: '#E65100'
                }
              ]
            },
            // Source data as JSON --> id represents countries of world.
            data: [
              {
                id: 'NA',
                value: '.82',
                showLabel: '1'
              },
              {
                id: 'SA',
                value: '2.04',
                showLabel: '1'
              },
              {
                id: 'AS',
                value: '1.78',
                showLabel: '1'
              },
              {
                id: 'EU',
                value: '.40',
                showLabel: '1'
              },
              {
                id: 'AF',
                value: '2.58',
                showLabel: '1'
              },
              {
                id: 'AU',
                value: '1.30',
                showLabel: '1'
              }
            ]
          };
          this.subscription = this.chartService.chartFilterOption.subscribe(
            (message) => {
              this.rightFilterCondition = message;
              console.log('dddddddddddddddChart',this.rightFilterCondition)
            }
          );
          // this.chartService.chartFilterOption.subscribe(res => {
          //   console.log(res);
          //   this.dates = {to: res, from: res}
          //   alert(res);
          // });
    }
    subscription:Subscription
    onItemSelect(item: any) {
      console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }

    onItemSelectChart (item: any) {
      console.log(1);
        if (item.item_id === 1)
        {
          this.doughnutChartType = 'doughnut';
          this.chart.update();
        } else if (item.item_id === 2){
          this.doughnutChartType = 'line';
          this.chart.update();
        } else if(item.item_id === 3){
          this.doughnutChartType = 'bar';
          this.chart.update();
        }
        console.log(item);
      }

      createForm(): void {
        this.form = this._formBuilder.group({
        });
      }
    ngOnInit() {
        this.createForm();
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.doughnutChartType = 'doughnut';
        this.radarChartType = 'radar';
        this.pieChartType = 'pie';
        this.polarAreaLegend = true;
        this.polarAreaChartType = 'polarArea';
        this.lineChartLegend = true;
        this.lineChartType = 'line';

        this.dropdownList = [
          { item_id: 1, item_text: 'Facebook' },
          { item_id: 2, item_text: 'Twitter' },
          { item_id: 3, item_text: 'Youtube' },
          { item_id: 4, item_text: 'Instagram' },
          { item_id: 5, item_text: 'Whatsapp' }
        ];
        this.selectedItems = [
          { item_id: 1, item_text: 'Facebook' },
          { item_id: 2, item_text: 'Twitter' },
          { item_id: 3, item_text: 'Youtube' },
          { item_id: 4, item_text: 'Instagram' }
        ];

        this.dropdownListChart = [
          { item_id: 1, item_text: 'Doughnut' },
          { item_id: 2, item_text: 'Line' },
          { item_id: 3, item_text: 'Bar' }
        ];
        this.selectedItemsChart = [
          { item_id: 1, item_text: 'Doughnut' }
        ];

        const runtime = new Runtime();
       const main = runtime.module(define, Inspector.into('#motionChart'));
    }
    ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }
}
