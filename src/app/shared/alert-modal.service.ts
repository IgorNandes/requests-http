import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'

}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  showAlert(message: string, type:string) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS);
  }

  showConfirm(title: string, message: string, btnOkText?: string, btnCancelText?: string) {

    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.message = message;
    if(btnOkText){
    bsModalRef.content.btnOkText = btnOkText;
    }
    if(btnCancelText){
    bsModalRef.content.btnCancelText = btnCancelText;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}