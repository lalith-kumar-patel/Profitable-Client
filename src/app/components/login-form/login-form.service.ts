import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Customer } from 'src/app/shared/models/customer';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  cust: Observable<Customer>;

  constructor(private http: HttpClient) { }

  login(customer: Customer): Observable<Customer> {
    const url = environment.customerAPIUrl + '/customerLogin';
    this.cust = this.http.post<Customer>(url, customer, { headers: this.headers })
          .pipe(catchError(this.handleError));
    return this.cust;
  }

  get(){
    return this.cust;
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    let errMsg = '';
    if (err.error instanceof Error) {
      errMsg = err.error.message;
      console.log(errMsg);
    } else if (typeof err.error === 'string') {
      errMsg = JSON.parse(err.error).message;
    } else {
      if (err.status === 0) {
        errMsg = 'A connection to back end can not be established.';
      } else {
        errMsg = err.error.message;
      }
    }
    return throwError(errMsg);
  }
}
