import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from 'src/app/Service/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  SupplierForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  LoggedInUserType: string;

  // displayedColumns: string[] = ['name', 'address1', 'city', 'state', 'country', 'postalCode', 'phone', 'email', 'paymentMethod', 'notes', 'active', 'Edit'];
  displayedColumns: string[] = ['companyName','name','designation', 'address1', 'phone', 'email', 'active', 'Edit'];
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
    private _SupplierService: SupplierService
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.SupplierForm = this.formBuilder.group({
      supplierID: [0],
      companyName: ['', Validators.required],
      name: [''],
      designation: ['', Validators.required],
      address1: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      paymentMethod: [''],
      notes: [''],
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
    this._SupplierService.GetAllSupplier().subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
    });
  }

  onAddNew(template: TemplateRef<any>, lst) {
    this.SupplierForm = this.formBuilder.group({
      supplierID: [0],
      companyName: ['', Validators.required],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      address1: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      paymentMethod: [''],
      notes: [''],
      active: [true],
      createdBy: Number(this.LoggedInUserId)
    });
    const dialogRef = this.dialog.open(template, {
      width: '100vw',
      data: this.SupplierForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Edit(template: TemplateRef<any>, lst) {
    debugger
    this.SupplierForm = this.formBuilder.group({
      supplierID: [lst.supplierID],
      companyName: [lst.companyName, Validators.required],
      name: [lst.name, Validators.required],
      designation: [lst.designation, Validators.required],
      address1: [lst.address1, Validators.required],
      city: [lst.city, Validators.required],
      state: [lst.state, Validators.required],
      country: [lst.country, Validators.required],
      postalCode: [lst.postalCode, Validators.required],
      phone: [lst.phone, Validators.required],
      email: [lst.email, [Validators.required, Validators.email]],
      paymentMethod: [lst.paymentMethod],
      notes: [lst.notes],
      active: [lst.active],
      createdBy: Number(this.LoggedInUserId)
    });
    const dialogRef = this.dialog.open(template, {
      width: '100vw',
      data: this.SupplierForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Save() {
    if (this.SupplierForm.invalid) {
      this.SupplierForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      // let obj = {

      // };
      this._SupplierService.SaveSupplier(this.SupplierForm.value).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this._toasterService.success("Record has been saved successfully.");
          this.dialog.closeAll();
          this.LoadData();
        }
        // else if (res == -1) {
        //   this._toasterService.error("Role name already exists.");
        // }
        else {
          this._toasterService.error("Server error, Please try again after some time.");
        }
      });
    }
  }
}

