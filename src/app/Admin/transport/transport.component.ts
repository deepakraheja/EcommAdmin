import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TransportService } from 'src/app/Service/Transport.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  TransportForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  LoggedInUserType: string;

  displayedColumns: string[] = ['name', 'phone', 'address', 'city', 'state', 'active', 'Edit'];
  //displayedColumns: string[] = ['companyName','name','designation', 'address1', 'phone', 'email', 'active', 'Edit'];
  dataSource = new MatTableDataSource<any>(this.lstData);
  phoneMask = null;
  zipMask = null;
  showMask = false;
  constructor(
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _toasterService: ToastrService,
    private _TransportService: TransportService
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.TransportForm = this.formBuilder.group({
      transportID: [0],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      active: [true],
      createdBy: Number(this.LoggedInUserId)
    });
    this.LoadData();
  }

  ngOnInit(): void {
  }

  addMask(obj: Object) {
    this.phoneMask = "0000000000";
    this.zipMask = "000000";
    this.showMask = false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  LoadData() {

    this.spinner.show();
    this._TransportService.GetAllTransport().subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
    });
  }

  onAddNew(template: TemplateRef<any>, lst) {
    this.TransportForm = this.formBuilder.group({
      transportID: [0],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      active: [true],
      createdBy: Number(this.LoggedInUserId)
    });
    const dialogRef = this.dialog.open(template, {
      width: '100vw',
      data: this.TransportForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Edit(template: TemplateRef<any>, lst) {
    debugger
    this.TransportForm = this.formBuilder.group({
      transportID: [lst.transportID],
      name: [lst.name, Validators.required],
      phone: [lst.phone, Validators.required],
      address: [lst.address, Validators.required],
      city: [lst.city, Validators.required],
      state: [lst.state, Validators.required],
      active: [lst.active],
      createdBy: Number(this.LoggedInUserId)
    });
    const dialogRef = this.dialog.open(template, {
      width: '100vw',
      data: this.TransportForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Save() {
    if (this.TransportForm.invalid) {
      this.TransportForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      this._TransportService.SaveTransport(this.TransportForm.value).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this._toasterService.success("Record has been saved successfully.");
          this.dialog.closeAll();
          this.LoadData();
        }
        else {
          this._toasterService.error("Server error, Please try again after some time.");
        }
      });
    }
  }
}

