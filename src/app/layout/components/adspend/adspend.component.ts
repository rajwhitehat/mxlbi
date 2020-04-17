import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Options } from 'ng5-slider';
import { AdminService } from 'src/app/shared/services/admin.service';
import { HttpClient } from '@angular/common/http';
interface SimpleSliderModel {
  value: number;
  options: Options;
}
declare var drawBarReverse:Function;
interface RangeSliderModel {
  minValue: number;
  maxValue: number;
  options: Options;
}
@Component({
  selector: 'app-adspend',
  templateUrl: './adspend.component.html',
  styleUrls: ['./adspend.component.scss'],
  animations: [routerTransition()]
})
export class AdspendComponent implements OnInit {
  vFilterData:any= [];
  datarevbar:any=[];
  //form: FormGroup;
  //vFilterData:any=[];
  //control: FormControl = new FormControl([20, 80]);
  getChartReverseData(vFilterData){
    this.aChartService.postReverseChartDataV2(vFilterData[0]).subscribe(res => { 
      console.log('responselog:=',res) 
      drawBarReverse(res,"reversechart2");                       
});
  }
  valueChangeFun(){
    this.vFilterData=[
      {tv_spons:this.verticalSlider1.value,
        tv_cric:this.verticalSlider2.value,
        tv_ron:this.verticalSlider3.value,
        tv_radio:this.verticalSlider4.value,
        npp:this.verticalSlider5.value,
        magazine:this.verticalSlider6.value}];  
        this.getChartReverseData(this.vFilterData);     
  }
  //let vData:JSON=[{tv_spons:this.verticalSlider1.value,tv_cric:this.verticalSlider2.value}];
  options: Options = {
    floor: 0,
    ceil: 100,
    vertical:true
  };
  lcparentMessage="Origional Vs Optimized Values";
  barMessage="Bar Chart AS";
  barReverseMessage="reversechart";
  barReverseMessage2="reversechart2";
  verticalSlider1: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      vertical: true
    }
  };

  verticalSlider2: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      vertical: true
    }
  };

  verticalSlider3: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      vertical: true
    }
  };

  verticalSlider4: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      vertical: true
    }
  };

  verticalSlider5: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      vertical: true
    }
  };

  verticalSlider6: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      vertical: true
    }
  };
  constructor(private _formBuilder: FormBuilder,private http: HttpClient, public aChartService:AdminService) { }
  // createForm(): void {
  //   this.form = this._formBuilder.group({
  //     drpbrand : []
  //   });
  // }
  ngOnInit() {
   // this.createForm();
    this.valueChangeFun();
    this.datarevbar = [100, -100, -150, 55, 150, 120, 450, 980, 1200];
    drawBarReverse(this.datarevbar,"reversechart2");
  }
}
