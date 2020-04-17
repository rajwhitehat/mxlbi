import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';
import { HttpClient } from '@angular/common/http';
declare var drawBarReverse:Function;
@Component({
  selector: 'app-barreversechart',
  templateUrl: './barreversechart.component.html',
  styleUrls: ['./barreversechart.component.scss']
})
export class BarreversechartComponent implements OnInit {
  rcform: FormGroup;
  createForm(): void {  
    this.rcform = this._formBuilder.group({
     // drpbrand : []
    });
  }
  @Input() childMessage: string;
  data:any=[];
  @Input() inputvFilterData:[];
  ngOnChanges(changes) {
    if(changes.inputvFilterData.previousValue==undefined && changes.inputvFilterData.currentValue!=undefined)
    {
      console.log('bar reverse chart check child filter',this.inputvFilterData);
      this.getChartReverseData(this.inputvFilterData);
    }
    else if (changes.inputvFilterData.previousValue!=changes.inputvFilterData.currentValue){
      console.log('bar reverse chart check child filter',this.inputvFilterData);
      this.getChartReverseData(this.inputvFilterData);
    }
  }
  getChartReverseData(vFilterData){
    this.aChartService.postReverseChartDataV1(vFilterData[0]).subscribe(res => { 
      console.log('responselog:=',res)                        
      drawBarReverse(res,this.childMessage);
});
  }
  constructor(private _formBuilder: FormBuilder,private http: HttpClient, public aChartService:AdminService) { }

  ngOnInit() {
    this.createForm();
    console.log('revbar chart load start :',this.childMessage);
    this.data = [100, -100, -150, 55, 150, 120, 450, 980, 1200];
    drawBarReverse(this.data,this.childMessage);
    console.log('revbar chart load end :',this.childMessage);
  }

}
