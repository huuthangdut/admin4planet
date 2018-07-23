import { Injectable } from '@angular/core';
import { DataService } from 'app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private dataService: DataService) { }

  getAll(pageIndex = 1, pageSize = 10, filter = "") {
    return this.dataService.get(`/products?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getById(id) {
    return this.dataService.get(`/products/${id}`);
  }

  create(product) {
    return this.dataService.post(`/products`, product);
}

  update(product) {
    return this.dataService.put(`/products/${product.id}`, product);
  }
  
  delete(id) {
    return this.dataService.delete(`/products/${id}`);
  }

  deleteMulti(ids:any[]) {
    let resource = JSON.stringify(ids);
    return this.dataService.delete(`/products?ids=${resource}`);
  }

  getImages(productId) {
    return this.dataService.get(`/products/${productId}/images`);
  }

  addImageToProduct(image) {
    return this.dataService.post(`/products/images`, image);
  }

  deleteImageFromProduct(imageId) {
    return this.dataService.delete(`/products/images/${imageId}`);
  }
}
