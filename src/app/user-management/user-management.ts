import { Component, OnInit } from '@angular/core';
import { UserDto } from '../DTOs/UserDto';
import { AdminService } from '../services/admin-service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModal } from '../roles-modal/roles-modal';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement implements OnInit {

  users: UserDto[];
  bsModalRef: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService){}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }
  
   getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe(response => {
      this.users = response;
      console.log(this.users)
    })
  }

  onEditModal(user: UserDto){
    const init : any = {
      class: 'modal-dialog-centered',
      initialState: {
        title: 'Edit Roles',
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModal, init);
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updatedRoles.subscribe(roles => {
      const rolesToUpdate = {
        rolesName: [...roles.filter(r => r.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate && rolesToUpdate.rolesName.length > 0){
        this.adminService.editUserRoles(user.userName, rolesToUpdate.rolesName).subscribe((response: any) => {
          user.roles = [...response];
        })
      }
    })
  }

  private getRolesArray(user: UserDto){
    const roles = [];
    const userRoles = user.roles;
    const availableRoles : {name: string, value: string, checked: boolean}[] = [
      { name: 'admin', value: 'admin', checked: false },
      { name: 'member', value: 'member', checked: false},
      { name: 'superAdmin', value: 'superAdmin', checked: false}
    ]

    for (let i = 0; i < availableRoles.length; i++) {
      let isMatch = false;
      for (let j = 0; j < userRoles.length; j++) {
        if(availableRoles[i].name == userRoles[j]){
          isMatch = true;
          availableRoles[i].checked = true;
          roles.push(availableRoles[i]);
          break;
        }
      }
      if(!isMatch){
        availableRoles[i].checked = false;
        roles.push(availableRoles[i]);
      }
    }
    return roles;
  }
}
