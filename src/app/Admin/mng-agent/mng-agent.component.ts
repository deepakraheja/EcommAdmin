import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { AgentService } from 'src/app/Service/agent.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-mng-agent',
  templateUrl: './mng-agent.component.html',
  styleUrls: ['./mng-agent.component.css']
})
export class MngAgentComponent implements OnInit {
  AgentForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  displayedColumns: string[] = ['name', 'email', 'mobileNo', 'statusId', 'createdDate', 'modifiedDate', 'AssignCustomer'];
  dataSource = new MatTableDataSource<any>(this.lstData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  lstDataUser: any = [];
  displayedColumnsUser: string[] = ['isChecked', 'name', 'email', 'mobileNo', 'additionalDiscount', 'statusId', 'createdDate'];
  dataSourceUser = new MatTableDataSource<any>(this.lstDataUser);
  showMask = false;
  PhoneMask = null;
  DecimalMask = null;
  SelectedAgentId = 0;
  constructor(
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _toasterService: ToastrService,
    private _agentService: AgentService,
    private _datePipe: DatePipe,
    private _userService: UserService
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.AgentForm = this.formBuilder.group({
      agentId: 0,
      fname: ['', Validators.required],
      lName: [''],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      isActive: false,
      createdBy: Number(this.LoggedInUserId),
      createdDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
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
    let obj = {
      AgentId: 0
    }
    this._agentService.GetAgentInfo(obj).subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  Edit(template: TemplateRef<any>, lst) {
    debugger
    this.AgentForm = this.formBuilder.group({
      agentId: [lst.agentId],
      fname: [lst.fname, Validators.required],
      lName: [lst.lName],
      email: [lst.email, Validators.required],
      mobile: [lst.mobile, Validators.required],
      isActive: [lst.isActive],
      createdBy: Number(this.LoggedInUserId),
      createdDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
    });
    const dialogRef = this.dialog.open(template, {
      width: '700px',
      data: this.AgentForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }


  AssignCustomer(template: TemplateRef<any>, lst) {
    debugger
    this.spinner.show();
    let obj = {
      AgentId: lst.userID
    }
    this.SelectedAgentId = lst.userID;
    this._userService.GetAgentCustomer(obj).subscribe(res => {
      this.spinner.hide();
      this.lstDataUser = res;
      this.dataSourceUser = new MatTableDataSource<any>(res);
      const dialogRef = this.dialog.open(template, {
        width: '100vw',
        data: this.lstDataUser
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(result => {
        //console.log(`Dialog result: ${result}`);
      });
    });
  }

  Save() {
    if (this.AgentForm.invalid) {
      this.AgentForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      if (this.AgentForm.value.agentId == 0) {
        this._agentService.AgentRegistration(this.AgentForm.value).subscribe(res => {
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
      else {
        this._agentService.UpdateAgent(this.AgentForm.value).subscribe(res => {
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

  onAddNew(template: TemplateRef<any>, lst) {
    this.AgentForm = this.formBuilder.group({
      agentId: 0,
      fname: ['', Validators.required],
      lName: [''],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      isActive: false,
      createdBy: Number(this.LoggedInUserId),
      createdDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
    });
    const dialogRef = this.dialog.open(template, {
      width: '500px',
      data: this.AgentForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  SaveAssignCustomer() {
    let selectedUser = '';
    (this.dataSourceUser.filteredData).forEach(element => {
      debugger
      if (element.isChecked == true) {
        selectedUser += element.userID + ',';
      }
    });
    let obj = {
      AgentId: this.SelectedAgentId,
      UserIds: selectedUser
    };
    this._agentService.SaveAgentCustomer(obj).subscribe(res => {
      this._toasterService.success("Record has been saved successfully.");
    });
  }
}


