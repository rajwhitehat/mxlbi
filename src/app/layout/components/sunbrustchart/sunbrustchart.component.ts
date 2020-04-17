import { Component, OnInit, ViewChild, OnDestroy, ElementRef, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
//import { ChartService } from 'src/app/shared/services/chart.service';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ChartService } from 'src/app/shared/services/chart.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BaseChartDirective } from 'ng2-charts';
import { OverviewType } from 'angular2-calendar-heatmap';
import { DataModel } from 'src/app/data/data.model';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as d3 from 'node_modules/jquery/dist/d3.v4.min.js';
declare var jQuery: any;
import * as $ from 'jquery';
@Component({
  selector: 'app-sunbrustchart',
  templateUrl: './sunbrustchart.component.html',
  styleUrls: ['./sunbrustchart.component.scss'],
  animations: [routerTransition()]
})
export class SunbrustchartComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  FilterInput:any=[];
  form: FormGroup;
  drpbrand: any;
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
  subscription: Subscription;
  @Input() filterCondition:any;
  constructor(private container: ElementRef,public chartService: ChartService) { }
  sunburstchart() {
    const nodeData ={
        'name': 'Brands', 
        'children':
     [
       {
         'name': 'APPLE',
         'children': 
         [
          {
        'name': 'andhra pradesh',
        'children': [
         { 'name': 'Guntur',
           'children': [ 
             {'name': 'I phone xs Max 128gb', 'size': 1}   
                   ]
         } 
                 ]
          },
          {
        'name': 'delhi',
            'children': [
         { 'name': 'Delhi',
           'children': [ 
             {'name': 'IPHONE 5 16GB LTE', 'size': 1} 
                       ]
         }
                ]
          },
          {
        'name': 'Gujarat',
            'children': [
         { 'name': 'Surat',
           'children': [ 
             {'name': '6s', 'size': 1},
             {'name': 'IPHONE XR 64GB ESIM NFC LTE', 'size': 1}
                       ]
         }
                ]
          },
          {
        'name': 'tamil nadu',
            'children': [
          { 'name': 'Vellore',
            'children': [ 
             {'name': '6s', 'size': 1} 
                    ]
          }
                    ]
          }
         ]
       },
       { 
         'name': 'LG',
         'children': 
         [
          {
        'name': 'andhra pradesh',
            'children': [
          { 'name': 'Guntur',
            'children': [ 
             {'name': '20LF460A', 'size': 1}
                    ]
          }
                ]
          },
          {
            'name': 'bihar',
        'children': [
          { 'name': 'Patna',
                'children': [
             {'name': '24LB454A', 'size': 1},
                 {'name': '24LF515A', 'size': 1},
             {'name': '24LH452A', 'size': 1},
             {'name': '26LV2130', 'size': 1}
                           ]
          },
          { 'name': 'Gaya',
                'children': [
             {'name': '28LB452A', 'size': 1}
                           ]
          }
                ]
          },
          {
        'name': 'Chattisgarh',
           'children': [
          { 'name': 'Raipur',
            'children': [ 
             {'name': '32LH576D', 'size': 1}
                     ]
          }
                ]
          },
          {
        'name': 'delhi',
        'children': [
          { 'name': 'Delhi',
                'children': [
            {'name': '24LF458A', 'size': 1},
                 {'name': '24LH454A', 'size': 1},
                 {'name': '32LJ522D', 'size': 1},
                 {'name': '32LJ573D', 'size': 1},
               {'name': '32LK526BPTA', 'size': 1}
                         ]
          }
                 ]
          }
         ]
       },
       {
         'name': 'MI',
         'children': 
         [
          {
        'name': 'andhra pradesh',
               'children': [
          { 'name': 'Guntur',
                'children': [
             {'name': '6A', 'size': 2},
                 {'name': 'redme 7 s 3-32', 'size': 1},
                 {'name': 'REDMI NOTE 4 32GB', 'size': 1},
              {'name': 'REDMI note 7 pro', 'size': 1}
                          ]
          }
                ]
          },
          {
        'name': 'Assam & North East',
          'children': [
          { 'name': 'Teliamura',
                'children': [
             {'name': 'Redmi 7A 2+16', 'size': 1 }
                    ]
          }
                ]
          },
          {
        'name': 'bihar',
              'children': [
          { 'name': 'Patna',
                'children': [
             {'name': 'A1 4GB-64GB', 'size': 1},
                 {'name': 'mi note 7s', 'size': 3},
                 {'name': 'redme note 7s 4-64', 'size': 1},
                 {'name': 'REDMI 6 32GB LTE', 'size': 1}
                ]
          },
          { 'name': 'Munger',
                'children': [
             {'name': 'REDMI 6 PRO 32GB DUAL LTE', 'size': 1},
                {'name': 'Redmi 7', 'size': 2}
                ]
          },
                { 'name': 'Patna',
                'children': [
             {'name': 'REDMI 7A', 'size': 4},
                 {'name': 'REDMI note 7 pro', 'size': 4},
                {'name': 'REDMI Y2  3GB-32GB', 'size': 2}
                ]
          }
             
                       ]
          },
          {
        'name': 'delhi',
               'children': [
          { 'name': 'Delhi',
                'children': [
             {'name': '6A', 'size': 9},
                 {'name': 'REDMI 3S', 'size': 1},
                 {'name': 'REDMI 7A', 'size': 3},
                 {'name': 'Redmi 7A 2+16', 'size': 1},
                 {'name': 'REDMI GO', 'size': 2},
                 {'name': 'REDMI Y2  3GB-32GB', 'size': 1},
                 {'name': 'REDMI Y2 64GB', 'size': 1},
               {'name': 'Redmi Y3', 'size': 1}
                         ]
          }
                 ]
          },
          {
        'name': 'Gujarat',
               'children': [
          { 'name': 'Vadodara',
                'children': [
             {'name': 'REDMI 6 64GB 3GB LTE', 'size': 2},
                 {'name': 'REDMI 7A', 'size': 1}
                ]
          },
          { 'name': 'Surat',
                'children': [
                 {'name': 'Redmi Y3', 'size': 1}
                           ]
          }
                ]
          },
         ]
       },	
       {
         'name': 'NOKIA',
         'children':
         [
          {
           'name': 'andhra pradesh',
           'children': [
         { 'name': 'Vijayawada',
           'children': [ 
                {'name': '105', 'size': 2},
            {'name': '1100', 'size': 1},
                {'name': '1200', 'size': 2}
                        ]
         }
               ]
          },
          {
           'name': 'delhi',
           'children': [
         { 'name': 'Delhi',
           'children': [ 
                {'name': '105', 'size': 12},
                {'name': '106', 'size': 4}
                       ]
         }
               ]
          }
         ]
       },
     ]
    }	
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     
//  const nodeData = {
// 	'name': 'Brands', 
// 	'children':
//  [
//    {
//      'name': 'APPLE',
//      'children': 
//      [
//       {
// 	'name': 'andhra pradesh',
// 	'children': [
// 	 {'name': 'I phone xs Max 128gb', 'size': 1}   
// 		    ]
//       },
//       {
// 	'name': 'delhi',
//         'children': [
// 	 {'name': 'IPHONE 5 16GB LTE', 'size': 1} 
// 	            ]
//       },
//       {
// 	'name': 'Gujarat',
//         'children': [
// 	 {'name': '6s', 'size': 1},
// 	 {'name': 'IPHONE XR 64GB ESIM NFC LTE', 'size': 1}
// 	            ]
//       },
//       {
// 	'name': 'tamil nadu',
//         'children': [
// 	 {'name': '6s', 'size': 1} 
// 		    ]
//       }
//      ]
//    },
//    { 
//      'name': 'LG',
//      'children': 
//      [
//       {
// 	'name': 'andhra pradesh',
//         'children': [
// 	 {'name': '20LF460A', 'size': 1}
// 		    ]
//       },
//       {
//         'name': 'bihar',
//         'children': [
// 	 {'name': '24LB454A', 'size': 1},
//          {'name': '24LF515A', 'size': 1},
// 	 {'name': '24LH452A', 'size': 1},
// 	 {'name': '26LV2130', 'size': 1},
//   	 {'name': '28LB452A', 'size': 1}
//        		    ]
//       },
//       {
// 	'name': 'Chattisgarh',
//    	'children': [
// 	 {'name': '6s', 'size': 1}
//  		    ]
//       },
//       {
// 	'name': 'delhi',
// 	'children': [
// 	 {'name': '24LF458A', 'size': 1},
//          {'name': '24LH454A', 'size': 1},
//          {'name': '32LJ522D', 'size': 1},
//          {'name': '32LJ573D', 'size': 1},
//   	 {'name': '32LK526BPTA', 'size': 1}
//      		   ]
//       },
//       {
// 	'name': 'karnataka',
//       	'children': [
// 	 {'name': '24LH454A', 'size': 1},
//          {'name': '32LA6200', 'size': 1}
//                     ]
//       },
//       {
// 	'name': 'maharashtra',
// 	'children': [
// 	 {'name': '24lk454A', 'size': 1}
//  		    ]
//       },
//       {
// 	'name': 'rajasthan',
//      	'children': [
// 	 {'name': '24MN33S', 'size': 1}
//  		    ]
//       },
//       {
// 	'name': 'Tamil Nadu-Pondicherry',
//        	'children': [
// 	 {'name': '22LF460A', 'size': 1},
//          {'name': '24LK454A-PT', 'size': 1},
//          {'name': '32LK510BPTA', 'size': 1},
//  	 {'name': '32LK526BPTA', 'size': 1}
//  		    ]
//       },
//       {
// 	'name': 'uttar pradesh',
//        	'children': [
// 	 {'name': '20LB452A', 'size': 1},
//          {'name': '22LB452A', 'size': 1},
//          {'name': '24LH454A', 'size': 2},
//          {'name': '24LJ470A', 'size': 2},
//          {'name': '32LJ5730-TA', 'size': 1},
//          {'name': '32LJ573D', 'size': 1},
//   	 {'name': '43LJ554T', 'size': 1}
// 	            ]
//       }
//      ]
//    },
//    {
//      'name': 'MI',
//      'children': 
//      [
//       {
// 	'name': 'andhra pradesh',
//        	'children': [
// 	 {'name': '6A', 'size': 2},
//          {'name': 'redme 7 s 3-32', 'size': 1},
//          {'name': 'REDMI NOTE 4 32GB', 'size': 1},
//  	 {'name': 'REDMI note 7 pro', 'size': 1}
//       		    ]
//       },
//       {
// 	'name': 'Assam & North East',
//   	'children': [
// 	 {'name': 'Redmi 7A 2+16', 'size': 1 }
// 		    ]
//       },
//       {
// 	'name': 'bihar',
//       	'children': [
// 	 {'name': 'A1 4GB-64GB', 'size': 1},
//          {'name': 'mi note 7s', 'size': 3},
//          {'name': 'redme note 7s 4-64', 'size': 1},
//          {'name': 'REDMI 6 32GB LTE', 'size': 1},
//          {'name': 'REDMI 6 PRO 32GB DUAL LTE', 'size': 1},
//          {'name': 'Redmi 7', 'size': 2},
//          {'name': 'REDMI 7A', 'size': 4},
//          {'name': 'REDMI note 7 pro', 'size': 4},
//    	 {'name': 'REDMI Y2  3GB-32GB', 'size': 2}
//                    ]
//       },
//       {
// 	'name': 'delhi',
//        	'children': [
// 	 {'name': '6A', 'size': 9},
//          {'name': 'REDMI 3S', 'size': 1},
//          {'name': 'REDMI 7A', 'size': 3},
//          {'name': 'Redmi 7A 2+16', 'size': 1},
//          {'name': 'REDMI GO', 'size': 2},
//          {'name': 'REDMI Y2  3GB-32GB', 'size': 1},
//          {'name': 'REDMI Y2 64GB', 'size': 1},
//   	 {'name': 'Redmi Y3', 'size': 1}
//      		    ]
//       },
//       {
// 	'name': 'Gujarat',
//        	'children': [
// 	 {'name': 'REDMI 6 64GB 3GB LTE', 'size': 2},
//          {'name': 'REDMI 7A', 'size': 1},
//          {'name': 'Redmi Y3', 'size': 1}
//        		    ]
//       },
//       {
// 	'name': 'haryana',
//        	'children': [
// 	 {'name': 'REDMI 6', 'size': 1},
//          {'name': 'REDMI 6 64GB 3GB LTE', 'size': 1},
//          {'name': 'REDMI 6A 16GB LTE', 'size': 2},
//          {'name': 'REDMI 7A', 'size': 2},
//          {'name': 'REDMI NOTE 7s', 'size': 1},
//    	 {'name': 'REDMI Y2 64GB', 'size': 1}
//        		    ]
//       },
//       {
// 	'name': 'himachal pradesh',
//        	'children': [
// 	 {'name': '6 3-64', 'size': 2},
//          {'name': 'Go 1-16', 'size': 4},
//          {'name': 'mi note 7s', 'size': 1},
//          {'name': 'redme note 7s 4-64', 'size': 1},
//          {'name': 'Redmi 7', 'size': 1},
//          {'name': 'REDMI 7A', 'size': 2},
//   	 {'name': 'REDMI GO', 'size': 3}
//    		    ]
//       },
//       {
// 	'name': 'Jharkhand',
// 	'children': [
// 	 {'name': 'Redmi 7A 2+16', 'size': 1}
//  		    ]
//       },
//       {
// 	'name': 'karnataka',
//        	'children': [
// 	 {'name': 'A3', 'size': 2},
//          {'name': 'K20', 'size': 1},
//          {'name': 'max', 'size': 2},
//          {'name': 'mi 8', 'size': 1},
//          {'name': 'Redmi 7', 'size': 1},
//          {'name': 'Redmi 7 3-32', 'size': 1}
//  		    ]
//       },
//       {
// 	'name': 'kerala',
//        	'children': [
// 	 {'name': '6 pro', 'size': 1},
//          {'name': '6A', 'size': 10},
//          {'name': 'Mi A3 4-64', 'size': 1},
//          {'name': 'NOTE 7 PRO', 'size': 1},
//          {'name': 'REDMI 3S', 'size': 1},
//          {'name': 'REDMI 6A 16GB LTE', 'size': 5},
//          {'name': 'REDMI 7 2-32', 'size': 1},
//          {'name': 'Redmi 7 3-32', 'size': 1},
//          {'name': 'REDMI 7A', 'size': 2},
//          {'name': 'REDMI GO', 'size': 13},
//          {'name': 'REDMI NOTE 5PRO', 'size': 1},
//          {'name': 'REDMI Y2 64GB', 'size': 1},
// 	 {'name': 'Y2', 'size': 1}
//  		    ]
//       },
//       {
// 	'name': 'Madhya Pradesh',
//        	'children': [
// 	 {'name': '6A', 'size': 1},
//          {'name': 'C-2', 'size': 3},
//          {'name': 'poco f1 6+64', 'size': 1},
//          {'name': 'REDMI 6', 'size': 1},
//          {'name': 'REDMI 7A', 'size': 1},
//          {'name': 'Redmi 7A 2+16', 'size': 2},
// 	 {'name': 'REDMI NOTE 7s', 'size': 1},
//          {'name': 'REDMI Y2 64GB', 'size': 1},
//          {'name': 'Y2', 'size': 1}
//        		    ]
//       },
//       {
// 	'name': 'maharashtra',
//        	'children': [
// 	 {'name': '4A pro', 'size': 1},
//          {'name': '6A', 'size': 1},
//          {'name': 'NOTE 7 PRO', 'size': 2},
//          {'name': 'REDMI 7A', 'size': 1},
//          {'name': 'SMART TV 4A 32', 'size': 1}
//        		    ]
//       },
//       {
// 	'name': 'orissa',
//        	'children': [
// 	 {'name': 'Mi A3 4-64', 'size': 1},
// 	 {'name': 'REDMI 7A', 'size': 2},
//          {'name': 'REDMI note 7 pro', 'size': 1}
//        		    ]
//       },
//       {
// 	'name': 'punjab',
//        	'children': [
// 	 {'name': '6A', 'size': 2},
//          {'name': 'NOTE 7 PRO', 'size': 2},
//          {'name': 'REDMI 7A', 'size': 2},
//          {'name': 'Redmi Y3', 'size': 1}
//        		    ]
//       },
//       {
// 	'name': 'tamil nadu',
//        	'children': [
// 	 {'name': 'NOTE 7 PRO', 'size': 1}
//  		    ]
//       },
//       {
// 	'name': 'uttar pradesh',
//        	'children': [
// 	 {'name': '4C 32 PRO', 'size': 1},
//          {'name': '6 3-64', 'size': 1},
//          {'name': '6A', 'size': 3},
//          {'name': 'Go 1-16', 'size': 1},
//          {'name': 'MI 3 64GB', 'size': 1},
//          {'name': 'MI 4A PRO', 'size': 1},
//          {'name': 'MI 5 32GB LTE NFC', 'size': 1},
//          {'name': 'Mi A3 4-64', 'size': 3},
//          {'name': 'MI3', 'size': 1},
//          {'name': 'MI4', 'size': 1},
//          {'name': 'note 7 pro 4-64', 'size': 1},
//          {'name': 'redme 7 s 3-32', 'size': 4},
//          {'name': 'redme 7 s 3-32', 'size': 1},
//          {'name': 'Redmi 5', 'size': 1},
//          {'name': 'REDMI 5 32GB DUAL LTE', 'size': 1},
//          {'name': 'REDMI 6A 16GB LTE', 'size': 2},
//          {'name': 'Redmi 7', 'size': 1},
//          {'name': 'REDMI 7 2-32', 'size': 1},
//          {'name': 'Redmi 7 3-32', 'size': 1},
//          {'name': 'REDMI 7A', 'size': 4},
//          {'name': 'REDMI GO', 'size': 4},
//          {'name': 'REDMI NOTE 4 64GB', 'size': 1},
//          {'name': 'Redmi note7s 4-64', 'size': 2},
//          {'name': 'REDMI Y1 64GB', 'size': 1},
//          {'name': 'Redmi Y3', 'size': 1},
//          {'name': 'Y2', 'size': 2}
//        		    ]
//       },
//       {
// 	'name': 'West Bengal',
//         'children': [
//          {'name': '6A', 'size': 4},
// 	 {'name': 'Go 1-16', 'size': 1},
// 	 {'name': 'NOTE 7 PRO', 'size': 2},
// 	 {'name': 'note 7 pro 4-64', 'size': 1},
// 	 {'name': 'redme 7 s 3-32', 'size': 1},
//          {'name': 'redme 7a blue', 'size': 3},
// 	 {'name': 'REDME NOTE 7 S 3-32', 'size': 1},
// 	 {'name': 'redme note 7s 4-64', 'size': 3},
// 	 {'name': 'REDMI 6 64GB 3GB LTE', 'size': 1},
// 	 {'name': 'REDMI 6A 32GB 2GB', 'size': 1},
// 	 {'name': 'Redmi 7', 'size': 4},
// 	 {'name': 'REDMI 7 2-32', 'size': 2},
// 	 {'name': 'REDMI 7A', 'size': 4},
// 	 {'name': 'Redmi 7A 2+16', 'size': 1},
// 	 {'name': 'REDMI GO', 'size': 1},
// 	 {'name': 'Redmi Note 4', 'size': 1},
// 	 {'name': 'REDMI note 7 pro', 'size': 1},
//          {'name': 'Redmi note7s 4-64', 'size': 1},
// 	 {'name': 'REDMI Y2  3GB-32GB', 'size': 2},
// 	 {'name': 'REDMI Y2 64GB', 'size': 3},
// 	 {'name': 'Redmi Y3', 'size': 9}
//         	    ]
//       },
//       {
//        'name': 'rajasthan',
//        'children': [
// 	{'name': '24MN33S', 'size': 1 }
// 		   ]
//       },
//       {
//        'name': 'Tamil Nadu-Pondicherry',
//        'children': [
//         {'name': '22LF460A', 'size': 1},
// 	{'name': '24LK454A-PT', 'size': 1},
// 	{'name': '32LK510BPTA', 'size': 1},
//         {'name': '32LK526BPTA', 'size': 1}
//         	   ]
//       },
//       {
//        'name': 'uttar pradesh',
//        'children': [
//         {'name': '20LB452A', 'size': 1},
// 	{'name': '22LB452A', 'size': 1},
// 	{'name': '24LH454A', 'size': 2},
// 	{'name': '24LJ470A', 'size': 2},
// 	{'name': '32LJ5730-TA', 'size': 1},
// 	{'name': '32LJ573D', 'size': 1},
//         {'name': '43LJ554T', 'size': 1}
//         	   ]
//       }
//      ]
//    },	
//    {
//      'name': 'NOKIA',
//      'children':
//      [
//       {
//        'name': 'andhra pradesh',
//        'children': [
//         {'name': '105', 'size': 2},
// 	{'name': '1100', 'size': 1},
//         {'name': '1200', 'size': 2}
//      		   ]
//       },
//       {
//        'name': 'Assam & North East',
//        'children': [
// 	{'name': '105', 'size': 2 }
// 		   ]
//       },
//       {
//        'name': 'delhi',
//        'children': [
//         {'name': '105', 'size': 12},
//         {'name': '106', 'size': 4}
//         	   ]
//       },
//       {
//        'name': 'Gujarat',
//        'children': [
// 	{'name': '105', 'size': 1 }
// 		   ]
//       },
//       {
//        'name': 'haryana',
//        'children': [
// 	{'name': '105', 'size': 5 }
// 		   ]
//       },
//       {
//        'name': 'karnataka',
//        'children': [
//         {'name': '105', 'size': 2},
//         {'name': 'asha 503', 'size': 1}
//            	   ]
//       },		
//       {
//        'name': 'kerala',
//        'children': [
//         {'name': '103', 'size': 7},
// 	{'name': '105', 'size': 24},
// 	{'name': '106', 'size': 3},
// 	{'name': '130', 'size': 2},
//         {'name': '150', 'size': 3}
//         	   ]
//       },
//       {
//        'name': 'Madhya Pradesh',
//        'children': [
// 	{'name': '105', 'size': 2 }
// 		   ]
//       },
//       {
//        'name': 'maharashtra',
//        'children': [
//         {'name': '105', 'size': 3},
//         {'name': '106', 'size': 2}
//         	   ]
//       },
//       {
//        'name': 'orissa',
//        'children': [
//         {'name': '105', 'size': 2},
//         {'name': '150', 'size': 1}
//         	   ]
//       },		
//       {
//        'name': 'punjab',
//        'children': [
//         {'name': '105', 'size': 2},
//         {'name': '106', 'size': 2}
//         	   ]
//       },		
//       {
//        'name': 'rajasthan',
//        'children': [
//         {'name': '105', 'size': 3},
// 	{'name': '106', 'size': 1},
// 	{'name': '130', 'size': 1},
// 	{'name': '222', 'size': 1},
//         {'name': '3310', 'size': 1}
//         	   ]
//       },
//       {
//        'name': 'tamil nadu',
//        'children': [
//         {'name': '100', 'size': 1},
// 	{'name': '105', 'size': 3},
// 	{'name': '1200', 'size': 2},
//         {'name': '3310', 'size': 1}
//         	   ]
//       },
//       {
//        'name': 'Tamil Nadu-Pondicherry',
//        'children': [
// 	{'name': '105', 'size': 3 }
// 		   ]
//       },
//       {
//        'name': 'uttar pradesh',
//        'children': [
//         {'name': '105', 'size': 22},
// 	{'name': '106', 'size': 4},
// 	{'name': '130', 'size': 1},
// 	{'name': '150', 'size': 3},
// 	{'name': '2.1 8GB DUAL LTE', 'size': 1},
// 	{'name': '3310', 'size': 2},
//         {'name': 'NOKIA 1', 'size': 2},
// 	{'name': 'nokia 2.2', 'size': 1},
// 	{'name': 'Nokia 6.1', 'size': 2}
//         	   ]
//       },
//       {
//        'name': 'West Bengal',
//        'children': [
//         {'name': '105', 'size': 19},
// 	{'name': '106', 'size': 1},
// 	{'name': '130', 'size': 3},
// 	{'name': '150', 'size': 4},
//         {'name': '3310', 'size': 1}
//         	   ]
//       }
//      ]
//    },
//    {
//      'name': 'Oppo',
//      'children':
//      [
//       {
//        'name': 'andhra pradesh',
//        'children': [
// 	{'name': 'A3', 'size': 6 }
// 		   ]
//       },
//       {
//        'name': 'Assam & North East',
//        'children': [
//         {'name': 'A1k', 'size': 2},
// 	{'name': 'A5s', 'size': 5},
// 	{'name': 'A5S(3-32)', 'size': 1},
//         {'name': 'f11', 'size': 1}
//         	   ]
//       },
//       {
//        'name': 'bihar',
//        'children': [
//         {'name': 'A3S 32GB DUAL LTE', 'size': 2},
// 	{'name': 'A5', 'size': 3},
// 	{'name': 'a53', 'size': 2},
// 	{'name': 'A5s', 'size': 9},
// 	{'name': 'A5s 4GB-64GB', 'size': 1},
// 	{'name': 'A5S(3-32)', 'size': 10},
// 	{'name': 'A7', 'size': 1},
// 	{'name': 'A71 3GB-16GB', 'size': 1},
// 	{'name': 'F11 PRO', 'size': 6},
// 	{'name': 'f1s', 'size': 10},
//         {'name': 'F5 YOUTH 3GB-32GB', 'size': 1},
// 	{'name': 'F9 PRO', 'size': 1},
// 	{'name': 'V5', 'size': 1}
//         	   ]
//       },
//       {
//        'name': 'delhi',
//        'children': [
//         {'name': 'A1k', 'size': 8},
// 	{'name': 'A3S 3-32', 'size': 1},
// 	{'name': 'A5', 'size': 1},
// 	{'name': 'A5s', 'size': 3},
// 	{'name': 'A5s 2-32', 'size': 1},
// 	{'name': 'A5S 3GB-32GB', 'size': 2},
// 	{'name': 'A5S(3-32)', 'size': 1},
// 	{'name': 'A7', 'size': 1}
//         	   ]
//       },
//       {
//        'name': 'Gujarat',
//        'children': [
//         {'name': 'A1k', 'size': 8},
// 	{'name': 'A3S 3-32', 'size': 1},
// 	{'name': 'A5', 'size': 1},
// 	{'name': 'A5s', 'size': 3},
// 	{'name': 'A5s 2-32', 'size': 1},
// 	{'name': 'A5S 3GB-32GB', 'size': 2},
// 	{'name': 'A5S(3-32)', 'size': 1},
// 	{'name': 'A7', 'size': 1}
//         	   ]
//       },
//       {
//        'name': 'haryana',
//        'children': [
// 	{'name': 'A5s', 'size': 1}
// 		   ]
//       },
//       {
//        'name': 'himachal pradesh',
//        'children': [
//         {'name': 'A9', 'size': 1},
//         {'name': 'oppoA1K', 'size': 1}
//         	   ]
//       },
//       {
//        'name': 'karnataka',
//        'children': [
//         {'name': 'A1k', 'size': 3},
// 	{'name': 'A3', 'size': 6},
// 	{'name': 'A5', 'size': 1},
// 	{'name': 'A7', 'size': 1},
// 	{'name': 'f 11 pro', 'size': 1},
// 	{'name': 'F11 PRO', 'size': 1},
// 	{'name': 'f9', 'size': 1},
// 	{'name': 'neo 7', 'size': 4}
//         	   ]
//       }	
//      ]
//    }
//  ]
// }	

















 
    const width = 350;
    const height = 350;
    const maxRadius = Math.min(width, height) / 2;
    const formatNumber = d3.format(',d');

    this.sbx = d3.scaleLinear()
        .range([0, 2 * Math.PI])
        .clamp(true);

    this.sby = d3.scaleSqrt()
        .range([maxRadius * .1, maxRadius]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const partition = d3.partition();

    this.arc = d3.arc()
        .startAngle((d: any) => this.sbx(d.x0))
        .endAngle((d: any) => this.sbx(d.x1))
        .innerRadius((d: any) => Math.max(0, this.sby(d.y0)))
        .outerRadius((d: any) => Math.max(0, this.sby(d.y1)));

    this.middleArcLine = d => {
        const halfPi = Math.PI / 2;
        const angles = [this.sbx(d.x0) - halfPi, this.sbx(d.x1) - halfPi];
        const r = Math.max(0, (this.sby(d.y0) + this.sby(d.y1)) / 2);

        const middleAngle = (angles[1] + angles[0]) / 2;
        const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
        if (invertDirection) { angles.reverse(); }

        const path = d3.path();
        path.arc(0, 0, r, angles[0], angles[1], invertDirection);
        return path.toString();
    };

     this.textFits = d => {
        const CHAR_SPACE = 6;

        const deltaAngle = this.sbx(d.x1) - this.sbx(d.x0);
        const r = Math.max(0, (this.sby(d.y0) + this.sby(d.y1)) / 2);
        const perimeter = r * deltaAngle;

        return d.data.name.length * CHAR_SPACE < perimeter;
    };

    this.svgsb = d3.select(this.container.nativeElement.querySelector('#sb')).append('svg')
        .style('width', '100%')
        .style('height', '100%')
        .style('padding', '10px 50px')
        .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
        .on('click', () => this.focusOn()); // Reset zoom on canvas click

    const root = d3.hierarchy(nodeData);
    root.sum((d: any) => d.size);

    const slice = this.svgsb.selectAll('g.slice')
        .data(partition(root).descendants());

    slice.exit().remove();

    const newSlice = slice.enter()
        .append('g').attr('class', 'slice')
        .on('click', d => {
            d3.event.stopPropagation();
            this.focusOn(d);
        });

    newSlice.append('title')
        .text((d: any) => d.data.name + '\n' + formatNumber(d.value));

    newSlice.append('path')
        .attr('class', 'main-arc')
        .style('fill', (d: any) => color((d.children ? d : d.parent).data.name))
        .attr('d', this.arc);

    newSlice.append('path')
        .attr('class', 'hidden-arc')
        .attr('style', 'display:none')
        .attr('id', (_, i) => `hiddenArc${i}`)
        .attr('d', this.middleArcLine);

    const text = newSlice.append('text')
        .attr('display', d => this.textFits(d) ? null : 'none');

    // Add white contour
    text.append('textPath')
        .attr('startOffset', '10%')
        .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
        .text((d: any) => d.data.name);

    text.append('textPath')
        .attr('startOffset', '10%')
        .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
        .text((d: any) => d.data.name);

  }
  public chartClicked(e: any): void {
    document.getElementById('btnPopup1').click();
  }
  public chartHovered(e: any): void {
  }
  ngOnInit() { 
  //   this.subscription = this.chartService.chartFilterOption.subscribe(
  //   (message) => {
  //     this.FilterInput = message;
  //     console.log('dddddddddddddddSunbrust',message)
  //   }
  // );
  console.log('dddddddddddddddSunbrust',this.filterCondition)  
    this.sunburstchart();
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
}
