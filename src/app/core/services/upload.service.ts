import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private dataService: DataService) { }

  uploadImage(type:string, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);

    return this.dataService.postFile(`/upload/images?type=${type}`, formData);
  }
}
