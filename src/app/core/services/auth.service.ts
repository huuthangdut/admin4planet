import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constants/common.constant';
import { Page } from 'app/shared/constants/page.constant';
import { Url } from 'app/shared/constants/url.constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticateResponse } from '../models/authenticate-response.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    const credential = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password) + "&grant_type=password";

    return this.http.post<AuthenticateResponse>(Url.BaseApiUrl + "/oauth/token", credential, { headers: headers })
      .pipe(
        map((response: AuthenticateResponse) => {
          if (response && response.access_token) {
            this.setAuthenticate(response);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem(CommonConstant.AuthUser);
    this.router.navigate([Page.Login]);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(CommonConstant.AuthUser) != null;
  }

  getCurrentUser(): AuthenticateResponse {
    if (!this.isAuthenticated())
      return null;

    let data = this.getAuthenticate();
    let user: AuthenticateResponse = {
      access_token: data.access_token,
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      avatar: data.avatar,
      roles: data.roles,
      permissions: data.permissions
    };

    return user;
  }

  private removeAuthenticate() {
    localStorage.removeItem(CommonConstant.AuthUser);
  }

  private getAuthenticate() {
    return JSON.parse(localStorage.getItem(CommonConstant.AuthUser));
  }

  private setAuthenticate(token) {
    localStorage.setItem(CommonConstant.AuthUser, JSON.stringify(token));
  }

}