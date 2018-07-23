import { map } from 'rxjs/operators';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'app/core/services/common.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';

import { FunctionService } from '../shared/function.service';
import { RoleService } from '../shared/role.service';

@Component({
  selector: 'role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  @ViewChild('roleModal') roleModal: ModalDirective;
  @Output('save') save: EventEmitter<any> = new EventEmitter();

  role: any = {};
  modalTitle;
  nodes: any[] = [];

  constructor(
    private roleService: RoleService,
    private functionService: FunctionService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
  }

  showAddModal() {
    this.role = {};
    this.modalTitle = "New role";
    this.functionService.getAll().subscribe((functions: any[]) => {
      let tempNodes: any[] = [];
      functions.forEach(f => {
        tempNodes.push({
          id: f.id,
          name: f.name,
          parentId: f.parentId,
          canRead: false,
          canDelete: false,
          canUpdate: false,
          canCreate: false
        });
      });
      this.nodes = this.commonService.unflatten(tempNodes);

      console.log(this.nodes);
    })
    this.roleModal.show();
  }

  showEditModal(id: string) {
    this.roleService.getById(id).subscribe(role => {
      this.role = role;
      let tempNodes: any[] = [];
      this.role.permissions.forEach(p => {
        tempNodes.push({
          id: p.functionId,
          name: p.function.name,
          parentId: p.function.parentId,
          canRead: p.canRead,
          canDelete: p.canDelete,
          canUpdate: p.canUpdate,
          canCreate: p.canCreate,
        });
      });

      this.nodes = this.commonService.unflatten(tempNodes);
      this.modalTitle = "Edit role: " + this.role.name;
      this.roleModal.show();
    })
  }

  hideModal(form: NgForm) {
    this.roleModal.hide();
    form.resetForm();
  }

  private updatePermissions(roleId, item, arr: any[]) {
    arr.push({
      roleId: roleId,
      functionId: item.id,
      canCreate: item.canCreate,
      canUpdate: item.canUpdate,
      canDelete: item.canDelete,
      canRead: item.canRead
    });

    if (item.children) {
      item.children.forEach(i => {
        this.updatePermissions(roleId, i, arr);
      });
    }
  }

  checkAllChildren(node) {
    if (node.children) {
      node.children.forEach(i => {
        i.canRead = node.canRead,
          i.canUpdate = node.canUpdate,
          i.canDelete = node.canDelete,
          i.canCreate = node.canCreate
      });
    }

    let parent = this.nodes.filter(item => item.id == node.parentId);
    parent.forEach(p => {
      p.canRead = p.children.every(item => item.canRead == true);
      p.canCreate = p.children.every(item => item.canCreate == true);
      p.canUpdate = p.children.every(item => item.canUpdate == true);
      p.canDelete = p.children.every(item => item.canDelete == true);
    });

  }


  saveChanges(form: NgForm) {
    this.role.permissions = [];

    if (this.role.id) {
      this.nodes.forEach(node => this.updatePermissions(this.role.id, node, this.role.permissions));
      this.roleService.update(this.role).subscribe();
    } else {
      this.nodes.forEach(node => this.updatePermissions("", node, this.role.permissions));
      this.roleService.create(this.role).subscribe();
    }

    this.save.emit(null);
    this.roleModal.hide();
    form.resetForm();
  }

}
