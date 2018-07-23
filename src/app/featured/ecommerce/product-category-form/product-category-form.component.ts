import { Component, EventEmitter, ViewEncapsulation, AfterViewInit, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'app/core/services/common.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';

import { ProductCategoryService } from '../shared/product-category.service';

@Component({
  selector: 'product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductCategoryFormComponent implements OnInit, OnDestroy {
  @ViewChild('categoryModal') categoryModal: ModalDirective;
  @Output('save') save: EventEmitter<any> = new EventEmitter();

  category;
  categories: any[] = [];
  modalTitle;

  constructor(
    private categoryService: ProductCategoryService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
  }

  showAddModal() {
    this.category = {};
    this.modalTitle = "New category";
    this.loadProductCategories();
    this.categoryModal.show();
  }

  showEditModal(id) {
    this.categoryService.getById(id).subscribe(category => {
      this.category = category;
      this.loadProductCategories();
      this.modalTitle = "Edit category: " + this.category.name;
      this.categoryModal.show();
    });
  }

  loadProductCategories() {
    this.categories = [];
    this.categoryService.getAll().subscribe((categories: any[]) => {
      let treeCategories: any[] = this.commonService.unflatten(categories);
      treeCategories.forEach(item => this.commonService.getSubTree(item, 0, this.categories))
    });
  }


  hideModal(form: NgForm) {
    form.resetForm();
    this.categoryModal.hide();
  }

  createAlias() {
    this.category.alias = this.commonService.makeSeoTitle(this.category.name);
  }

  saveChanges(form: NgForm) {
    if (this.category.id) {
      this.categoryService.update(this.category).subscribe();
    } else {
      this.categoryService.create(this.category).subscribe();
    }

    this.save.emit(null);
    form.resetForm();
    this.categoryModal.hide();
  }

  ngOnDestroy() {
  }
}
