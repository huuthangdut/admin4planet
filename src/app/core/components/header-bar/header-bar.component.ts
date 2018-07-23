import { AuthService } from 'app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticateResponse } from 'app/core/models/authenticate-response.models';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  currentUser: AuthenticateResponse;
  constructor(private authService: AuthService) { }

  ngOnInit() {
     this.currentUser = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }

}
