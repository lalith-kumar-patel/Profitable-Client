import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Customer } from 'src/app/shared/models/customer';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsFormService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }


  updateCustomerDetails(customer: Customer): Observable<string> {
    const url = environment.customerAPIUrl +  '/updateProfile';
    return this.http.post<string>(url, customer, { headers: this.headers, responseType: 'text' as 'json' })
      .pipe(catchError(this.handleError));
  }

  changePassword(customer: Customer): Observable<string> {
    const url = environment.customerAPIUrl +  '/changePassword';
    return this.http.post<string>(url, customer, { headers: this.headers, responseType: 'text' as 'json' })
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
