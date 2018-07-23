import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { EcommerceComponent } from './ecommerce.component';
import { ProductCategoryFormComponent } from './product-category-form/product-category-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';

const routes: Routes = [
  {
    path: '', component: EcommerceComponent, children: [
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductFormComponent },
      { path: 'products/new', component: ProductFormComponent },
      { path: 'categories', component: ProductCategoryListComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/:id', component: OrderDetailComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
