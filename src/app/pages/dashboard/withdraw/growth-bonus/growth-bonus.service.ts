import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Getter } from 'src/app/shared/models/getter';

@Injectable({
  providedIn: 'root'
})
export class GrowthBonusService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }


  withdrawGrowth(getter: Getter): Observable<string> {
    const url = environment.WithdrawAPIUrl +  '/withdrawGrowth';
    return this.http.post<string>(url, getter, { headers: this.headers, responseType: 'text' as 'json' })
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
