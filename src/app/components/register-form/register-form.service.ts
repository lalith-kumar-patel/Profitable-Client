import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Customer } from 'src/app/shared/models/customer';
import { OtpSystem } from 'src/app/shared/models/otpSystem';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  registerCustomer(customer: Customer): Observable<string> {
    const url = environment.customerAPIUrl + '/registerCustomer';
    return this.http.post<string>(url, customer, { headers: this.headers, responseType: 'text' as 'json' })
        .pipe(catchError(this.handleError));
  }

  sendOTP(otpSystem: OtpSystem) {
    const url = environment.OTPSystemAPIUrl + '/sendOTP';
    return this.http.post<string>(url, otpSystem, { headers: this.headers, responseType: 'text' as 'json' })
        .pipe(catchError(this.handleError));
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
