import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { OrderService } from 'src/app/Service/order.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { LookupService } from 'src/app/Service/lookup.service';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmBoxComponent } from 'src/app/confirm-box/confirm-box.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public Currency = { name: 'Rupees', currency: 'INR', price: 1 } // Default Currency
  public lstOrder: any = [];
  public lstOrderDetails: any = [];
  public lstOrderStatus: any = [];
  public ProductImage = environment.ImagePath;
  OrderForm: FormGroup;
  displayedColumns: string[] = ['orderNumber', 'View', 'orderDate', 'fName', 'phone', 'statusId', 'totalAmount'];
  dataSource = new MatTableDataSource<any>(this.lstOrder);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  LoggedInUserId: string;
  bsModalRef: BsModalRef;
  constructor(
    private _OrderService: OrderService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private _datePipe: DatePipe,
    public dialog: MatDialog,
    public _lookupService: LookupService,
    public _LocalStorage: LocalStorageService,
    public _toastrService: ToastrService,
    private modalService: BsModalService,
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.LoadOrderStatus();
    this.OrderForm = this.formBuilder.group({
      startDate: [this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd')],
      endDate: [this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd')],
      statusId: [0]
    });
  }

  ngOnInit(): void {
    this.Search("");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  LoadOrderStatus() {
    this._lookupService.GetOrderStatus().subscribe(res => {
      this.lstOrderStatus = res;
    });
  }

  GetStatusName(val){
    var lst=this.lstOrderStatus.filter(a=>a.orderStatusId==val);
    return lst[0].status;
  }

  ForwardStatus(val){
    return this.lstOrderStatus.filter(a=>a.orderStatusId>val);
  }

  Search(event: any) {
    let obj = {
      StatusId: Number(this.OrderForm.value.statusId),
      startDate: (this._datePipe.transform(new Date(this.OrderForm.value.startDate).toString(), 'yyyy-MM-dd') + ' 00:00:00'),
      endDate: (this._datePipe.transform(new Date(this.OrderForm.value.endDate).toString(), 'yyyy-MM-dd') + ' 23:59:00')
    };
    this.spinner.show();
    this._OrderService.GetAllOrder(obj).subscribe(res => {
      this.spinner.hide();
      //this.lstOrder = res;
      this.dataSource = res;
      this.dataSource.paginator = this.paginator;
      //console.log(res);
    });
  }

  // OrderTrackingListByOrderId(lst) {
  //   //debugger
  //   let res = lst.orderDetails;
  //   this.lstOrderDetails = res.filter(x => (x.orderId == null || x.orderId == res.orderId));
  // }

  GetTotalAmount(lst) {
    return lst.quantity * lst.price;
  }

  OrderTrackingListByOrderId(template: TemplateRef<any>, lst) {
    debugger
    //let res = lst;
    this.lstOrderDetails = lst;
    const dialogRef = this.dialog.open(template, {
      width: '80vw',
      data: this.lstOrderDetails
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  UpdateStatus(event: Event, lst) {
    debugger
    const initialState = {
      title: "Confirmation",
      message: "Do you want to change status?",
    };
    this.bsModalRef = this.modalService.show(ConfirmBoxComponent, { ignoreBackdropClick: true, keyboard: true, class: 'modal-sm', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      if (result) {
        debugger
        let obj = {
          OrderStatusHistoryId: 0,
          OrderDetailsID: Number(lst.orderDetailsID),
          OrderStatusId: Number(lst.statusId),
          CreatedDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
          CreatedBy: Number(this.LoggedInUserId),
          OrderId: Number(lst.orderId),
          SetNo: Number(lst.setNo),
          ProductId: Number(lst.productId)
        };
        this.spinner.show();
        this._OrderService.UpdateOrderDetailStatus(obj).subscribe(res => {
          this.spinner.hide();
          this.Search("");
          this._toastrService.success('Status has been updated successfully.');
        });
      }
    });
    
  }
}