import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { OrderService } from 'src/app/Service/order.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public Currency = { name: 'Rupees', currency: 'INR', price: 1 } // Default Currency
  public lstOrder: any = [];
  public lstOrderDetails: any = [];
  public ProductImage = environment.ImagePath;
  OrderForm: FormGroup;
  displayedColumns: string[] = ['orderNumber', 'View', 'orderDate', 'fName', 'phone', 'statusId', 'totalAmount'];
  dataSource = new MatTableDataSource<any>(this.lstOrder);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private _OrderService: OrderService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private _datePipe: DatePipe,
    public dialog: MatDialog,
  ) {
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
}
