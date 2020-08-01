import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Service/order.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public Currency = { name: 'Rupees', currency: 'INR', price: 1 } // Default Currency
  public lstOrder: any[] = [];
  public ProductImage = environment.ImagePath;
  OrderForm: FormGroup;
  constructor(
    private _OrderService: OrderService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private _datePipe: DatePipe,
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

  Search(event: any) {
    let obj = {
      StatusId: Number(this.OrderForm.value.statusId),
      startDate: (this._datePipe.transform(new Date(this.OrderForm.value.startDate).toString(), 'yyyy-MM-dd') + ' 00:00:00'),
      endDate: (this._datePipe.transform(new Date(this.OrderForm.value.endDate).toString(), 'yyyy-MM-dd') + ' 23:59:00')
    };
    this.spinner.show();
    this._OrderService.GetAllOrder(obj).subscribe(res => {
      this.spinner.hide();
      this.lstOrder = res;
      //console.log(res);
    });
  }

  OrderTrackingListByOrderId(OrderId,lst) {
    //debugger
    let res = lst.orderDetails;
    return res.filter(x => (x.orderId == null || x.orderId == OrderId));
  }
}
