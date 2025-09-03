import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModal } from '../confirm-modal/confirm-modal';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModalRef : BsModalRef;

  constructor(private modalService: BsModalService){}

  confirm(title = "Confirmation", message = "Are you sure!", btnOkText = "Yes", btnCancelText = "No" ) : boolean {
    const config = {
      title: title,
      class: 'modal-dialog-centered',
      initialState: {
        title,
        message,
        btnOkText,
        btnCancelText
      } as any
    };
    this.bsModalRef = this.modalService.show(ConfirmModal, config);
    return this.bsModalRef.content.result as boolean;
  }
}
