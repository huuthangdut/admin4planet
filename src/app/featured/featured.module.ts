import { NgModule } from '@angular/core';
import { FooterComponent } from 'app/core/components/footer/footer.component';
import { HeaderBarComponent } from 'app/core/components/header-bar/header-bar.component';
import { SideBarComponent } from 'app/core/components/side-bar/side-bar.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { FeaturedRoutingModule } from './featured-routing.module';
import { FeaturedComponent } from './featured.component';
import { SettingsModule } from './settings/settings.module';


@NgModule({
  imports: [
    SharedModule,
    FeaturedRoutingModule,
    DashboardModule,
    EcommerceModule,
    SettingsModule,
    AuthorizationModule
  ],
  declarations: [
    FeaturedComponent,
    HeaderBarComponent,
    SideBarComponent,
    FooterComponent

  ]
})
export class FeaturedModule { }
