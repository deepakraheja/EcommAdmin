import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StatusTypes } from 'src/app/enum/status-types.enum';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { LookupService } from 'src/app/Service/lookup.service';
import { ClientsService } from 'src/app/Service/clients.service';
import { UserService } from 'src/app/Service/user.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  ClientForm: FormGroup;
  LoggedInUserId: string;
  lstClientType: any = [];
  lstStatus: any = [];
  brData: any = [];
  AllState: any = [];
  public submitted = false;
  ClientId: string;
  phoneMask = null;
  showMask = false;
  constructor(
    private formBuilder: FormBuilder,
    private _adminService: UserService,
    private _LocalStorage: LocalStorageService,
    private _LookupService: LookupService,
    private _ClientsService: ClientsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _toasterService: ToastrService,
    private _datePipe: DatePipe,
    private spinner: NgxSpinnerService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.ClientId = params.get('id');
    });
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    var LoggedInBranchId = this._LocalStorage.getValueOnLocalStorage("LoggedInBranchId");
    //this.selectedBranch = new FormControl(LoggedInBranchId);

    this.ClientForm = this.formBuilder.group({
      clientID: [0],
      cityID: [0],
      roundingRule: [0],
      branchID: ['', Validators.required],
      name: ['', Validators.required],
      statusID: [0, Validators.required],
      description: [''],
      address1: ['', Validators.required],
      address2: [''],
      phone1: ['', Validators.required],
      phone2: [''],
      fax: [''],
      webAddress: [''],
      billingAddress1: [''],
      billingAddress2: [''],
      billComment: [''],
      email: ['', [Validators.email]],
      comment: [''],
      invoiceAddress1: [''],
      invoiceAddress2: [''],
      invoiceComment: [''],
      billCode: [''],
      billCityId: [0],
      clientType: ['0'],
      skypeId: [''],
      city: ['', Validators.required],
      state: [''],
      zip: ['', Validators.required],
      country: [''],
      billCity: ['', Validators.required],
      billState: [''],
      billZip: ['', Validators.required],
      billCountry: [''],
      modifiedBy: [Number(this.LoggedInUserId)],
      modifiedOn: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
      gPClient: [''],
      branchNo: ['']
    });
  }

  addMask(obj: Object) {
    this.phoneMask = "000-000-0000";
    this.showMask = false;
  }
  ngOnInit() {
    this.fnGetAllState();
    this.fnGetAllClientType();
    this.fnGetBranchByUserId();
    this.fnGetAllStatusById();
    if (this.ClientId != '' && this.ClientId != undefined && this.ClientId != null) {
      this.spinner.show();
      let obj = {
        ClientId: Number(this.ClientId)
      };
      this._ClientsService.GetClientbyclientId(obj).subscribe(res => {
        this.spinner.hide();
        this.ClientForm = this.formBuilder.group({
          clientID: [Number(this.ClientId)],
          cityID: [res[0].cityID],
          roundingRule: [res[0].roundingRule],
          branchID: [res[0].branchID, Validators.required],
          name: [res[0].name, Validators.required],
          statusID: [res[0].statusID, Validators.required],
          description: [res[0].description],
          address1: [res[0].address1, Validators.required],
          address2: [res[0].address2],
          phone1: [res[0].phone1, Validators.required],
          phone2: [res[0].phone2],
          fax: [res[0].fax],
          webAddress: [res[0].webAddress],
          billingAddress1: [res[0].billingAddress1],
          billingAddress2: [res[0].billingAddress2],
          billComment: [res[0].billComment],
          email: [res[0].email, [Validators.email]],
          comment: [res[0].comment],
          invoiceAddress1: [res[0].invoiceAddress1],
          invoiceAddress2: [res[0].invoiceAddress2],
          invoiceComment: [res[0].invoiceComment],
          billCode: [res[0].billCode],
          billCityId: [res[0].billCityId],
          clientType: [res[0].clientType],
          skypeId: [res[0].skypeId],
          city: [res[0].city, Validators.required],
          state: [res[0].state],
          zip: [res[0].zip, Validators.required],
          country: [res[0].country],
          billCity: [res[0].billCity, Validators.required],
          billState: [res[0].billState],
          billZip: [res[0].billZip, Validators.required],
          billCountry: [res[0].billCountry],
          modifiedBy: [Number(this.LoggedInUserId)],
          modifiedOn: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
          gPClient: [res[0].gPClient],
          branchNo: [res[0].branchNo]
        });
      });
    }
  }

  get f() { return this.ClientForm.controls; }

  fnGetAllState() {
    this._LookupService.GetAllStates()
      .subscribe(result => {
        this.AllState = result
      });
  }

  fnGetAllClientType() {
    this._LookupService.GetAllClientType().subscribe(lstClient => {
      this.lstClientType = lstClient;
    });
  }
  GetBranchNo(val) {
    debugger
    const _BranchNo = this.ClientForm.get("branchNo");
    _BranchNo.setValue(val.value);
    _BranchNo.updateValueAndValidity();
  }

  fnGetBranchByUserId() {
    let Obj = {
      UserId: Number(this.LoggedInUserId)
    }
    this._adminService.GetBranchByUserId(Obj)
      .subscribe(res => {
        // 
        this.brData = res;
        //console.log(res);
      });
  }

  fnGetAllStatusById() {

    let obj = {
      StatusTypeID: StatusTypes.ClientStatuses
    }
    this._LookupService.GetAllStatusById(obj).subscribe(res1 => {
      this.lstStatus = res1;
    });
  }

  onBack() {
    this.router.navigate(['/mngClient']);
  }

  onSubmit() {

    this.submitted = true;
    if (this.ClientForm.invalid) {
      this.ClientForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      this._ClientsService.SaveClients(this.ClientForm.value).subscribe(res => {
        this.spinner.hide();
        this._toasterService.success("Record has been saved successfully.");
      });
    }
  }

  CopyFromContact() {
    const address1 = this.ClientForm.get("address1");
    const address2 = this.ClientForm.get("address2");
    const city = this.ClientForm.get("city");
    const state = this.ClientForm.get("state");
    const zip = this.ClientForm.get("zip");
    const country = this.ClientForm.get("country");

    const billingAddress1 = this.ClientForm.get("billingAddress1");
    const billingAddress2 = this.ClientForm.get("billingAddress2");
    const cibillCityty = this.ClientForm.get("billCity");
    const billState = this.ClientForm.get("billState");
    const billZip = this.ClientForm.get("billZip");
    const billCountry = this.ClientForm.get("billCountry");

    billingAddress1.setValue(address1.value);
    billingAddress1.updateValueAndValidity();
    billingAddress2.setValue(address2.value);
    billingAddress2.updateValueAndValidity();
    cibillCityty.setValue(city.value);
    cibillCityty.updateValueAndValidity();
    billState.setValue(state.value);
    billState.updateValueAndValidity();
    billZip.setValue(zip.value);
    billZip.updateValueAndValidity();
    billCountry.setValue(country.value);
    billCountry.updateValueAndValidity();
  }
}
