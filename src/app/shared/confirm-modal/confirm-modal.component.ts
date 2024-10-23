import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {

  @Input() title?: string;
  @Input() message?: string;
  @Input() cancelTxt?: string = 'Cancelar';
  @Input() confirmTxt?: string = 'Confirmar';

  confirmResult: Subject<boolean> = new Subject<boolean>();

  constructor(public bsModalRef: BsModalRef) { }
  ngOnInit(){
    //this.confirmResult = new Subject();
  }

  OnConfirm(){
    this.confirmAndClose(true);
  }

  onClose(){ 
    this.confirmAndClose(false);
  }

  private confirmAndClose(value: boolean){
    this.confirmResult.next(true);
    this.bsModalRef.hide();
  }
}
