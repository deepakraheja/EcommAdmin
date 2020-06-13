import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { LookupService } from 'src/app/Service/lookup.service';
import { UserService } from 'src/app/Service/user.service';
import { StatusTypes } from 'src/app/enum/status-types.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { startWith, map } from 'rxjs/operators';
import { VenueService } from 'src/app/Service/venue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit {
  venueName = new FormControl();
  LoggedInUserId: string;
  brData: any = [];
  VenueData: any[] = [];
  lstStatus: any = [];
  selectedBranch = new FormControl('0');
  selectedStatus = new FormControl('0');
  filteredVenue: Observable<any[]>;
  //lstVenueData: any[] = [];

  @Output() SearchVenue = new EventEmitter<any>();
  @Input() IsShowAdd: boolean = false;
  constructor(
    private _adminService: UserService,
    private _LocalStorage: LocalStorageService,
    private _LookupService: LookupService,
    private _VenueService: VenueService,
    private _venueService: VenueService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    var LoggedInBranchId = this._LocalStorage.getValueOnLocalStorage("LoggedInBranchId");
    this.selectedBranch = new FormControl(LoggedInBranchId);
  }

  ngOnInit() {
    this.spinner.show();
    this.fnGetBranchByUserId();
    this.fnGetAllStatusById();
    this.filteredVenue = this.venueName.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.VenueData.slice())
      );

  }

  displayNameFn(venuename?: any): string | undefined {
    return venuename ? venuename.name : undefined;
  }

  private _filter(name: string): any {
    const filterValue = name.toLowerCase();

    if (name.length > 1) {
      let obj = {
        BranchID: Number(this.selectedBranch.value),
        Name: this.venueName.value,
        StatusID: Number(this.selectedStatus.value)
      }
      this._VenueService.GetVenues(obj).subscribe(res => {
        this.VenueData = res;
      });
    }
    return this.VenueData.filter(a => a.name.toLowerCase().indexOf(filterValue) === 0);
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

  Search() {
    debugger
    let obj = {
      BranchID: Number(this.selectedBranch.value),
      Name: this.venueName.value == null ? '' : (this.venueName.value.name == undefined ? this.venueName.value : this.venueName.value.name),
      StatusID: Number(this.selectedStatus.value)
    }
    this.SearchVenue.emit(obj);
  }

  open() {
    this.router.navigate(['/venue']);
  }
}
