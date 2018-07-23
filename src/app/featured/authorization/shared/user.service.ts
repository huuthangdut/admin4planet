import { Injectable } from '@angular/core';
import { DataService } from 'app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dataService: DataService) { }

  getAllWithPaging(pageIndex: number = 1, pageSize: number = 10, filter: string = '') {
    return this.dataService.get(`/users/paging?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`);
  }

  getAll(filter: string = '') {
    return this.dataService.get(`/users?filter=${filter}`);
  }

  getById(id) {
    return this.dataService.get(`/users/${id}`);
  }

  create(user) {
    return this.dataService.post('/users/', user);
  }

  update(user) {
    return this.dataService.put(`/users/${user.id}`, user);
  }

  delete(id) {
    return this.dataService.delete(`/users/${id}`);
  }

  deleteMulti(ids: any[]) {
    let resource = JSON.stringify(ids);
    return this.dataService.delete(`/users?ids=${resource}`);
  }

  active(ids: any[]) {
    let resource = JSON.stringify(ids);
    return this.dataService.post(`/users/active`, resource);
  }

  deactive(ids: any[]) {
    let resource = JSON.stringify(ids);
    return this.dataService.post(`/users/deactive`, resource);
  }
}
