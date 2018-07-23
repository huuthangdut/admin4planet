import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedComponent } from './featured.component';

const routes: Routes = [
  {
    path: '', component: FeaturedComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/featured/dashboard/dashboard.module#DashboardModule' },
      { path: 'auth', loadChildren: 'app/featured/authorization/authorization.module#AuthorizationModule' },
      { path: 'ecommerce', loadChildren: 'app/featured/ecommerce/ecommerce.module#EcommerceModule' },
      { path: 'settings', loadChildren: 'app/featured/settings/settings.module#SettingsModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturedRoutingModule { }
