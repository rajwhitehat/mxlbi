import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
@Injectable({
  providedIn: 'root'
})
export class DoubleverticalService {
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
  getDoubleVerticalSalesData(): Observable<any> {
    return this.http.get<any>(this.getBaseUrlWithValue('app/1'),
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
