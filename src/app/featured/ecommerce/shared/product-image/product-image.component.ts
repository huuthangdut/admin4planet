import { Component, Input, OnInit } from '@angular/core';
import { UploadService } from 'app/core/services/upload.service';
import { Url } from 'app/shared/constants/url.constant';

import { ProductService } from '../product.service';

@Component({
  selector: 'product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit {
  @Input() productId: number;

  localImageUrl = 'http://www.placehold.it/250x250/EFEFEF/AAAAAA&amp;text=no+image';
  fileToUpload: File;
  baseUrl: string = '';

  images: any[] = []
  image: any = {};

  constructor(
    private productService: ProductService,
    private uploadService: UploadService) { }

  ngOnInit() {
    this.image.productId = this.productId;
    this.loadProductImages(this.productId);
  }

  loadProductImages(productId) {
    this.productService.getImages(productId).subscribe((images: any) => {
      this.images = images;
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    //show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.localImageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  deleteImage(id) {
    // this.productService.deleteImageFromProduct(id).subscribe(() => {
    //   this.loadProductImages(this.productId);
    // });
  }

  save() {
    if (this.fileToUpload) {
      this.uploadService.uploadImage('product', this.fileToUpload)
        .subscribe((response: any) => {
          this.image.path = response.location;
          this.productService.addImageToProduct(this.image).subscribe(() => {
            this.loadProductImages(this.productId);
          })
        });
    }
  }

}