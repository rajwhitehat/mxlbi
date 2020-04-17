import { Component, OnInit } from '@angular/core';
import * as d3 from 'node_modules/jquery/dist/d3.v4.min.js'
import { ChroudService } from 'src/app/shared/services/chroud.service';
import { HttpClient } from '@angular/common/http';
import { _ } from '@ag-grid-community/all-modules';

declare var callDataChord: Function;
@Component({
  selector: 'app-smprofile',
  templateUrl: './smprofile.component.html',
  styleUrls: ['./smprofile.component.scss']
})
export class SmprofileComponent implements OnInit {
  data:any=[];
  colors = {
  "Alcoholic beverages": "#da4480"
  , "Animals and pets": "#5ab449"
  , "Arts and Culture": "#7f5acd"
  , "Banking, Finances and Economy": "#aab740"
  , "Beauty": "#ce58c0"
  , "Children": "#50a26e"
  , "Cinema, Theatre and Musicals": "#d1434b"
  , "Electronics and IT": "#45c0bc"
  , "Energy, Science and Industry": "#ce5929"
  , "Fashion": "#4e7bda"
  , "Food": "#d49d3c"
  , "Health, Hygiene and Wellness": "#6660a3"
  , "Home and Housing": "#7b853c"
  , "Insurers": "#b58dde"
  , "Leisure and Entertainment": "#97622e"
  , "Media": "#609dd6"
  , "Motor": "#e29074"
  , "Music": "#9c4b88"
  , "NGO and Causes": "#ab505f"
  , "Professional Services": "#dc85b6"
  , "Shopping": "#5ab449"
  , "Social Groups": "#7f5acd"
  , "Soft Drinks": "#aab740"
  , "Sports": "#ce58c0"
  , "Technology and Internet": "#50a26e"
  , "Telecommunications": "#d1434b"
  , "Travel": "#45c0bc"
  , "TV and Radio": "#ce5929"
  , "Video Games": "#ce58c0"
  , "Viral Media": "#50a26e"
  , "Women": "#d1434b"
};
  sortOrder:any=[]

  constructor( private http: HttpClient, 
    public chroudChartService: ChroudService) {
      
     }
getColorCode(){
  let letters = "0123456789ABCDEF"; 
  let color = '#'; 
    for (var i = 0; i < 6; i++) 
       color += letters[(Math.floor(Math.random() * 16))]; 
  return color;
}
  ngOnInit() {
    this.chroudChartService.getChroudSalesData().subscribe(res => {      
      this.data=res;      
      let vOrderData=this.data.map(item => item[0])
      .filter((value, index, self) => self.indexOf(value) === index);
      this.sortOrder=JSON.stringify(vOrderData);
      callDataChord(d3,this.data, this.colors, this.sortOrder);
      //this.dates = {to: res, from: res}
      //alert(res);
    });    
  }
}
