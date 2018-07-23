import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'app/core/services/common.service';

import { ProductCategoryService } from '../shared/product-category.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  id;
  product: any = {};
  categories: any[] = [];
  title;

  tinyinit = {
    selector: "textarea.tinymce",
    themes: "modern",
    autoresize_min_height: 350,
    skin: "lightgray",
    plugins: "autoresize autosave link preview table textcolor image",
    toolbar: "restoredraft link preview table forecolor backcolor image",
    image_caption: true,
    default_link_target: "_blank"
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: ProductCategoryService,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id && this.id != 'new') {
      this.productService.getById(this.id)
        .subscribe(product => {
          this.product = product;
          this.title = "Edit product: " + this.product.name;
        });
    } else {
      this.title = "New product";
    }

    this.categoryService.getAll().subscribe((categories: any) => {
      let parentCategories = this.commonService.unflatten(categories);
      parentCategories.forEach((item) => {
        this.commonService.getSubTree(item, 0, this.categories);
      });
    });
  }

  createAlias() {
    this.product.alias = this.commonService.makeSeoTitle(this.product.name);
  }

  save() {
    if (this.product.id)
      this.productService.update(this.product).subscribe();
    else
      this.productService.create(this.product).subscribe();

    this.navigateToProductList();
  }

  navigateToProductList() {
    this.router.navigate(['/ecommerce/products/']);
  }

}
