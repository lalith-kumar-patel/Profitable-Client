import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Getter } from 'src/app/shared/models/getter';
import { Overview } from 'src/app/shared/models/overview';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminHomeService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getGetterNotification(notiId: any, id: any) {
    const url = environment.NotificationAPIUrl +  '/getGetterNotification/' + notiId + '/' + id;
    return this.http.get<Getter>(url)
      .pipe(catchError(this.handleError));
  }

  getOverviewDetails(){
    const url = environment.StaffAPIUrl +  '/getOverviewDetails';
    return this.http.get<Overview>(url)
      .pipe(catchError(this.handleError));
  }

  achievementData(staffData){
    const url = environment.StaffAPIUrl +  '/achievementData';
    return this.http.post<string>(url, staffData, { headers: this.headers, responseType: 'text' as 'json' })
      .pipe(catchError(this.handleError));
  }

  annoucementData(staffData){
    const url = environment.StaffAPIUrl +  '/annoucementData';
    return this.http.post<string>(url, staffData, { headers: this.headers, responseType: 'text' as 'json' })
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
