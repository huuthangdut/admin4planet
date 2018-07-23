import { Page } from 'app/shared/constants/page.constant';
import { Url } from 'app/shared/constants/url.constant';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    let user = this.authService.getCurrentUser();
    if(user) return true;
   
    this.router.navigate([Page.Login], {
      queryParams: {
        returnUrl: state.url
      }
    });
    return false;
  }
}