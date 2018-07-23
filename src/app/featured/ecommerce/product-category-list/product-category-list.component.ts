import { Subscription } from 'rxjs';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { ProductCategoryService } from '../shared/product-category.service';
import { CommonService } from 'app/core/services/common.service';
import { ModalDirective } from 'ngx-bootstrap';

declare var $;

@Component({
  selector: 'product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductCategoryListComponent implements OnInit {
  categoryNodes: any[] = [];

  constructor(
    private categoryService: ProductCategoryService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.loadData();
  }


  loadData() {
    this.categoryService.getAll().subscribe((response: any[]) => {
      this.categoryNodes = this.commonService.unflatten(response);
      console.log(this.categoryNodes);
    });
  }

  deleteItem(id) {
    this.categoryService.delete(id).subscribe(() => this.loadData());
  }

}
