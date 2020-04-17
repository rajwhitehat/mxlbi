import { Component,ViewChild , OnInit } from '@angular/core';
import {ClientSideRowModelModule, GridOptions,AllCommunityModules,Module} from "@ag-grid-community/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-chartallotment',
  templateUrl: './chartallotment.component.html',
  styleUrls: ['./chartallotment.component.scss']
})
export class ChartallotmentComponent implements OnInit {
    form: FormGroup;
    orders = [];
    vLeftGridData:any=[];
    vRightGridData:any=[];
    loadGrid:Boolean=false;
  ngOnInit() { 
    this.aChartService.getChartAllotmentMasterData().subscribe(res => {                     
       this.vLeftGridData=res["response"][0];
       this.vRightGridData=res["response"][1];
       this.creatData();
       this.loadGrid =true;
           });     
  }
  vData3:any=[];
  constructor(private formBuilder: FormBuilder,private http: HttpClient, 
    public aChartService: AdminService) {   
        
    this.form = this.formBuilder.group({
      orders: ['']
    });

    // async orders
    of(this.getOrders()).subscribe(orders => {
      this.orders = orders;
      this.form.controls.orders.patchValue(this.orders[0].id);
    });

    // synchronous orders
    // this.orders = this.getOrders();
    // this.form.controls.orders.patchValue(this.orders[0].id);
  }

  getOrders() {
    return [
    //   { id: '0', name: 'Select Form' },
      { id: '1', name: 'Main' }
    ];
  }
  rowIdSequence = 100;
    columnDefs = [
        // {field: "id", dndSource: true},
        {field: "name",dndSource: true},
        // {field: "width"},
        // {field:"userid"},
        // {field:"FormID"}
    ];
    saveUserwiseChartDtls(){        
        this.aChartService.postChartAllotmentMasterUserData(JSON.stringify(this.rightGridOptions.rowData)).subscribe(res => {                         
            alert('Save sucessfully.')
      });     
    }
  modules = [ClientSideRowModelModule];

 
  rightGridOptions: GridOptions;
  leftGridOptions: GridOptions;
  creatData() { 
    // this.vLeftGridData =  [{"id":"7","divid":"linechartDiv","width":6,"name":"Line Chart"},
    // {"id":"1","divid":"snippetsDiv","width":6,"name":"Snippets"},
    // {"id":"2","divid":"calenderheatchartDiv","width":12,"name":"Calender Chart"},
    // {"id":"3","divid":"sunbrustchartDiv","width":12,"name":"Sunbrust Chart"},
    // {"id":"4","divid":"doubleverticalchartDiv","width":12,"name":"Double Vertical Chart"},
    // {"id":"5","divid":"tablechartDiv","width":8,"name":"Table Chart"},
    // {"id":"6","divid":"indiamapchartDiv","width":4,"name":"India Map"}
    // ];
    //console.log(this.vLeftGridData);
    this.leftGridOptions = {
      defaultColDef: {
          width: 80,
          sortable: true,
          filter: true,
          resizable: true,
      },
      rowHeight: 60,
      // rowClassRules: {
      //     "red-row": 'data.id%2 == 0',
      //     "green-row": 'data.id%2 != 0'
      // },
      getRowNodeId: function (data) {
          return data.id
      },
      rowData: this.vLeftGridData,
      rowDragManaged: true,
      animateRows: true
  };
  
  this.rightGridOptions = {
      defaultColDef: {
          width: 80,
          sortable: true,
          filter: true,
          resizable: true
      },
      rowHeight: 60,
      // rowClassRules: {
      //   "red-row": 'data.id%2 == 0',
      //   "green-row": 'data.id%2 != 0'
      // },
      getRowNodeId: function (data) {
          return data.id
      },
      rowData:  this.vRightGridData,
      rowDragManaged: true,
      animateRows: true
  };
  }
  
//   createDataItem(color) {
//       return {
//           id: this.rowIdSequence++,
//           color: color,
//           value1: Math.floor(Math.random() * 100),
//           value2: Math.floor(Math.random() * 100)
//       };
//   }

  binDragOver(event) {
      var dragSupported = event.dataTransfer.types.indexOf('application/json') >= 0;
      if (dragSupported) {
          event.dataTransfer.dropEffect = "move";
          event.preventDefault();          
      }
  }

  binDrop(event) {debugger;
      event.preventDefault();
      var jsonData = event.dataTransfer.getData("application/json");
      var data = JSON.parse(jsonData);

      // if data missing or data has no id, do nothing
      if (!data || data.id == null) {
          return;
      }

      var transaction = {
          remove: [data]
      };

      var rowIsInLeftGrid = !!this.leftGridOptions.api.getRowNode(data.id);
      if (rowIsInLeftGrid) {
          this.leftGridOptions.api.updateRowData(transaction);
      }
      var rowIsInRightGrid = !!this.rightGridOptions.api.getRowNode(data.id);
      if (rowIsInRightGrid) {
          this.rightGridOptions.api.updateRowData(transaction);       
          this.rightGridOptions.rowData = this.rightGridOptions.rowData.
          filter(item => item.id !== data.id);
          //console.log(this.rightGridOptions.rowData);
      }
  }

  dragStart(event, color) {
    console.log(event)
    console.log(color)
      // var newItem = this.createDataItem(color);
      // var jsonData = JSON.stringify(newItem);
      // var userAgent = window.navigator.userAgent;
      // var isIE = userAgent.indexOf('Trident/') >= 0;
      // event.dataTransfer.setData(isIE ? 'text' : 'application/json', jsonData);
  }

  gridDragOver(event) {
      var dragSupported = event.dataTransfer.types.length;

      if (dragSupported) {
          event.dataTransfer.dropEffect = "copy";
          event.preventDefault();          
      }
  }

  gridDrop(event, grid) {debugger;
      event.preventDefault();

      var userAgent = window.navigator.userAgent;
      var isIE = userAgent.indexOf('Trident/') >= 0;
      var jsonData = event.dataTransfer.getData(isIE ? 'text' : 'application/json');
      var data = JSON.parse(jsonData);
      console.log('new', data);
      

      // if data missing or data has no it, do nothing
      if (!data || data.id == null) {
          return;
      }

      var gridApi = grid == 'left' ? this.leftGridOptions.api : this.rightGridOptions.api;

      // do nothing if row is already in the grid, otherwise we would have duplicates
      var rowAlreadyInGrid = !!gridApi.getRowNode(data.id);
      if (rowAlreadyInGrid) {
          console.log('not adding row to avoid duplicates in the grid');
          return;
      }
      else{
        this.rightGridOptions.rowData.push(data);
      }

      var transaction = {
          add: [data]
      };
      gridApi.updateRowData(transaction);
  }

  onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
  };

}
