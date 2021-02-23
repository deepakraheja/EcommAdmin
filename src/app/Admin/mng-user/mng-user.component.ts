import { Component, OnInit, Pipe, PipeTransform, TemplateRef, ViewChild } from '@angular/core';
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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { ConfirmBoxComponent } from 'src/app/confirm-box/confirm-box.component';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


@Component({
  selector: 'app-mng-user',
  templateUrl: './mng-user.component.html',
  styleUrls: ['./mng-user.component.css']
})
export class MngUserComponent implements OnInit {
  UserDocumentPath = environment.UserDocumentPath;
  APIURL = environment.APIURL;
  UserForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  LoggedInUserType: string;
  selected: any;
  //displayedColumns: string[] = ['name', 'email', 'mobileNo', 'additionalDiscount', 'statusId', 'isAgent','Upload', 'createdDate', 'approvedByUserName', 'approvedDate', 'Edit'];
  displayedColumns: string[] = ['name', 'email', 'statusId', 'AssignPages'];
  dataSource = new MatTableDataSource<any>(this.lstData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  showMask = false;
  PhoneMask = null;
  DecimalMask = null;
  PinCodeMask = null;
  SelectedUserId = 0;
  bsModalRef: BsModalRef;

  lstDataUserPages: any = [];
  displayedColumnsUserPages: string[] = ['isChecked', 'pageName'];
  dataSourceUserPages = new MatTableDataSource<any>(this.lstDataUserPages);

  constructor(
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _toasterService: ToastrService,
    private _userService: UserService,
    private _datePipe: DatePipe,
    private modalService: BsModalService,
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    
    this.LoadData();
    
  }

  get f() { return this.UserForm.controls; }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addMask(obj: Object) {
    this.PhoneMask = "0000000000";
    this.DecimalMask = "0*.00";
    this.PinCodeMask = "000000";
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

  AssignPages(template: TemplateRef<any>, lst) {
    debugger
    this.spinner.show();
    let obj = {
      userID: lst.userID
    }
    this.SelectedUserId = lst.userID;
    this._userService.GetUserPages(obj).subscribe(res => {
      this.spinner.hide();
      this.lstDataUserPages = res;
      this.dataSourceUserPages = new MatTableDataSource<any>(res);
      const dialogRef = this.dialog.open(template, {
        width: '50vw',
        data: this.lstDataUserPages
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(result => {
        //console.log(`Dialog result: ${result}`);
      });
    });
  }

  SaveUserPages(){
    let selectedPageName = '';
    (this.dataSourceUserPages.filteredData).forEach(element => {
      debugger
      if (element.isChecked == true) {
        selectedPageName += element.pageName + ',';
      }
    });
    let obj = {
      UserID: this.SelectedUserId,
      PageName: selectedPageName
    };
    this.spinner.show();
    this._userService.SaveUserFunctions(obj).subscribe(res => {
      this.spinner.hide();
      this._toasterService.success("Record has been saved successfully.");
    });
  }
}


