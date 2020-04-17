import { Component,Renderer2, OnInit, ViewChild, OnDestroy,ViewEncapsulation } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { ChartService } from 'src/app/shared/services/chart.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BaseChartDirective } from 'ng2-charts';
import * as d3 from '../../../assets/js/d3.v3.min.js'
// import {SmprofileComponent} from '../smprofile/smprofile.component';
// import {SurveyComponent} from '../survey/survey.component';
// import {SnippetsComponent} from '../components/snippets/snippets.component';
// import { DoubleverticalchartComponent } from '../components/doubleverticalchart/doubleverticalchart.component';
// import { CalenderheatchartComponent } from '../components/calenderheatchart/calenderheatchart.component';
// import { SunbrustchartComponent } from '../components/sunbrustchart/sunbrustchart.component';
// import { NgForOf } from '@angular/common';
import { AdminService } from 'src/app/shared/services/admin.service';
//declare var draddivcustom: Function;
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
  allNumbers: number[] = [];
  kk:any="a";
  lcparentMessage="Sales Graph";
  private _unsubscribeAll: Subject<any>;
  form: FormGroup;
  firstSection = true;
  secondSection = false;
  closeResult: string;
  btnPopup: any;
  content: any;
  dropdownList = [];
  selectedItems = [];
  rightFilterCondition:any=[];
  message:string;
  receiveMessage($event) {   
    this.message = $event;     
    alert(this.message); 
    $event.preventDefault();   
  }

// iSlinechartDiv:boolean=false;
// iSsnippetsDiv:boolean=false;
// iScalenderheatchartDiv:boolean=false;
// iSsunbrustchartDiv:boolean=false;
// iSdoubleverticalchartDiv:boolean=false;
// iStablechartDiv:boolean=false;
// iSindiamapchartDiv:boolean=false;
// iShirbarchartDiv:boolean=false;
// iSline1Div:boolean=false;

  @ViewChild(BaseChartDirective, {static: false}) chart: BaseChartDirective;

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };



print(val: object):void {
  console.log(val);
}
vInputSequence:any=[];
// On change handler
handleOnChange(val: object):void {
  console.log('onChange', val)
}
/*---------end rnd-------------*/
// public getFilterOptions(event) {alert('test1');
//   console.log('hiiiiiiiiiiiii',event.value);
//   //alert(event.value)
// }
  constructor(private _formBuilder: FormBuilder,
              private http: HttpClient, public aChartService:AdminService,
              public chartService: ChartService,               
              private modalService: NgbModal,private renderer: Renderer2) {
      this._unsubscribeAll = new Subject();

      // for (let insertNumbers = 0; insertNumbers <= 10; insertNumbers++) {
      //   this.allNumbers.push(insertNumbers);
      // }
  }
  public removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
  }
  //placeholder="";
  public simpleList = [];
    //  [ { 'name': 'John' },
    //   { 'name': 'Smith' },
    //   { 'name': 'George' },
    // ];
  createForm(): void {
    this.form = this._formBuilder.group({
      drpbrand : []
    });
  }
  subscription: Subscription;
  ngOnInit(): void {
    this.createForm();
    this.dropdownList = [
      { item_id: 1, item_text: 'Samsung' },
      { item_id: 2, item_text: 'LG' },
      { item_id: 3, item_text: 'Onida' },
      { item_id: 4, item_text: 'Sony' },
      { item_id: 5, item_text: 'Panasonic' }
    ];
    this.selectedItems = [
      { item_id: 2, item_text: 'LG' },
      { item_id: 3, item_text: 'Onida' },
      { item_id: 4, item_text: 'Sony' },
    ];
    this.callDynamicChart();
    this.subscription = this.chartService.chartFilterOption.subscribe(
      (message) => {
        console.log('ddddddddddddddddashboard1',this.rightFilterCondition["analysisType"]=="undefined"?"":this.rightFilterCondition["analysisType"])
        this.rightFilterCondition = message;
        //ff=this.rightFilterCondition["analysisType"]
        console.log('ddddddddddddddddashboard2',this.rightFilterCondition)
        console.log('ddddddddddddddddashboard',this.rightFilterCondition["analysisType"])
      }
    );
  }
  saveChartArrangement(){ 

    let UserMenyIdJson:any=[];  
    var x = document.getElementById("MainChartContainer").querySelectorAll(".col-md-4"); 
    x.forEach(element => {
      UserMenyIdJson.push(this.vInputSequence.find(p=>p.id==element.id));
      //console.log(this.vInputSequence.find(p=>p.id==element.id));
    });
    //this.vInputSequence
   this.aChartService.postChartAllotmentMasterUserData(JSON.stringify(UserMenyIdJson)).subscribe(res => {                         
    this.vInputSequence=[];
    this.vInputSequence=UserMenyIdJson;
    alert('Save sucessfully.')
  });
    //alert('hi');
  }
