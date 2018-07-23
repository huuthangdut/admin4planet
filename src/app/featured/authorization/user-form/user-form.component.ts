import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService } from 'app/core/services/upload.service';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { RoleService } from '../shared/role.service';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @ViewChild('userModal') userModal: ModalDirective;
  @ViewChild('avatar') avatar;
  @Output() save: EventEmitter<any> = new EventEmitter();
  user: User;
  roles;

  modalTitle;
  localUrl: any = 'http://www.placehold.it/128x128/EFEFEF/AAAAAA&amp;text=no+image';
  showInputPassword: boolean;

  // Settings configuration
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn green',
    dynamicTitleMaxItems: 5,
    displayAllSelectedText: true,
    containerClasses: 'dropdown-container',
    itemClasses: 'dropdown-item'

  }
  // Text configuration
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'role selected',
    checkedPlural: 'roles selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select user role..',
    allSelected: 'All roles selected',
  };

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private uploadService: UploadService) { }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getAll().subscribe((roles: any) => {
      this.roles = [];
      for (let role of roles) {
        this.roles.push({ id: role.name, name: role.name });
      }
    });
  }


  showPreviewAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  showAddModal() {
    this.user = new User();
    this.showInputPassword = true;
    this.modalTitle = "New user";
    this.userModal.show();
  }

  showEditModal(id) {
    this.userService.getById(id).subscribe((user: User) => {
      this.user = user;
      this.showInputPassword = false;
      this.modalTitle = "Edit user: " + this.user.userName;
      this.user.birthDate = moment(new Date(this.user.birthDate)).format('DD/MM/YYYY');
      this.userModal.show();
    })
  }

  hideModal(form: NgForm) {
    this.userModal.hide();
    form.resetForm();
  }

  saveChanges(form: NgForm) {
    // let fileImage = this.avatar.nativeElement;
    // if (fileImage.files.length > 0) {
    //   this.uploadService.uploadImage('avatar', fileImage.files[0])
    //     .subscribe((response: any) => {
    //       this.user.avatar = response.location;
    //     });
    // }

    // this.user.birthDate = moment(new Date(this.user.birthDate)).format('DD/MM/YYYY');
    this.user.birthDate = '30/04/1997';

    if (this.user.id) {
      this.userService.update(this.user).subscribe();
    } else {
      this.userService.create(this.user).subscribe();
    }

    this.save.emit(null);
    form.resetForm();
    this.userModal.hide();
  }

}
