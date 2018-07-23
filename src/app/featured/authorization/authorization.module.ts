import { NgModule } from '@angular/core';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { TreeModule } from 'angular-tree-component';
import { SharedModule } from 'app/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './authorization.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleListComponent } from './role-list/role-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  imports: [
    SharedModule,
    AuthorizationRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    MultiselectDropdownModule,
    BsDatepickerModule.forRoot(),
    TreeModule
  ],
  declarations: [
    AuthorizationComponent,
    UserListComponent,
    UserFormComponent,
    RoleListComponent,
    RoleFormComponent
  ]
})
export class AuthorizationModule { }
