import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Service/order.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lstDashBoardSummary: any = [];
  TotalCustomer = 0;
  TotalOrders = 0;
  TodayOrders = 0;
  TotalDispatched = 0;
  TotalDelivered = 0;
  TotalReturned = 0;
  constructor(
    private orderService: OrderService,
    private _datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    //window.location.reload();
    this.orderService.GetDashboardSummary().subscribe(res => {
      this.lstDashBoardSummary = res;
      this.TotalCustomer = res[0].totalCustomers;
      this.TotalOrders = res.length;

      //this.TotalOrders = 0;
      this.TodayOrders = res.filter(a => this._datePipe.transform(new Date(a.orderDate).toString(), 'yyyy-MM-dd') == this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd')).length;
      this.TotalDispatched = res.filter(a => a.statusId == 3).length;
      this.TotalDelivered = res.filter(a => a.statusId == 4).length;
      this.TotalReturned = res.filter(a => a.statusId == 5).length;
    });
  }

}
