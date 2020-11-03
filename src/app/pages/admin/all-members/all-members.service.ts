import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from 'src/app/shared/models/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllMembersService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAllMembers() {
    const url = environment.StaffAPIUrl +  '/getAllMembers';
    return this.http.get<Customer[]>(url)
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
