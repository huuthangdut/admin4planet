import { CommonService } from './../../services/common.service';
import { AfterViewInit, Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'app/core/models/user-login.models';
import { AuthService } from 'app/core/services/auth.service';
import { Page } from 'app/shared/constants/page.constant';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, AfterViewInit {
    user: UserLogin = new UserLogin();

    constructor(
        private commonService: CommonService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        
    }

    ngAfterViewInit() {
        this.commonService.loadScript(
            'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
            'assets/global/plugins/jquery-validation/js/additional-methods.min.js',
            'assets/global/plugins/select2/js/select2.full.min.js',
            'assets/global/plugins/backstretch/jquery.backstretch.min.js',
            'assets/pages/scripts/login-5.min.js'
        );
    }

    login() {
        this.authService.login(this.user.username, this.user.password)
            .subscribe(data => {
                if (data) {
                    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                    if (returnUrl)
                        this.router.navigate([returnUrl]);
                    this.router.navigate([Page.DashBoard]);
                }
            }, error => {
                console.log(error);
            });
    }

}
