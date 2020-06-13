import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { VenueService } from 'src/app/Service/venue.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { LookupService } from 'src/app/Service/lookup.service';
import { StatusTypes } from 'src/app/enum/status-types.enum';
import { UserService } from 'src/app/Service/user.service';
import { ClientsService } from 'src/app/Service/clients.service';
import { ConfirmBoxComponent } from 'src/app/confirm-box/confirm-box.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.scss']
})
export class VenueDetailsComponent implements OnInit {
  public norecord: boolean = false;
  public showheader: boolean = false;
  VenueForm: FormGroup;
  LoggedInUserId: string;
  LoggedInBranchId: string;
  lstStatus: any = [];
  brData: any = [];
  //  AllState: any = [];
  public submitted = false;
  VenueId: string;
  phoneMask = null;
  showMask = false;
  lstVenueData: any[] = [];
  IsButtonShow: boolean = true;
  ClientSearchParameters: any;
  displayedColumns: string[] = ['chkFlag', 'statusID', 'name', 'address1', 'city', 'state', 'phone1'];
  dataSource = new MatTableDataSource<any>(this.lstVenueData);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  lstExistingClients: any[] = [];
  displayedExistingClientsColumns: string[] = ['name', 'address1', 'city', 'state', 'phone1', 'venueClientsID'];
  dataSourceExistingClients = new MatTableDataSource<any>(this.lstExistingClients);
  bsModalRef: BsModalRef;
  constructor(
    private formBuilder: FormBuilder,
    private _UserService: UserService,
    private _LocalStorage: LocalStorageService,
    private _LookupService: LookupService,
    private _VenueService: VenueService,
    //public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _toasterService: ToastrService,
    private _datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private _clientService: ClientsService,
    private modalService: BsModalService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.VenueId = params.get('id');
    });
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.LoggedInBranchId = this._LocalStorage.getValueOnLocalStorage("LoggedInBranchId");
    this.VenueForm = this.formBuilder.group({
      venueId: [0],
      //seatPermanent: [false],
      //seatPortable: [false],
      //seatExt: [''],
      branchID: [Number(this.LoggedInBranchId), Validators.required],
      statusID: [13, Validators.required],
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      phone1: ['', Validators.required],
      phone2: [''],
      fax: [''],
      email: ['', [Validators.email]],
      signInArea: [''],
      travelInstructions: [''],
      notes: [''],
      parkingInstructions: [''],
      webAddress: [''],
      description: [''],
      city: ['', Validators.required],
      state: [''],
      zip: ['', Validators.required],
      country: [''],
      venueImage: [''],
      venueImageHTML: [''],
      hiringLocation: ['False'],
      drivingDirection: [''],
      drivingDirectionFile: [''],
      drivingDirectionFileBase64: [''],
      parkingLocation: [''],
      roomNumber: [''],
      identificationReq: [''],
      specialInstructions: [''],
      map: [''],
      mapFileBase64: ['']
    });
  }

  ngOnInit() {
    this.fnGetBranchByUserId();
    this.fnGetAllStatusById();
    this.LoadVenue();
  }

  addMask(obj: Object) {
    this.phoneMask = "000-000-0000";
    this.showMask = false;
  }

  get f() { return this.VenueForm.controls; }

  LoadVenue() {
    if (this.VenueId != '' && this.VenueId != undefined && this.VenueId != null) {
      this.spinner.show();
      let obj = {
        VenueId: Number(this.VenueId)
      };

      this._VenueService.GetVenueByVenueId(obj).subscribe(res => {
        this.spinner.hide();
        this.VenueForm = this.formBuilder.group({
          venueId: [Number(this.VenueId)],
          //seatPermanent: [res[0].seatPermanent],
          //seatPortable: [res[0].seatPortable],
          //seatExt: [res[0].seatExt],
          branchID: [res[0].branchID, Validators.required],
          statusID: [res[0].statusID, Validators.required],
          name: [res[0].name, Validators.required],
          address1: [res[0].address1, Validators.required],
          address2: [res[0].address2],
          phone1: [res[0].phone1, Validators.required],
          phone2: [res[0].phone2],
          fax: [res[0].fax],
          email: [res[0].email, [Validators.email]],
          signInArea: [res[0].signInArea],
          travelInstructions: [res[0].travelInstructions],
          notes: [res[0].notes],
          parkingInstructions: [res[0].parkingInstructions],
          webAddress: [res[0].webAddress],
          description: [res[0].description],
          city: [(res[0].city).trim(), Validators.required],
          state: [res[0].state],
          zip: [(res[0].zip).trim(), Validators.required],
          country: [res[0].country],
          venueImage: [res[0].venueImage],
          venueImageHTML: [res[0].venueImageHTML],
          hiringLocation: [res[0].hiringLocation],
          drivingDirection: [res[0].drivingDirection],
          drivingDirectionFile: [res[0].drivingDirectionFile],
          drivingDirectionFileBase64: [''],
          parkingLocation: [res[0].parkingLocation],
          roomNumber: [res[0].roomNumber],
          identificationReq: [res[0].identificationReq],
          specialInstructions: [res[0].specialInstructions],
          map: [res[0].map],
          mapFileBase64: ['']
        });
      });
    }
  }

  fnGetBranchByUserId() {
    let Obj = {
      UserId: Number(this.LoggedInUserId)
    }
    this._UserService.GetBranchByUserId(Obj)
      .subscribe(res => {
        this.brData = res;

        // const branchId = this.VenueForm.get('branchID');
        // branchId.setValue(Number(this.LoggedInBranchId));
        // branchId.updateValueAndValidity();
      });
  }

  fnGetAllStatusById() {

    let obj = {
      StatusTypeID: StatusTypes.VenueStatusType
    }
    this._LookupService.GetAllStatusById(obj).subscribe(res1 => {
      this.lstStatus = res1;
    });
  }

  onBack() {
    this.router.navigate(['/mngVenue']);
  }

  onSubmit() {

    this.submitted = true;
    if (this.VenueForm.invalid) {
      this.VenueForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      this._VenueService.SaveVenue(this.VenueForm.value).subscribe(res => {
        this.spinner.hide();
        if (res == -1) {
          this._toasterService.error("Venue name already exists");
          return;
        }
        if (this.VenueId == '' || this.VenueId == undefined || this.VenueId == null) {
          this.VenueId = res;
          this.LoadVenue();
        }
        this._toasterService.success("Record has been saved successfully.");
      });
    }
  }

  fnFileName($event, name: string) {

    let file = $event.target.files[0];
    let iFileSize = Number($event.target.files[0].size);
    let extension = $event.target.files[0].name.substr(($event.target.files[0].name.lastIndexOf('.') + 1));
    if (iFileSize > 2101038) {
      this._toasterService.error('Please select image size less than 2 MB');
      return
    }
    if (extension.toLowerCase() != 'gif' && extension.toLowerCase() != 'jpeg' && extension.toLowerCase() != 'jpg' && extension.toLowerCase() != 'png') {
      this._toasterService.error("Only JPEG, PNG and GIF files are allowed.");
      return
    }
    if (name == 'drivingDirectionFileBase64') {
      const _documentPath = this.VenueForm.get("drivingDirectionFile");
      _documentPath.setValue($event.target.files[0].name);
      _documentPath.updateValueAndValidity();
    }
    if (name == 'mapFileBase64') {
      const _documentPath = this.VenueForm.get("map");
      _documentPath.setValue($event.target.files[0].name);
      _documentPath.updateValueAndValidity();
    }
    const FileBase64 = this.VenueForm.get(name);
    this.ConvertFile(file, FileBase64);
  }

  ConvertFile(file: any, FileBase64: any) {

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let data = reader.result.toString().replace(/^data:(.*,)?/, '');
      FileBase64.setValue(data);
      FileBase64.updateValueAndValidity();

      //console.log(data);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      return "";
    };
  }

  Search(obj: any) {
    debugger
    obj.venueId = this.VenueForm.value.venueId;
    this.ClientSearchParameters = obj;
    this.spinner.show();
    this._clientService.GetAllClientNotInVenueClients(obj).subscribe(res => {
      this.spinner.hide();
      if (res != null) {
        if (res.length > 0) {
          this.showheader = true;
          this.norecord = false;
        }
        else {
          this.showheader = true;
          this.norecord = true;
        }
      }
      else {
        this.showheader = true;
        this.norecord = true;
      }
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  TabChange(val) {
    if (val == 4) {
      this.LoadExistingClients();
      this.IsButtonShow = false;
    }
    else {
      this.IsButtonShow = true;
    }
  }

  LoadExistingClients() {
    this.spinner.show();
    let obj = { VenueId: this.VenueForm.value.venueId };
    this._clientService.GetClientByVenueID(obj).subscribe(res => {
      this.spinner.hide();
      this.lstExistingClients = res;
      this.dataSourceExistingClients = new MatTableDataSource<any>(this.lstExistingClients);
      this.Search(this.ClientSearchParameters);
    });
  }

  AddClient() {
    debugger
    let exluded = (this.dataSource.filteredData).filter(w => w.chkFlag == true);
    if (exluded.length > 0) {
      this.spinner.show();
      this._VenueService.SaveVenueClients(exluded).subscribe(res => {
        this._toasterService.success("Record has been Added Successfully");
        this.LoadExistingClients();
      });
    }
    else {
      this._toasterService.error("Please select at least one client.");
      return;
    }
  }

  DelVenueClient(venueClientsID) {
    const initialState = {
      title: "Message",
      message: "Are you sure to delete this record?",
    };
    this.bsModalRef = this.modalService.show(ConfirmBoxComponent, { ignoreBackdropClick: true, keyboard: true, class: 'modal-lg', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.spinner.show();
        let obj = { venueClientsID: venueClientsID };
        this._VenueService.DeleteVenueClients(obj).subscribe(res => {
          this.spinner.hide();
          this._toasterService.success("Record has been deleted Successfully.");
          this.LoadExistingClients();
        });
      }
    });
  }
}
