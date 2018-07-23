import { Injectable } from '@angular/core';
import { DataService } from 'app/core/services/data.service';
import { CommonService } from 'app/core/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private dataService: DataService, private commonService: CommonService) { }

  getAllWithPaging(pageIndex:number = 1, pageSize:number = 10, filter?: string) {
    return this.dataService.get(`/categories/paging?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`);
  }

  getAll(filter: string = '') {
    return this.dataService.get(`/categories?filter=${filter}`);
  }

  create(productCategory) {
    return this.dataService.post('/categories/', productCategory);
  }

  getById(id) {
    return this.dataService.get(`/categories/${id}`);
  }

  update(productCategory) {
    return this.dataService.put(`/categories/${productCategory.id}`, productCategory);
  }

  delete(id: number) {
    return this.dataService.delete('/categories/' + id);
  }

  getAllWithSubTree() {
    let categories = [];
    this.getAll().subscribe((categories: any) => {
      let parentCategories: any[] = this.commonService.unflatten(categories);
      parentCategories.forEach((item) => {
        this.commonService.getSubTree(item, 0, categories);
      });
    });

    return categories;
  }
 

}