callDynamicChart(){
  var vchartContainer=document.getElementById('chartContainer')
 // var vchartContainerMain=document.getElementById('container')
  this.aChartService.getChartAllotmentMasterData().subscribe(res => {                   
  this.vInputSequence=res["response"][1]; 
  this.simpleList=res["response"][1];
  console.log(this.simpleList);
  //end rnd
  // let vRowChecker=0;
  // for (let entry of this.vInputSequence) {
  //   //document.getElementById(entry["divid"]).classList.add("list-item");
  //   switch(entry["divid"]){
  //     case "linechartDiv":this.iSlinechartDiv=true; break;
  //     case "snippetsDiv":this.iSsnippetsDiv=true;break;
  //     case "calenderheatchartDiv":this.iScalenderheatchartDiv=true;break;
  //     case "sunbrustchartDiv":this.iSsunbrustchartDiv=true;break;
  //     case "doubleverticalchartDiv":this.iSdoubleverticalchartDiv=true;break;
  //     case "tablechartDiv":this.iStablechartDiv=true;break;
  //     case "indiamapchartDiv":this.iSindiamapchartDiv=true;break;
  //     case "hirbarchartDiv":this.iShirbarchartDiv=true;break; 
  //     case "line1Div":this.iSline1Div=true;break;     
  //   }
  // //  if(vRowChecker+entry["width"]<13)
  // //  {
  // //    if(vRowChecker==0){
  // //     var vRowdiv = document.createElement('div');
  // //     vRowdiv.className = 'row mb-3';
  // //     vchartContainer.appendChild(vRowdiv);
  // //    }
  // //   vRowChecker=vRowChecker+entry["width"];
  // //   vRowdiv.appendChild(document.getElementById(entry["divid"]));
  // //  }
  // //  else{
  // //   vRowChecker=entry["width"];
  // //   var vRowdiv = document.createElement('div');
  // //   vRowdiv.className = 'row mb-3';
  // //   vchartContainer.appendChild(vRowdiv);
  // //   vRowdiv.appendChild(document.getElementById(entry["divid"]));
  // //  }  
  // // if(vRowChecker+entry["width"]<13)
  // //  {
  // //   //  if(vRowChecker==0){
  // //   //   var vRowdiv = document.createElement('div');
  // //   //   vRowdiv.className = 'row mb-3';
  // //   //   vchartContainer.appendChild(vRowdiv);
  // //   //  }
  // //   // vRowChecker=vRowChecker+entry["width"];
  // //   // vRowdiv.appendChild(document.getElementById(entry["divid"]));
  // //   vchartContainer.appendChild(document.getElementById(entry["divid"]));
  // //   //vchartContainer.appendChild(document.getElementById(entry["divid"]));
  // //  }
  // //  else{
  // //   vRowChecker=entry["width"];
  // //   // var vRowdiv = document.createElement('div');
  // //   // vRowdiv.className = 'row mb-3';
  // //   // vchartContainer.appendChild(vRowdiv);
  // //    //vRowdiv.appendChild(document.getElementById(entry["divid"]));
  // //    vchartContainer.appendChild(document.getElementById(entry["divid"]));
  // //   //vchartContainer.appendChild(document.getElementById(entry["divid"]));
  // //  }  
  // }
  //vchartContainer.appendChild(vRowdiv);
  //vchartContainerMain.appendChild(vRowdiv);
 }); 
 //draddivcustom();
}

  ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete(); 
  }


  public chartHovered(e: any): void {
  }

  onSelectAll(items: any) {
      console.log(items);
  }
  popupDivID:any='';
  showFullScreenParent(id){
    this.popupDivID=id;
    console.log('click chart id:',id);
    document.getElementById('btnPopup1').click();
  }
  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  first_section(){
      this.firstSection = true;
      this.secondSection = !this.first_section;
  }
  second_section(){
      this.secondSection = true;
      this.firstSection = !this.secondSection;
  }
}
