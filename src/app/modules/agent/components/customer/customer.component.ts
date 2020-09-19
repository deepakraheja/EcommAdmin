import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  UserForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  LoggedInUserType: string;
  displayedColumns: string[] = ['name', 'email', 'mobileNo', 'additionalDiscount', 'statusId', 'Edit'];
  dataSource = new MatTableDataSource<any>(this.lstData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  showMask = false;
  PhoneMask = null;
  DecimalMask = null;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _toasterService: ToastrService,
    private _LocalStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private _userService: UserService,
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.UserForm = this.formBuilder.group({
      userID: 0,
      statusId: 0,
      additionalDiscount: ['', Validators.required]
    });
    this.LoadData();
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addMask(obj: Object) {
    this.DecimalMask = "0*.00";
    this.showMask = false;
  }
  LoadData() {
    this.spinner.show();
    let obj = {
      AgentId: Number(this.LoggedInUserId)
    };
    this._userService.GetAgentCustomerByAgentId(obj).subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  Edit(template: TemplateRef<any>, lst) {
    debugger
    this.UserForm = this.formBuilder.group({
      userID: [lst.userID],
      statusId: [lst.statusId],
      additionalDiscount: [lst.additionalDiscount, Validators.required]
    });
    const dialogRef = this.dialog.open(template, {
      width: '700px',
      data: this.UserForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Save() {
    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      this._userService.AgentCustomerStatusChange(this.UserForm.value).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this._toasterService.success("Record has been saved successfully.");
          this.dialog.closeAll();
          this.LoadData();
        }
        else {
          this._toasterService.error("Server error, Please try again after some time.");
        }
      });
    }
  }
}



