import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
//import { AdminService } from '../shared/services/admin.service';
import {AdminService} from '../shared/services/admin.service'
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

interface IReturn {
  salesdata: string;
  salesdatabrand: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecordCompService implements Resolve<IReturn> {

  constructor(private _adminService: AdminService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReturn> {
    return forkJoin([this._adminService.getSalesDate(), this._adminService.getSalesDateBrand()])
    .pipe(map(results => ({
      salesdata: results[0],
      salesdatabrand : results[1]
    })
  ));
 }
}
