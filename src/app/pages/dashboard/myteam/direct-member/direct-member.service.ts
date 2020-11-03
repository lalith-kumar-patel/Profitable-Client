import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DirectMember } from 'src/app/shared/models/directMember';

@Injectable({
  providedIn: 'root'
})
export class DirectMemberService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getDirectMembers(id: any) {
    const url = environment.MyTeamAPIUrl +  '/directMember/' + id;
    return this.http.get<DirectMember[]>(url)
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
