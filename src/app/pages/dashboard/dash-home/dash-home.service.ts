import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Getter } from 'src/app/shared/models/getter';
import { Income } from 'src/app/shared/models/income';
import { Provider } from 'src/app/shared/models/provider';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashHomeService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getProviderNotification(notiId: any, id: any) {
    const url = environment.NotificationAPIUrl +  '/getProviderNotification/' + notiId + '/' + id;
    return this.http.get<Provider>(url)
      .pipe(catchError(this.handleError));
  }

  getGetterNotification(notiId: any, id: any) {
    const url = environment.NotificationAPIUrl +  '/getGetterNotification/' + notiId + '/' + id;
    return this.http.get<Getter>(url)
      .pipe(catchError(this.handleError));
  }

  getIncomeDetails(id: number){
    const url = environment.customerAPIUrl +  '/getIncomeDetails/' + id;
    return this.http.get<Income>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    let errMsg = '';
    if (err.error instanceof Error) {
      errMsg = err.error.message;
    } else {
      if (err.status === 0) {
        errMsg = 'A connection to back end can not be established.';
      } else {
        errMsg = JSON.parse(err.error).message;
      }
    }
    return throwError(errMsg);
  }

}
