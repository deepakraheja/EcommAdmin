import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-mng-user',
  templateUrl: './mng-user.component.html',
  styleUrls: ['./mng-user.component.css']
})
export class MngUserComponent implements OnInit {
  UserForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  LoggedInUserType: string;
  displayedColumns: string[] = ['name', 'email', 'mobileNo', 'additionalDiscount', 'isActive', 'createdDate', 'isApproval', 'approvedByUserName', 'approvedDate', 'Edit'];
  dataSource = new MatTableDataSource<any>(this.lstData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  showMask = false;
  PhoneMask = null;
  DecimalMask = null;
  constructor(
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _toasterService: ToastrService,
    private _userService: UserService,
    private _datePipe: DatePipe
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.UserForm = this.formBuilder.group({
      userID: 0,
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobileNo: ['', Validators.required],
      isActive: false,
      isApproval: [0, Validators.required],
      approvedBy: Number(this.LoggedInUserId),
      approvedDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
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
    this.PhoneMask = "0000000000";
    this.DecimalMask = "0*.00";
    this.showMask = false;
  }

  LoadData() {
    this.spinner.show();
    this._userService.GetAllUsers().subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  Edit(template: TemplateRef<any>, lst) {
    debugger
    this.UserForm = this.formBuilder.group({
      userID: [lst.userID],
      name: [lst.name, Validators.required],
      email: [lst.email, Validators.required],
      mobileNo: [lst.mobileNo, Validators.required],
      isActive: [lst.isActive],
      isApproval: [lst.isApproval, Validators.required],
      approvedBy: Number(this.LoggedInUserId),
      approvedDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
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
      this._userService.UpdateUser(this.UserForm.value).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this._toasterService.success("Record has been saved successfully.");
          this.dialog.closeAll();
          this.LoadData();
        }
        else if (res == -1) {
          this._toasterService.error("Email already exists.");
        }
        else {
          this._toasterService.error("Server error, Please try again after some time.");
        }
      });
    }
  }

}


