import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Commitment } from 'src/app/shared/models/commitment';

@Injectable({
  providedIn: 'root'
})
export class ReCommitmentService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }


  reCommitment(commitment: Commitment): Observable<string> {
    const url = environment.customerAPIUrl +  '/reCommitment';
    return this.http.post<string>(url, commitment, { headers: this.headers, responseType: 'text' as 'json' })
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
