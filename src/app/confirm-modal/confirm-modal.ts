import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css'
})
export class ConfirmModal {
  @Output() result = new EventEmitter<boolean>();
  title: '';
  message: '';
  btnOkText: 'Yes';
  btnCancelText: 'No';

  constructor(public bsModalRef: BsModalRef){}

  confirm(){
    this.result.emit(true);
    this.bsModalRef.hide();
  }

  decline(){
    this.result.emit(false);
    this.bsModalRef.hide();
  }
}
