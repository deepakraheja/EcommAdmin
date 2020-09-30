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
import { ReportService } from 'src/app/Service/report.service';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit {
  public Report_Path = environment.Report_Path;
  public lstOrderStatus: any = [];
  OrderForm: FormGroup;
  LoggedInUserId: string;
  
  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private _datePipe: DatePipe,
    // public dialog: MatDialog,
    public _lookupService: LookupService,
    public _LocalStorage: LocalStorageService,
    public _toastrService: ToastrService,
    private _ReportService: ReportService,
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.OrderForm = this.formBuilder.group({
      startDate: [this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd')],
      endDate: [this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd')],
      statusId: [0]
    });

  }

  ngOnInit(): void {
    this.LoadOrderStatus();
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  LoadOrderStatus() {
    this._lookupService.GetOrderStatus().subscribe(res => {
      this.lstOrderStatus = res;
    });
  }

  ProduceReport(event: any) {
    let obj = {
      StatusId: Number(this.OrderForm.value.statusId),
      startDate: (this._datePipe.transform(new Date(this.OrderForm.value.startDate).toString(), 'yyyy-MM-dd') + ' 00:00:00'),
      endDate: (this._datePipe.transform(new Date(this.OrderForm.value.endDate).toString(), 'yyyy-MM-dd') + ' 23:59:00')
    };
    this.spinner.show();
    debugger;
    this._ReportService.GenerateOrderDetail(obj).subscribe(res => {
      debugger;
      this.spinner.hide();
      window.open(this.Report_Path + res, "_blank");
      this._toastrService.success("Report has been downloaded successfully.");
    });
  }

}
