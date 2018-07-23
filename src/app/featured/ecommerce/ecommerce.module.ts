import { NgModule } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TreeModule } from 'angular-tree-component';
import { SharedModule } from 'app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { EcommerceComponent } from './ecommerce.component';
import { ProductCategoryFormComponent } from './product-category-form/product-category-form.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCategoryService } from './shared/product-category.service';
import { ProductImageComponent } from './shared/product-image/product-image.component';
import { ProductService } from './shared/product.service';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  imports: [
    SharedModule,
    EcommerceRoutingModule,
    PaginationModule.forRoot(),
    EditorModule,
    ModalModule.forRoot(),
    TreeModule
  ],
  declarations: [
    ProductListComponent,
    ProductImageComponent,
    ProductFormComponent,
    ProductCategoryListComponent,
    ProductCategoryFormComponent,
    EcommerceComponent,
    OrderListComponent,
    OrderDetailComponent
  ],
  providers: [
    ProductService,
    ProductCategoryService
  ]
})
export class EcommerceModule { }
