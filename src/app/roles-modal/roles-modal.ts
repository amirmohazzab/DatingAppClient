import { Component, EventEmitter, Output } from '@angular/core';
import { Form } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserDto } from '../DTOs/UserDto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles-modal',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './roles-modal.html',
  styleUrl: './roles-modal.css'
})
export class RolesModal {

  @Output() updatedRoles = new EventEmitter<any>();
  title = 'my title';
  closeBtnName = 'close';
  user: UserDto
  roles: any[];

  constructor(public bsModalRef: BsModalRef, private toast: ToastrService){}

  rolesForm: Form;
  
  changeUpdatedRoles(){
    
    this.updatedRoles.emit(this.roles);
    this.bsModalRef.hide();
    this.toast.success('Roles Updated');
  }
}
