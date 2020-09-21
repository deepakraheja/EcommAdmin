import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { OrderService } from 'src/app/Service/order.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { LookupService } from 'src/app/Service/lookup.service';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmBoxComponent } from 'src/app/confirm-box/confirm-box.component';
import { TransportService } from 'src/app/Service/Transport.service';

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
  DispatchedForm: FormGroup;
  displayedColumns: string[] = ['orderNumber', 'View', 'orderDate', 'fName', 'phone', 'statusId', 'totalAmount'];
  dataSource = new MatTableDataSource<any>(this.lstOrder);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  LoggedInUserId: string;
  bsModalRef: BsModalRef;
  public ChangeStatusId: any;
  public lstTransport: any = [];
  public SelectedLst: any = [];
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
    private _TransportService: TransportService
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.LoadOrderStatus();
    this.OrderForm = this.formBuilder.group({
      startDate: [this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd')],
      endDate: [this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd')],
      statusId: [0]
    });

    this.DispatchedForm = this.formBuilder.group({
      selectedOrderDetailsIds: [''],
      transportID: ['', Validators.required],
      dispatchDate: [this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd')],
      bilty: ['', Validators.required],
      statusId: [0]
    });

    let obj = {
      Active: true
    }
    this._TransportService.GetTransport(obj).subscribe(res => {
      this.lstTransport = res;
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

  GetStatusName(val) {
    var lst = this.lstOrderStatus.filter(a => a.orderStatusId == val);
    return lst[0].status;
  }

  ForwardStatus(val) {
    return this.lstOrderStatus.filter(a => a.orderStatusId > val);
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

  UpdateStatus(event: Event, lstOrderDetails, lstOrder, template: TemplateRef<any>) {
    debugger
    this.SelectedLst = [];
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
        let SelectedOrderDetailsIds = '';
        let SelectedOrderDetails = false;
        let IsValid = true;
        lstOrderDetails.forEach(element => {
          if (element.isSelected) {
            SelectedOrderDetails = true;
          }
        });
        if (SelectedOrderDetails) {
          this.SelectedLst = lstOrderDetails.filter(a => a.isSelected == true);
          this.SelectedLst.forEach(element => {
            debugger
            if (IsValid) {
              if (element.isSelected && element.statusId >= this.lstOrderDetails.statusId &&
                (Number(element.statusId + 1) == Number(this.ChangeStatusId) || (Number(element.statusId) == 3 ? (Number(this.ChangeStatusId) == 4 || Number(this.ChangeStatusId) == 5) : false))
              ) {
                SelectedOrderDetailsIds += element.orderDetailsID + ',';
              }
              else {
                this._toastrService.error('Product (' + element.productName + ') status cannot be changed from ' + this.GetStatusName(element.statusId) + ' to ' + this.GetStatusName(this.ChangeStatusId) + '.');
                IsValid = false;
                this.ChangeStatusId = '';
                return;
              }
            }
          });
        }
        else {
          this._toastrService.error('Please select a product to change status');
          this.ChangeStatusId = '';
          return;
        }
        if (IsValid && SelectedOrderDetailsIds != '') {
          //let SelectedLst = lstOrderDetails.filter(a => a.isSelected == true);
          if (this.ChangeStatusId == 3) {
            this.DispatchedForm = this.formBuilder.group({
              selectedOrderDetailsIds: [SelectedOrderDetailsIds],
              transportID: ['', Validators.required],
              dispatchDate: [this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd')],
              bilty: ['', Validators.required],
              statusId: [Number(this.ChangeStatusId)]
            });
            const dialogRef = this.dialog.open(template, {
              width: '50vw',
              data: this.SelectedLst
            });
            dialogRef.disableClose = true;
            dialogRef.afterClosed().subscribe(result => {
              //console.log(`Dialog result: ${result}`);
            });
          }
          else {

            let arrObj = [];
            this.SelectedLst.forEach(element => {
              arrObj.push({
                OrderStatusHistoryId: 0,
                OrderDetailsID: Number(element.orderDetailsID),
                OrderStatusId: Number(this.ChangeStatusId),
                CreatedDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
                CreatedBy: Number(this.LoggedInUserId),
                OrderId: Number(element.orderId),
                SetNo: Number(element.setNo),
                ProductId: Number(element.productId),
                transportID: 0,
                dispatchDate: '',
                bilty: ''
              });
            });

            this.spinner.show();
            this._OrderService.UpdateOrderDetailStatus(arrObj).subscribe(res => {
              this.spinner.hide();
              this.Search("");
              this._toastrService.success('Status has been updated successfully.');
              this.dialog.closeAll();
            });

            // this._toastrService.success('Status has been updated successfully.');
            this.ChangeStatusId = '';
          }
        }

        // let obj = {
        //   OrderStatusHistoryId: 0,
        //   OrderDetailsID: Number(lst.orderDetailsID),
        //   OrderStatusId: Number(lst.statusId),
        //   CreatedDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
        //   CreatedBy: Number(this.LoggedInUserId),
        //   OrderId: Number(lst.orderId),
        //   SetNo: Number(lst.setNo),
        //   ProductId: Number(lst.productId)
        // };
        // this.spinner.show();
        // this._OrderService.UpdateOrderDetailStatus(obj).subscribe(res => {
        //   this.spinner.hide();
        //   this.Search("");
        //   this._toastrService.success('Status has been updated successfully.');
        // });
      }
      else {
        this.ChangeStatusId = '';
      }
    });

  }

  SaveDispatched() {
    if (this.DispatchedForm.invalid) {
      this.DispatchedForm.markAllAsTouched();
      this._toastrService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      let arrObj = [];
      this.SelectedLst.forEach(element => {
        arrObj.push({
          OrderStatusHistoryId: 0,
          OrderDetailsID: Number(element.orderDetailsID),
          OrderStatusId: Number(this.ChangeStatusId),
          CreatedDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
          CreatedBy: Number(this.LoggedInUserId),
          OrderId: Number(element.orderId),
          SetNo: Number(element.setNo),
          ProductId: Number(element.productId),
          transportID: Number(this.DispatchedForm.value.transportID),
          dispatchDate: this._datePipe.transform(new Date(this.DispatchedForm.value.dispatchDate).toString(), 'yyyy-MM-dd') + ' ' + this._datePipe.transform(new Date().toString(), 'HH:mm:ss'),
          bilty: this.DispatchedForm.value.bilty
        });
      });
      this.spinner.show();
      this._OrderService.UpdateOrderDetailStatus(arrObj).subscribe(res => {
        this.spinner.hide();
        this.Search("");
        this._toastrService.success('Status has been updated successfully.');
        this.dialog.closeAll();
      });

      // this._toastrService.success('Status has been updated successfully.');
      this.ChangeStatusId = '';
    }
  }
}