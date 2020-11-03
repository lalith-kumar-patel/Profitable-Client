import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Staff } from 'src/app/shared/models/staff';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  staff1: Observable<Staff>;

  constructor(private http: HttpClient) { }

  login(staff: Staff): Observable<Staff> {
    const url = environment.StaffAPIUrl + '/staffLogin';
    this.staff1 = this.http.post<Staff>(url, staff, { headers: this.headers })
          .pipe(catchError(this.handleError));
    return this.staff1;
  }

  get(){
    return this.staff1;
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
