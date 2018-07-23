import { Component, OnInit } from '@angular/core';
import { RoleService } from '../shared/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  items: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number;
  filter: string;

  selectedAll: any;

  constructor(private roleService: RoleService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.roleService.getAllWithPaging(this.currentPage, this.pageSize, this.filter)
      .subscribe((response: any) => {
        this.items = response.items;
        this.currentPage = response.pageIndex;
        this.pageSize = response.pageSize;
        this.totalItems = response.totalItems;
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

  deleteItem(id: string) {
    this.roleService.delete(id).subscribe(() => this.loadData());

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

  deleteRoles() {
    this.roleService.deleteMulti(this.getSelectedId()).subscribe(() => this.loadData());
  }

  private getSelectedId() {
    return this.items.filter(i => i.selected).map(i => i.id);
  }
}
