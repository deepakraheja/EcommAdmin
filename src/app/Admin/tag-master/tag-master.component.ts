import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TagService } from 'src/app/Service/tag.service';

@Component({
  selector: 'app-tag-master',
  templateUrl: './tag-master.component.html',
  styleUrls: ['./tag-master.component.css']
})
export class TagMasterComponent implements OnInit {
  TagForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  LoggedInUserType: string;
  displayedColumns: string[] = ['tagName', 'description', 'active', 'Edit'];
  dataSource = new MatTableDataSource<any>(this.lstData);

  constructor(
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _toasterService: ToastrService,
    private _TagService: TagService
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.TagForm = this.formBuilder.group({
      tagId: [0],
      tagName: ['', Validators.required],
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
      Active: 1
    }
    this.spinner.show();
    this._TagService.GetAllTag(obj).subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
    });
  }

  onAddNew(template: TemplateRef<any>, lst) {
    this.TagForm = this.formBuilder.group({
      tagId: [0],
      tagName: ['', Validators.required],
      description: [''],
      active: [false],
      createdBy: Number(this.LoggedInUserId)
    });
    const dialogRef = this.dialog.open(template, {
      width: '500px',
      data: this.TagForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Edit(template: TemplateRef<any>, lst) {
    debugger
    this.TagForm = this.formBuilder.group({
      tagId: [lst.tagId],
      tagName: [lst.tagName, Validators.required],
      description: [lst.description],
      active: [lst.active],
      createdBy: Number(this.LoggedInUserId)
    });
    const dialogRef = this.dialog.open(template, {
      width: '500px',
      data: this.TagForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Save() {
    if (this.TagForm.invalid) {
      this.TagForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      // let obj = {

      // };
      this._TagService.SaveTag(this.TagForm.value).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this._toasterService.success("Record has been saved successfully.");
          this.dialog.closeAll();
          this.LoadData();
        }
        else if (res == -1) {
          this._toasterService.error("Tag name already exists.");
        }
        else {
          this._toasterService.error("Server error, Please try again after some time.");
        }
      });
    }
  }
}

