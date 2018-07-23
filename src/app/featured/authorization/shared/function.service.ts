import { Injectable } from '@angular/core';
import { DataService } from 'app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private dataService: DataService) { }

  getAll() {
    return this.dataService.get('/functions');
  }

  get(id) {
    return this.dataService.get(`/functions/${id}`);
  }
}
