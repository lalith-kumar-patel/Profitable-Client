import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  updateProviderTransaction(provider: any) {
    const url = environment.ProviderAPIUrl + '/providerTransaction';
    return this.http
      .post<string>(url, provider, {
        headers: this.headers,
        responseType: 'text' as 'json',
      })
      .pipe(catchError(this.handleError));
  }

  updateGetterTransaction(getter: any) {
    const url = environment.GetterAPIUrl + '/getterTransaction';
    return this.http
      .post<string>(url, getter, {
        headers: this.headers,
        responseType: 'text' as 'json',
      })
      .pipe(catchError(this.handleError));
  }

  getterRejected(getter: any) {
    const url = environment.GetterAPIUrl + '/getterRejected';
    return this.http
      .post<string>(url, getter, {
        headers: this.headers,
        responseType: 'text' as 'json',
      })
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
