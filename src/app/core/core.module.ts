import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { SharedModule } from 'app/shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoreRoutingModule } from './core-routing.module';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthGuard } from './services/auth-guard.service';
import { CommonService } from './services/common.service';
import { DataService } from './services/data.service';

@NgModule({
  imports: [
    SharedModule,
    CoreRoutingModule,
    HttpClientModule 
  ],
  declarations: [
    LoginComponent,
    NotFoundComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    DataService,
    CommonService
  ]
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
