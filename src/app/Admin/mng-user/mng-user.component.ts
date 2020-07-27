import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-mng-user',
  templateUrl: './mng-user.component.html',
  styleUrls: ['./mng-user.component.css']
})
export class MngUserComponent implements OnInit {
  MainCategoryForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  LoggedInUserType: string;
  displayedColumns: string[] = ['name', 'email', 'mobileNo', 'isActive', 'createdDate', 'isApproval', 'approvedByUserName', 'approvedDate', 'Edit'];
  dataSource = new MatTableDataSource<any>(this.lstData);

  constructor(
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _toasterService: ToastrService,
    private _userService: UserService
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");

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
    this._userService.GetAllUsers().subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
    });
  }

}


