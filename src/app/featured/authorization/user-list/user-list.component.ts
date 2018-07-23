import { Subscription } from 'rxjs';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { PagedResult } from 'app/shared/models/paged-result.models';
import { Url } from 'app/shared/constants/url.constant';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit, OnDestroy {
  items: User[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number;
  filter: string;

  baseUrl: string = Url.BaseUrl;

  selectedAll: any;

  subcription: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.subcription = this.userService.getAllWithPaging(this.currentPage, this.pageSize, this.filter)
      .subscribe((response: PagedResult<User>) => {
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
    this.userService.delete(id).subscribe(() => this.loadData());
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

  deleteUsers() {
    this.userService.deleteMulti(this.getSelectedId()).subscribe(() => this.loadData());
  }

  activeUsers() {
    this.userService.active(this.getSelectedId()).subscribe(() => this.loadData());
  }

  deactiveUsers() {
    this.userService.deactive(this.getSelectedId()).subscribe(() => this.loadData());
  }

  private getSelectedId() {
    return this.items.filter(i => i.selected).map(i => i.id);
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();

  }

}
