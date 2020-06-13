import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Service/user.service';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { LookupService } from 'src/app/Service/lookup.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientsService } from 'src/app/Service/clients.service';
import { startWith, map } from 'rxjs/operators';
import { StatusTypes } from 'src/app/enum/status-types.enum';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientName = new FormControl();
  LoggedInUserId: string;
  brData: any = [];
  ClientData: any[] = [];
  lstClientType: any = [];
  lstStatus: any = [];
  selectedBranch = new FormControl('0');
  selectedStatus = new FormControl('0');
  selectedClientType = new FormControl('0');
  filteredClient: Observable<any[]>;

  @Output() SearchData = new EventEmitter<any>();
  @Input() IsShowAdd: boolean = false;
  
  constructor(
    private _adminService: UserService,
    private _LocalStorage: LocalStorageService,
    private _LookupService: LookupService,
    //public dialog: MatDialog,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _ClientsService: ClientsService
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
    this.filteredClient = this.clientName.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.ClientData.slice())
      );
    this.spinner.hide();
  }

  displayClientNameFn(clientname?: any): string | undefined {
    return clientname ? clientname.name : undefined;
  }

  private _filter(name: string): any {
    const filterValue = name.toLowerCase();
     
    if (name.length > 1) {
      let obj = {
        BranchID: Number(this.selectedBranch.value),
        Name: this.clientName.value,
        ClientType: this.selectedClientType.value,
        StatusID: Number(this.selectedStatus.value)
      }
      this._ClientsService.GetClients(obj).subscribe(res => {
        this.ClientData = res;
      });
    }
    return this.ClientData.filter(a => a.name.toLowerCase().indexOf(filterValue) === 0);
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
    this._adminService.GetBranchByUserId(Obj)
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

  Search() {
     
    let obj = {
      BranchID: Number(this.selectedBranch.value),
      Name:this.clientName.value == null ? '' : (this.clientName.value.name == undefined ? this.clientName.value : this.clientName.value.name),
      ClientType: this.selectedClientType.value,
      StatusID: Number(this.selectedStatus.value)
    }
    this.SearchData.emit(obj);
  }

  onAddNew() {
    this.router.navigate(['/client']);
  }

}