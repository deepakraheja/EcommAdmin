import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { VenueService } from 'src/app/Service/venue.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from 'src/app/Service/user.service';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { LookupService } from 'src/app/Service/lookup.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { StatusTypes } from 'src/app/enum/status-types.enum';

@Component({
  selector: 'app-mng-venue',
  templateUrl: './mng-venue.component.html',
  styleUrls: ['./mng-venue.component.scss']
})
export class MngVenueComponent implements OnInit {
  public norecord: boolean = false;
  public showheader: boolean = false;
  venueName: any;
  lstData: any[] = [];
  displayedColumns: string[] = ['name', 'address1', 'city', 'state', 'phone1', 'Edit'];
  dataSource = new MatTableDataSource<any>(this.lstData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  showFiller = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [];// [ENTER, COMMA];
  AdvanceSearchFilter: any[] = [];

  //venueName = new FormControl();
  LoggedInUserId: string;
  LoggedInBranchId: string;
  brData: any = [];
  VenueData: any[] = [];
  lstStatus: any = [];
  selectedBranch = new FormControl('0');
  selectedStatus = new FormControl('0');

  constructor(
    private _adminService: UserService,
    private _LocalStorage: LocalStorageService,
    private _LookupService: LookupService,
    private _venueService: VenueService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.LoggedInBranchId = this._LocalStorage.getValueOnLocalStorage("LoggedInBranchId");
    this.selectedBranch = new FormControl(this.LoggedInBranchId);
  }

  ngOnInit() {
    this.fnGetBranchByUserId();
    this.fnGetAllStatusById();
    let obj = {
      BranchID: Number(this.selectedBranch.value),
      Name: '',//this.venueName.value == null ? '' : (this.venueName.value.name == undefined ? this.venueName.value : this.venueName.value.name),
      StatusID: Number(this.selectedStatus.value)
    }
    this.spinner.show();
    this._venueService.GetVenues(obj).subscribe(res => {
      this.spinner.hide();

      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
      this.lstData = res;
      this.AdvanceSearchFilter = [];
    });
  }

  fnGetBranchByUserId() {
    let Obj = {
      UserId: Number(this.LoggedInUserId)
    }
    this._adminService.GetBranchByUserId(Obj)
      .subscribe(res => {

        this.brData = res;
      });
  }

  fnGetAllStatusById() {

    let obj = {
      StatusTypeID: StatusTypes.VenueStatusType
    }
    this._LookupService.GetAllStatusById(obj).subscribe(res => {
      this.spinner.hide();
      this.lstStatus = res;
    });
  }

  Search(event: any) {
    debugger
    let obj = {
      BranchID: Number(this.selectedBranch.value),
      Name: '',//this.venueName.value == null ? '' : (this.venueName.value.name == undefined ? this.venueName.value : this.venueName.value.name),
      StatusID: Number(this.selectedStatus.value)
    }
    this.spinner.show();
    this._venueService.GetVenues(obj).subscribe(res => {
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

      // BranchID: 1
      // Name: "test"
      // StatusID: 0
      debugger
      if (this.selectedBranch.value != "0") {
        let BranchName = this.brData.filter(a => a.branchId == Number(this.selectedBranch.value));
        this.AdvanceSearchFilter.push({ name: "Branch Name : " + BranchName[0].name });
      }

      if (this.selectedStatus.value != "0") {
        this.AdvanceSearchFilter.push({ name: "Status : " + (this.selectedStatus.value == "13" ? "Active" : "In-Active") });
      }
      debugger
      if (obj.Name != "" && obj.Name != null) {
        this.AdvanceSearchFilter.push({ name: "Venue Name : " + obj.Name });
      }
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
      this.lstData.push({ name: "Venue Name :" + value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(val: any): void {
    debugger

    var removeType = val.name.split(':')[0];
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

  onAddNew() {
    this.router.navigate(['/venue']);
  }

}
