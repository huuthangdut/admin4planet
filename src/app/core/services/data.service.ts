import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from 'app/shared/constants/url.constant';

import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  get(url: string) {
    return this.http.get(Url.BaseApiUrl + url, { headers: this.getRequestHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  post(url: string, resource) {
    return this.http.post(Url.BaseApiUrl + url, JSON.stringify(resource), { headers: this.getRequestHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  put(url: string, resource) {
    return this.http.put(Url.BaseApiUrl + url, JSON.stringify(resource), { headers: this.getRequestHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(url: string) {
    return this.http.delete(Url.BaseApiUrl + url, { headers: this.getRequestHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  postFile(url: string, formData: FormData) {
    let headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      'Authorization': "Bearer " + this.authService.getCurrentUser().access_token
    });

    return this.http.post(Url.BaseApiUrl + url, formData, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );;
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  private getRequestHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
    });

    let user = this.authService.getCurrentUser();
    if (user && user.access_token) {
      headers.append("Authorization", "Bearer " + user.access_token);
    }
    return headers;
  }

}
