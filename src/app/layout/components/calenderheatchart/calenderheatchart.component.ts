import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { BaseChartDirective } from 'ng2-charts';
import { OverviewType } from 'angular2-calendar-heatmap';
import { DataModel } from 'src/app/data/data.model';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'node_modules/jquery/dist/d3.v4.min.js'
@Component({
  selector: 'app-calenderheatchart',
  templateUrl: './calenderheatchart.component.html',
  styleUrls: ['./calenderheatchart.component.scss'],
  animations: [routerTransition()]
})
export class CalenderheatchartComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  databar: DataModel[];
  dataH:any;
  color: string;
  overview: any;
  datahierarchical: any;
  databP: any;
  svgsb: any;
  arc: any;
  middleArcLine: any;
  textFits: any;
  sbx: any;
  sby: any;
  gsd;
  gsdb;
  iscompleted = false;
  sb;
  closeResult: string;
  btnPopup: any;
  content: any;
  @ViewChild(BaseChartDirective, {static: false}) chart: BaseChartDirective;
  dates: any;
  dataSourceMap: Object;
  dataSource: Object;
  public alerts: Array<any> = [];
  public sliders: Array<any> = [];
  public now: Date = new Date(2020, 12, 31);//new Date();
  public time_ago: Date = new Date(2018, 1, 21);//new Date();
  print(val: object):void {
  //console.log(val);
  }

  // On change handler
  handleOnChange(val: object):void {
  // console.log('onChange', val)
  }
/*---------end rnd-------------*/
  constructor(private _formBuilder: FormBuilder,
              private http: HttpClient, 
              public adminService: AdminService,
              private modalService: NgbModal,private _route: ActivatedRoute,private container: ElementRef) {
      this._unsubscribeAll = new Subject();
  }

  
  ngOnInit(): void {
    const salesdatabrand = this._route.snapshot.data.pageData.salesdatabrand;
    const gsdbitems = salesdatabrand;
    this.dataH = d3.timeDays(this.time_ago, this.now).map((dateElement: any, index: number) => {
      dateElement.setHours(0, 0, 0, 0);
      const mdata =  {
        date: dateElement,
        details: function () {
          const subdet = [];
          gsdbitems['response'][0].forEach(res => {
            const sdbdate = res['Date'].split('/');
            const dtdbs = new Date(sdbdate[2], sdbdate[1], sdbdate[0], 0, 0, 0, 0);
            if (dateElement.getTime() === dtdbs.getTime()) {
              subdet.push(
              {
                'name': res['Brand'],
                'date': function () {
                        const projectDate = new Date(dateElement.getTime());
                        projectDate.setHours(Math.floor(Math.random() * 24));
                        projectDate.setMinutes(Math.floor(Math.random() * 60));
                        return projectDate;
                      }(),
                'value': parseInt (res['Quantity'], 10)
              });
            }
          });
          //console.log(subdet);
          return subdet;
        }(),

        init: function () {
          // console.log(this.details);
          this.total = this.details.reduce((prev: number, e: any) => {
            return prev + e.value;
          }, 0);
          return this;
        }
      }.init();
      // console.log('ram')
      //  console.log(mdata);
     return mdata;
  });

this.color = '#ed8631';

// Set overview type (choices are year, month and day)
this.overview = OverviewType.year;

  }

  focusOn(d = { x0: 0, x1: 1, y0: 0, y1: 1 }) {
    // Reset to top-level if no data point specified

    const transition = this.svgsb.transition()
        .duration(750)
        .tween('scale', () => {
            const xd = d3.interpolate(this.sbx.domain(), [d.x0, d.x1]),
                yd = d3.interpolate(this.sby.domain(), [d.y0, 1]);
            return t => { this.sbx.domain(xd(t)); this.sby.domain(yd(t)); };
        });

    transition.selectAll('path.main-arc')
        .attrTween('d', d => () => this.arc(d));

    transition.selectAll('path.hidden-arc')
        .attrTween('d', d => () => this.middleArcLine(d));

    transition.selectAll('text')
        .attrTween('display', d => () => this.textFits(d) ? null : 'none');

    this.moveStackToFront(d);
  }

    //

    moveStackToFront(elD) {
        this.svgsb.selectAll('.slice').filter(d => d === elD)
            .each(function(d) {
                this.parentNode.appendChild(this);
                if (d.parent) { this.moveStackToFront(d.parent); }
            });
    }
  ngOnDestroy(): void {
   // this.dataDoubleVertical=[];
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete(); 
  }
   //nodeData:any;
 
  
}
