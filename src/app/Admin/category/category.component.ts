import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  CategoryForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  LoggedInUserType: string;
  displayedColumns: string[] = ['categoryName', 'description', 'active', 'Edit'];
  dataSource = new MatTableDataSource<any>(this.lstData);
  SelectMainCategoryID = new FormControl('1');
  lstMainCategory: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _toasterService: ToastrService,
    private _CategoryService: CategoryService
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.CategoryForm = this.formBuilder.group({
      categoryID: [0],
      mainCategoryID: [0, Validators.required],
      categoryName: ['', Validators.required],
      description: [''],
      active: [false],
      createdBy: Number(this.LoggedInUserId)
    });
    this.LoadData("");
  }

  ngOnInit(): void {
    this.fnGetMainCategory();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fnGetMainCategory() {
    let obj =
      {}
    this.spinner.show();
    this._CategoryService.GetAllMainCategory(obj)
      .subscribe(res => {

        this.lstMainCategory = res
        this.spinner.hide();
      });
  }

  LoadData(event: any) {
    let obj = {
      mainCategoryID: Number(this.SelectMainCategoryID.value),
      Active: true
    }
    this.spinner.show();
    this._CategoryService.GetAllCategory(obj).subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
    });
  }

  onAddNew(template: TemplateRef<any>, lst) {
    this.CategoryForm = this.formBuilder.group({
      categoryID: [0],
      mainCategoryID: [0, Validators.required],
      categoryName: ['', Validators.required],
      description: [''],
      active: [false],
      createdBy: Number(this.LoggedInUserId)
    });
    const dialogRef = this.dialog.open(template, {
      width: '500px',
      data: this.CategoryForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Edit(template: TemplateRef<any>, lst) {
    debugger
    this.CategoryForm = this.formBuilder.group({
      categoryID: [lst.categoryID],
      mainCategoryID: [lst.mainCategoryID, Validators.required],
      categoryName: [lst.categoryName, Validators.required],
      description: [lst.description],
      active: [lst.active],
      createdBy: Number(this.LoggedInUserId)
    });
    const dialogRef = this.dialog.open(template, {
      width: '500px',
      data: this.CategoryForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Save() {
    if (this.CategoryForm.invalid) {
      this.CategoryForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      // let obj = {

      // };
      this._CategoryService.SaveCategory(this.CategoryForm.value).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this._toasterService.success("Record has been saved successfully.");
          this.dialog.closeAll();
          this.LoadData("");
        }
        else if (res == -1) {
          this._toasterService.error("Category name already exists.");
        }
        else {
          this._toasterService.error("Server error, Please try again after some time.");
        }
      });
    }
  }
}

