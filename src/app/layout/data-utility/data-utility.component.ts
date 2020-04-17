import { Component, OnInit,ViewChild } from '@angular/core';
// import { DataSales } from '../../data/DataSalesModel';
// import { ChartService } from 'src/app/shared/services/chart.service'; 
@Component({
  selector: 'app-data-utility',
  templateUrl: './data-utility.component.html',
  styleUrls: ['./data-utility.component.scss']
})
export class DataUtilityComponent implements OnInit {
//  public records: any[] = [];  
//   @ViewChild('csvReader') DataSales: any; 
//   uploadListener($event: any): void {  

//     let text = [];  
//     let files = $event.srcElement.files;  
  
//     if (this.isValidCSVFile(files[0])) {  
  
//       let input = $event.target;  
//       let reader = new FileReader();  
//       reader.readAsText(input.files[0]);  
  
//       reader.onload = () => {  
//         let csvData = reader.result;  
//         let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
//         let headersRow = this.getHeaderArray(csvRecordsArray);  
  
//         this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
//         // let resSTR = JSON.stringify(this.records);
//         // let resJSON = JSON.parse(resSTR);
//         //this.chartService.postSalesData(resJSON).subscribe(resp => {
//       //this.databar = <DataModel[]>resp;
//       var vResponse=resp;
//       alert(resp);
//       // console.log(this.databar);
//     });
//         console.log(resJSON);
         
//       };  
  
//       reader.onerror = function () {  
//         console.log('error is occured while reading file!');  
//       };  
  
//     } else {  
//       alert("Please import valid .csv file.");  
//       this.fileReset();  
//     }  
//   }  
  
//   getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
//     let csvArr = [];  
  
//     for (let i = 1; i < csvRecordsArray.length; i++) {  
//       let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
//       if (curruntRecord.length == headerLength) {  
//         let csvRecord: DataSales = new DataSales();  
//         csvRecord.Date = curruntRecord[0].trim();  
//         csvRecord.User_Code = curruntRecord[1].trim();  
//         csvRecord.Zone = curruntRecord[2].trim();  
//         csvRecord.State = curruntRecord[3].trim();  
//         csvRecord.City = curruntRecord[4].trim();  
//         csvRecord.Category = curruntRecord[5].trim(); 
//         csvRecord.Brand = curruntRecord[6].trim(); 
//         csvRecord.Model_Name = curruntRecord[7].trim(); 
//         csvRecord.Quantity = curruntRecord[8].trim();  
//         csvRecord.Total_Amount = curruntRecord[9].trim();         
//         csvArr.push(csvRecord);  
//       }  
//     }  
//     return csvArr;  
//   }  
  
//   isValidCSVFile(file: any) {  
//     return file.name.endsWith(".csv");  
//   }  
  
//   getHeaderArray(csvRecordsArr: any) {  
//     let headers = (<string>csvRecordsArr[0]).split(',');  
//     let headerArray = [];  
//     for (let j = 0; j < headers.length; j++) {  
//       headerArray.push(headers[j]);  
//     }  
//     return headerArray;  
//   }  
  
//   fileReset() {  
//     this.csvReader.nativeElement.value = "";  
//     this.records = [];  
//   }  
  constructor(/*public chartService: ChartService*/) { }

  ngOnInit() {
  }

}
