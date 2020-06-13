import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StatusTypes } from 'src/app/enum/status-types.enum';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientsService } from 'src/app/Service/clients.service';
import { LookupService } from 'src/app/Service/lookup.service';
import { UserService } from 'src/app/Service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-mng-client',
  templateUrl: './mng-client.component.html',
  styleUrls: ['./mng-client.component.scss']
})
export class MngClientComponent implements OnInit {
  public norecord: boolean = false;
  public showheader: boolean = false;
  lstClientData: any[] = [];
  lstData: any[] = [];
  displayedColumns: string[] = ['name', 'address1', 'city', 'state', 'phone1', 'Edit', 'View'];
  dataSource = new MatTableDataSource<any>(this.lstClientData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  lstClientType: any = [];
  lstStatus: any = [];
  selectedBranch = new FormControl('0');
  selectedStatus = new FormControl('0');
  selectedClientType = new FormControl('0');
  LoggedInUserId: string;
  brData: any = [];

  showFiller = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [];// [ENTER, COMMA];
  AdvanceSearchFilter: any[] = [];
  constructor(
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _ClientsService: ClientsService,
    private _LookupService: LookupService,
    private _UserService: UserService,
    private _LocalStorage: LocalStorageService,
    private router: Router
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    var LoggedInBranchId = this._LocalStorage.getValueOnLocalStorage("LoggedInBranchId");
    this.selectedBranch = new FormControl(LoggedInBranchId);
  }

  ngOnInit() {
    this.spinner.show();
    this.fnGetAllClientType();
    this.fnGetBranchByUserId();
    this.fnGetAllStatusById();
    this.Search("");
    //this.spinner.hide();
  }

  onAddNew() {
    this.router.navigate(['/client']);
  }

  Search(event: any) {
    let obj = {
      BranchID: Number(this.selectedBranch.value),
      Name: "",
      ClientType: this.selectedClientType.value,
      StatusID: Number(this.selectedStatus.value)
    }
    this.spinner.show();
    this._ClientsService.GetClients(obj).subscribe(res => {
      this.spinner.hide();
      // if (res != null) {
      //   if (res.length > 0) {
      //     this.showheader = true;
      //     this.norecord = false;
      //   }
      //   else {
      //     this.showheader = true;
      //     this.norecord = true;
      //   }
      // }
      // else {
      //   this.showheader = true;
      //   this.norecord = true;
      // }
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;

      this.lstData = res;
      this.AdvanceSearchFilter = [];

      debugger

      if (this.selectedClientType.value != "0") {
        let ClientType = this.lstClientType.filter(a => a.lookupClientTypeId == Number(this.selectedClientType.value));
        this.AdvanceSearchFilter.push({ name: "Client Type : " + ClientType[0].name });
      }

      //if (this.selectedBranch.value != "0") {
      let BranchName = this.brData.filter(a => a.branchId == Number(this.selectedBranch.value));
      this.AdvanceSearchFilter.push({ name: "Branch Name : " + BranchName[0].name });
      //}

      if (this.selectedStatus.value != "0") {
        this.AdvanceSearchFilter.push({ name: "Status : " + (this.selectedStatus.value == "13" ? "Active" : "In-Active") });
      }
      debugger
      if (obj.Name != "" && obj.Name != null) {
        this.AdvanceSearchFilter.push({ name: "Client Name : " + obj.Name });
      }
    });
  }

  ViewJob(ClientId): void {

    // const dialogRef = this.dialog.open(ViewJobsComponent, {
    //   width: '100vw',
    //   data: { Id: ClientId }
    // });
    // dialogRef.disableClose = true;
    // dialogRef.afterClosed().subscribe(result => {
    // });
  }
  fnGetAllClientType() {
    this._LookupService.GetAllClientType().subscribe(lstClient => {
      this.lstClientType = lstClient;
    });
  }

  fnGetBranchByUserId() {
    let Obj = {
      UserId: Number(this.LoggedInUserId)
    }
    this._UserService.GetBranchByUserId(Obj)
      .subscribe(res => {

        this.brData = res;
        //this.ClientData = res;
      });
  }

  fnGetAllStatusById() {

    let obj = {
      StatusTypeID: StatusTypes.ClientStatuses
    }
    this._LookupService.GetAllStatusById(obj).subscribe(res => {
      this.lstStatus = res;
    });
  }

  applyFilter(event: Event) {
    debugger
    const filterValue = (event.target as HTMLInputElement).value;
    //var filter = (this.lstBranchData).filter(a => (a.name).trim().toLowerCase() == filterValue.trim().toLowerCase());
    //var filter = (this.lstData).filter(a => ((a.name).trim().toLowerCase()).includes(filterValue.trim().toLowerCase()));
    //this.dataSource = new MatTableDataSource<any>(filter);

    //const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.lstData.push({ name: "Client Name :" + value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(val: any): void {
    debugger

    var removeType = val.name.split(':')[0];
    if (removeType == "Client Type ") {
      this.selectedClientType = new FormControl('0');
    }
    if (removeType == "Branch Name ") {
      this.selectedBranch = new FormControl('0');
    }
    if (removeType == "Status ") {
      this.selectedStatus = new FormControl('0');
    }

    const index = this.lstData.indexOf(val);

    if (index >= 0) {
      this.lstData.splice(index, 1);
    }
    this.Search("");
  }

}
