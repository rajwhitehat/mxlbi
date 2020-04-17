import { Subject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChroudService {
    constructor(private http: HttpClient) { }
    headersConfig = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'/*,
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials':'true'*/
    };
    getBaseUrl() {
        return 'http://python.n6.iworklab.com/';
    }
    getBaseUrlWithValue(url) {
        return 'http://python.n6.iworklab.com/'+url;
    }
    getChroudSalesData(): Observable<any> {
      return this.http.get<any>(this.getBaseUrlWithValue('app/2'),
      {responseType: 'json', headers: this.headersConfig})
      .pipe(map(response => {    
          return response;
      }), catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return throwError(errMessage);
    }
    return throwError(error || 'Server error');
  }
  }
  