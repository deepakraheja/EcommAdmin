import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  lstData: any = [];
  LoggedInAgentId: string;
  LoggedInUserType: string;
  displayedColumns: string[] = ['name', 'email', 'mobileNo', 'additionalDiscount', 'isActive'];
  dataSource = new MatTableDataSource<any>(this.lstData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  showMask = false;
  PhoneMask = null;
  DecimalMask = null;
  constructor(
    private _LocalStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private _userService: UserService,
  ) {
    this.LoggedInAgentId = this._LocalStorage.getValueOnLocalStorage("LoggedInAgentId");

    this.LoadData();
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  LoadData() {
    this.spinner.show();
    let obj = {
      AgentId: Number(this.LoggedInAgentId)
    };
    this._userService.GetAgentCustomerByAgentId(obj).subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

}



