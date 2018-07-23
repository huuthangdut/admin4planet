import { Injectable } from '@angular/core';
import { DataService } from 'app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private dataService: DataService) { }

  getAllWithPaging(pageIndex: number = 1, pageSize: number = 10, filter: string = '') {
    return this.dataService.get(`/roles/paging?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`);
  }

  getAll(filter: string = '') {
    return this.dataService.get(`/roles?filter=${filter}`);
  }

  getById(id) {
    return this.dataService.get(`/roles/${id}`);
  }

  create(role) {
    return this.dataService.post('/roles/', role);
  }

  update(role) {
    return this.dataService.put(`/roles/${role.id}`, role);
  }

  delete(id) {
    return this.dataService.delete('/roles/' + id);
  }

  deleteMulti(ids: any[]) {
    let resource = JSON.stringify(ids);
    return this.dataService.delete(`/roles?ids=${resource}`);
  }
}
