import { Component, OnDestroy, OnInit } from '@angular/core';
import { PagedResult } from 'app/shared/models/paged-result.models';
import { Subscription } from 'rxjs';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  items: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number;
  filter: string;

  selectedAll: any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadData();
  }


  loadData() {
    this.productService.getAll(this.currentPage, this.pageSize, this.filter)
      .subscribe((response: PagedResult<Product>) => {
        this.items = response.items;
        this.currentPage = response.pageIndex;
        this.pageSize = response.pageSize;
        this.totalItems = response.totalItems;
      });
  }

  deleteItem(id) {
    this.productService.delete(id).subscribe(() => this.loadData());
  }

  deleteMultiItem() {
    let selectedIds = this.items.filter(i => i.selected).map(i => i.id);
    this.productService.deleteMulti(selectedIds)
      .subscribe(() => this.loadData());
  }

  selectAll() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.items.every(function (item: any) {
      return item.selected == true;
    });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.loadData();
  }

  pageSizeChanged(pageSize) {
    if (pageSize > this.totalItems)
      this.pageSize = this.totalItems;
    else this.pageSize = pageSize;
    this.loadData();
  }
}
