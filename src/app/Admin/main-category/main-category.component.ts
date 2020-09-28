import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css']
})
export class MainCategoryComponent implements OnInit {
  MainCategoryForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  LoggedInUserType: string;
  displayedColumns: string[] = ['mainCategoryName', 'description', 'active', 'Edit'];
  dataSource = new MatTableDataSource<any>(this.lstData);

  constructor(
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _toasterService: ToastrService,
    private _CategoryService: CategoryService
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.MainCategoryForm = this.formBuilder.group({
      mainCategoryID: [0],
      mainCategoryName: ['', Validators.required],
      description: [''],
      active: [false],
      createdBy: Number(this.LoggedInUserId)
    });
    this.LoadData();
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  LoadData() {
    let obj = {
      Active: true
    }
    this.spinner.show();
    this._CategoryService.GetAllMainCategory(obj).subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
    });
  }

  onAddNew(template: TemplateRef<any>, lst) {
    this.MainCategoryForm = this.formBuilder.group({
      mainCategoryID: [0],
      mainCategoryName: ['', Validators.required],
      description: [''],
      active: [false],
      createdBy: Number(this.LoggedInUserId)
    });
    const dialogRef = this.dialog.open(template, {
      width: '500px',
      data: this.MainCategoryForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Edit(template: TemplateRef<any>, lst) {
    debugger
    this.MainCategoryForm = this.formBuilder.group({
      mainCategoryID: [lst.mainCategoryID],
      mainCategoryName: [lst.mainCategoryName, Validators.required],
      description: [lst.description],
      active: [lst.active],
      createdBy: Number(this.LoggedInUserId)
    });
    const dialogRef = this.dialog.open(template, {
      width: '500px',
      data: this.MainCategoryForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Save() {
    if (this.MainCategoryForm.invalid) {
      this.MainCategoryForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      // let obj = {

      // };
      this._CategoryService.SaveMainCategory(this.MainCategoryForm.value).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this._toasterService.success("Record has been saved successfully.");
          this.dialog.closeAll();
          this.LoadData();
        }
        else if (res == -1) {
          this._toasterService.error("Main Category name already exists.");
        }
        else {
          this._toasterService.error("Server error, Please try again after some time.");
        }
      });
    }
  }
}


