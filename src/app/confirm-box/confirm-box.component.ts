import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {
  onClose: Subject<boolean>;
  employeeDetails: any;
  docPath: any;
  title: string;
  message: string;
  constructor(public bsModalRef: BsModalRef) 
  {


  }
  ngOnInit() {
    this.onClose = new Subject();
  }
  fnOk() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }
  fnCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
