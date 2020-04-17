import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})

export class ChartService {
    public chartFilterOption: Subject<any> = new Subject<any>();
    baseUrl: any;
    filterData: any;
    constructor(private http: HttpClient) { }

    get setHeader(): HttpHeaders {
      const headersConfig = {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      };
      return new HttpHeaders( headersConfig );
    }

    public getFilterOptions(data) {
        this.filterData = data;
        console.log('filter checker:',this.filterData)
        this.chartFilterOption.next(data);
    }
  //  postSalesData(json) {debugger;
  //       alert(this.filterData);
  //       let body = new HttpParams().set('key', json);
  //       return this.http.post<any>('https://reqres.in/api/users?page=2', {
  //         body,
  //         headers: this.setHeader,
  //         withCredentials: true}).pipe(
  //           map(response => {
  //               return response;
  //             }),
  //           catchError(this.handleError)
  //         );
  //   }
    getCountryGroupBy() {
        alert(this.filterData);
        return this.http.get<any>('https://reqres.in/api/users?page=2', {
          headers: this.setHeader,
          withCredentials: true}).pipe(
            map(response => {
                return response;
              }),
            catchError(this.handleError)
          );
    }
    handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Server error');
    }
}
