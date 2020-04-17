import { Component, OnInit, ElementRef } from '@angular/core';
//import * as d3 from 'd3';
//import * as d3 from '../../../../assets/js/d3.v3.min.js'
import * as d3 from 'node_modules/jquery/dist/d3.v4.min.js'; 
// declare var jQuery: any;
// import * as $ from 'jquery';
//declare var createChartV2: Function;
declare var hirBarChartV4:Function;
@Component({
  selector: 'app-hirarchical-bar-chart',
  templateUrl: './hirarchical-bar-chart.component.html',
  styleUrls: ['./hirarchical-bar-chart.component.scss']
})
export class HirarchicalBarChartComponent implements OnInit {
  gsd;
  gsdb;
  iscompleted = false;
  data: any;
  color: string;
  overview: any;
  datahierarchical: any;
  databP: any;
  sb;
  public now: Date = new Date();
  public time_ago: Date = new Date();

  svgsb: any;
  arc: any;
  middleArcLine: any;
  textFits: any;
  sbx: any;
  sby: any;

  margin = ({top: 30, right: 30, bottom: 0, left: 100});
  width: any;
  height: any;
  xAxis: any;
  yAxis: any;
  root: any;
  barStep = 27;
  barPadding = 3 / this.barStep;
  duration = 750;
  x: any;
  colorhc;
  constructor(private container: ElementRef) { }

  ngOnInit() {
    this.datahierarchical={
      "name": "Brands",
      "children": 
  [     
       {
        "name": "APPLE",
        "children": [
         {
          "name": "South",
          "children": [
           {"name": "andhra pradesh",
        "children": [
               {"name": "Guntur",
         "children": [
                   {"name": "I phone xs Max 128gb","size": 1}
                       ]
                }
            ]
       },
       {"name": "tamil nadu",
        "children": [
               {"name": "Vellore",
         "children": [
                   {"name": "6s","size": 1}
                       ]
                }
            ]
       }
              ]
     },
         {
          "name": "North",
          "children": [
           {"name": "delhi",
        "children": [
               {"name": "Delhi",
         "children": [
                   {"name": "IPHONE 5 16GB LTE","size": 1}
                       ]
                }
            ]
       }
              ]
     },
         {
          "name": "West",
          "children": [
           {"name": "Gujarat",
        "children": [
               {"name": "Surat",
         "children": [
                   {"name": "IPHONE XR 64GB ESIM NFC LTE","size": 1}
                       ]
                }
            ]
       }
              ]
     }
                    ]
       },
       {
        "name": "LG",
        "children": [
         {
          "name": "South",
          "children": [
           {"name": "andhra pradesh",
        "children": [
               {"name": "Guntur",
         "children": [
                   {"name": "20LF460A","size": 1}
                       ]
                }
            ]
      }
              ]
     },
         {
          "name": "North",
          "children": [
           {"name": "bihar",
        "children": [
               {"name": "Patna",
         "children": [
                   {"name": "24LB454A","size": 1},
            {"name": "24LF515A","size": 1},
            {"name": "24LH452A","size": 1},
            {"name": "26LV2130","size": 1}
                       ]
                },
        {"name": "Gaya",
         "children": [
                   {"name": "28LB452A","size": 1}
                       ]
                }
            ]
       },
       {"name": "Chattisgarh",
        "children": [
               {"name": "Raipur",
         "children": [
                   {"name": "32LH576D","size": 1}
                       ]
                }
            ]
       },
       {"name": "delhi",
        "children": [
               {"name": "Delhi",
         "children": [
                   {"name": "24LF458A","size": 1},
                {"name": "24LH454A","size": 1},
            {"name": "32LJ522D","size": 1},
            {"name": "32LJ573D","size": 1},
            {"name": "32LK526BPTA","size": 1}
                       ]
                }
            ]
       }
              ]
     }	
                    ]
       },
       {
        "name": "MI",
        "children": [
         {
          "name": "South",
          "children": [
           {"name": "andhra pradesh",
        "children": [
               {"name": "Guntur",
         "children": [
                   {"name": "6A","size": 2},
            {"name": "redme 7 s 3-32","size": 1},
            {"name": "REDMI NOTE 4 32GB","size": 1},
            {"name": "REDMI note 7 pro","size": 1}
                       ]
                }
            ]
       }
              ]
     },
     {
          "name": "East",
          "children": [
           {"name": "Assam & North East",
        "children": [
               {"name": "Teliamura",
         "children": [
                   {"name": "Redmi 7A 2+16","size": 1}
                       ]
                }
            ]
       }
              ]
     },
         {
          "name": "North",
          "children": [
           {"name": "bihar",
        "children": [
               {"name": "Patna",
         "children": [
                   {"name": "A1 4GB-64GB","size": 1},
            {"name": "mi note 7s","size": 3},
            {"name": "redme note 7s 4-64","size": 1},
            {"name": "REDMI 6 32GB LTE","size": 1}
                       ]
                },
        {"name": "Munger",
         "children": [
                   {"name": "REDMI 6 PRO 32GB DUAL LTE","size": 1},
            {"name": "Redmi 7","size": 2}
                       ]
                },
        {"name": "Gaya",
         "children": [
                   {"name": "REDMI 7A","size": 4},
            {"name": "REDMI note 7 pro","size": 4},
            {"name": "REDMI Y2  3GB-32GB","size": 2}
                       ]
                }
            ]
       },
       {"name": "delhi",
        "children": [
               {"name": "Delhi",
         "children": [
                   {"name": "6A","size": 9},
                {"name": "REDMI 3S","size": 1},
            {"name": "REDMI 7A","size": 3},
            {"name": "Redmi 7A 2+16","size": 1},
            {"name": "REDMI GO","size": 2},
            {"name": "REDMI Y2  3GB-32GB","size": 1},
            {"name": "REDMI Y2 64GB","size": 1},
            {"name": "Redmi Y3","size": 1}
                       ]
                }
            ]
       }
              ]
     },	
         {
          "name": "West",
          "children": [
           {"name": "Gujarat",
        "children":  [
                {"name": "Vadodara",
         "children": [
                       {"name": "REDMI 6 64GB 3GB LTE","size": 2},
                {"name": "REDMI 7A","size": 1}
                       ]
                },
            {"name": "Surat",
          "children": [
                       {"name": "Redmi Y3","size": 1}
                         ]
                }
             ]
       }
             ]
         }  
                   ]       
       },
       {
        "name": "NOKIA",
        "children": [
         {
          "name": "South",
          "children": [
           {"name": "andhra pradesh",
        "children": [
               {"name": "Vijayawada",
         "children": [
                   {"name": "105","size": 2},
            {"name": "1100","size": 1},
            {"name": "1200","size": 2}
                       ]
                }
            ]
       }
              ]
     },
         {
          "name": "North",
          "children": [
           {"name": "delhi",
        "children": [
               {"name": "Delhi",
         "children": [
                   {"name": "105","size": 12},
            {"name": "106","size": 4}
                       ]
                }
            ]
       }
              ]
     }
                    ]
       }
  
  
  ]
  };
       
    hirBarChartV4(d3,this.datahierarchical,this.container.nativeElement.querySelector('#hc'))
  }
  


}
