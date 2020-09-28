import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FabricService } from 'src/app/Service/fabric.service';

@Component({
  selector: 'app-fabric-type',
  templateUrl: './fabric-type.component.html',
  styleUrls: ['./fabric-type.component.css']
})
export class FabricTypeComponent implements OnInit {
  FabricTypeForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  LoggedInUserType: string;
  displayedColumns: string[] = ['fabricType', 'description', 'active', 'Edit'];
  dataSource = new MatTableDataSource<any>(this.lstData);
  lstFabric: any;
  title: string = "Add Module";
  SelectfabricId = new FormControl('1');
  constructor(
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _toasterService: ToastrService,
    private _FabricService: FabricService,
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.FabricTypeForm = this.formBuilder.group({
      fabricTypeId: [0],
      //fabricId: ['', Validators.required],
      fabricType: ['', Validators.required],
      description: [''],
      active: [false],
      createdBy: Number(this.LoggedInUserId)
    });
    this.LoadData("");
  }

  ngOnInit(): void {
    //this.fnGetFabric();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // fnGetFabric() {
  //   let obj =
  //     {}
  //   this.spinner.show();
  //   this._FabricService.GetAllFabric(obj)
  //     .subscribe(res => {

  //       this.lstFabric = res
  //       this.spinner.hide();
  //     });
  // }

  LoadData(event: any) {
    let obj = {
      //fabricId: Number(this.SelectfabricId.value),
      Active: false
    }
    this.spinner.show();
    this._FabricService.GetAllFabricType(obj).subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
    });
  }

  onAddNew(template: TemplateRef<any>, lst) {
    this.FabricTypeForm = this.formBuilder.group({
      fabricTypeId: [0],
      //fabricId: ['', Validators.required],
      fabricType: ['', Validators.required],
      description: [''],
      active: [false],
      createdBy: Number(this.LoggedInUserId)
    });
    const dialogRef = this.dialog.open(template, {
      width: '500px',
      data: this.FabricTypeForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Edit(template: TemplateRef<any>, lst) {
    debugger
    this.FabricTypeForm = this.formBuilder.group({
      fabricTypeId: [lst.fabricTypeId],
      //fabricId: [lst.fabricId, Validators.required],
      fabricType: [lst.fabricType, Validators.required],
      description: [lst.description],
      active: [lst.active],
      createdBy: Number(this.LoggedInUserId)
    });
    const dialogRef = this.dialog.open(template, {
      width: '500px',
      data: this.FabricTypeForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Save() {
    if (this.FabricTypeForm.invalid) {
      this.FabricTypeForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      // let obj = {

      // };
      this._FabricService.SaveFabricType(this.FabricTypeForm.value).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this._toasterService.success("Record has been saved successfully.");
          this.dialog.closeAll();
          this.LoadData("");
        }
        else if (res == -1) {
          this._toasterService.error("Fabric Type fabricType already exists.");
        }
        else {
          this._toasterService.error("Server error, Please try again after some time.");
        }
      });
    }
  }
}


