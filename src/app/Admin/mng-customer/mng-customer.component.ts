import { Component, OnInit, Pipe, PipeTransform, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { ConfirmBoxComponent } from 'src/app/confirm-box/confirm-box.component';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@Component({
  selector: 'app-mng-customer',
  templateUrl: './mng-customer.component.html',
  styleUrls: ['./mng-customer.component.css']
})
export class MngCustomerComponent implements OnInit {
  UserDocumentPath = environment.UserDocumentPath;
  APIURL = environment.APIURL;
  UserForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  LoggedInUserType: string;
  selected: any;
  displayedColumns: string[] = ['name', 'email', 'mobileNo', 'additionalDiscount', 'statusId', 'isAgent', 'Upload', 'createdDate', 'approvedByUserName', 'approvedDate', 'Edit'];
  dataSource = new MatTableDataSource<any>(this.lstData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  showMask = false;
  PhoneMask = null;
  DecimalMask = null;
  PinCodeMask = null;
  public PopUpPreviewUrl: any;
  PopUpDocumentImg = [];
  SelectedUserId = 0;
  bsModalRef: BsModalRef;
  constructor(
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _toasterService: ToastrService,
    private _userService: UserService,
    private _datePipe: DatePipe,
    private modalService: BsModalService,
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.UserForm = this.formBuilder.group({
      userID: 0,
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobileNo: ['', Validators.required],
      statusId: ['', Validators.required],
      //isApproval: [0, Validators.required],
      approvedBy: Number(this.LoggedInUserId),
      approvedDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
      additionalDiscount: ['', Validators.required],
      businessType: ['', Validators.required],
      industry: ['', Validators.required],
      businessLicenseType: ['', Validators.required],
      gstNo: [''],
      panNo: [''],
      aadharCard: [''],
      businessName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      pinCode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      isAgent: [false],
      isVIPMember: [false],
      userDocument: []
    });
    this.LoadData();
    this.formControlValueChanged();
  }

  get f() { return this.UserForm.controls; }

  ngOnInit(): void {
  }

  formControlValueChanged() {
    debugger
    const businessLicenseType = this.UserForm.get('businessLicenseType');
    const gstNo = this.UserForm.get('gstNo');
    const panNo = this.UserForm.get('panNo');
    const AadharCard = this.UserForm.get('aadharCard');


    if (businessLicenseType.value == 'GSTIN') {
      gstNo.setValidators([Validators.required]);
      panNo.clearValidators();
      AadharCard.clearValidators();

      gstNo.updateValueAndValidity();
      panNo.updateValueAndValidity();
      AadharCard.updateValueAndValidity();
    }
    if (businessLicenseType.value == 'BusinessPAN') {
      panNo.setValidators([Validators.required]);
      gstNo.clearValidators();
      AadharCard.clearValidators();

      gstNo.updateValueAndValidity();
      panNo.updateValueAndValidity();
      AadharCard.updateValueAndValidity();
    }
    else if (businessLicenseType.value == 'AadharCard') {

      AadharCard.setValidators([Validators.required]);

      panNo.clearValidators();
      gstNo.clearValidators();

      AadharCard.updateValueAndValidity();
      gstNo.updateValueAndValidity();
      panNo.updateValueAndValidity();
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addMask(obj: Object) {
    this.PhoneMask = "0000000000";
    this.DecimalMask = "0*.00";
    this.PinCodeMask = "000000";
    this.showMask = false;
  }

  LoadData() {
    this.spinner.show();
    this._userService.GetAllCusotmers().subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  Edit(template: TemplateRef<any>, lst) {
    debugger
    this.UserForm = this.formBuilder.group({
      userID: [lst.userID],
      name: [lst.name, Validators.required],
      email: [lst.email, Validators.required],
      mobileNo: [lst.mobileNo, Validators.required],
      statusId: [lst.statusId, Validators.required],
      //isApproval: [lst.isApproval, Validators.required],
      approvedBy: Number(this.LoggedInUserId),
      approvedDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
      additionalDiscount: [lst.additionalDiscount, Validators.required],
      businessType: [lst.businessType, Validators.required],
      industry: [lst.industry, Validators.required],
      businessLicenseType: [lst.businessLicenseType, Validators.required],
      gstNo: [lst.gstNo],
      panNo: [lst.panNo],
      aadharCard: [lst.aadharCard],
      businessName: [lst.businessName, Validators.required],
      address1: [lst.address1, Validators.required],
      address2: [lst.address2],
      pinCode: [lst.pinCode, Validators.required],
      city: [lst.city, Validators.required],
      state: [lst.state, Validators.required],
      isAgent: [lst.isAgent],
      isVIPMember: [lst.isVIPMember],
      userDocument: [lst.userDocument]
    });
    if (this.UserForm.value.isAgent)
      this.selected = 1;
    if (this.UserForm.value.isVIPMember)
      this.selected = 2;
    this.formControlValueChanged();
    const dialogRef = this.dialog.open(template, {
      width: '700px',
      data: this.UserForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Save() {
    this.formControlValueChanged();
    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      this._userService.UpdateUser(this.UserForm.value).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this._toasterService.success("Record has been saved successfully.");
          this.dialog.closeAll();
          this.LoadData();
        }
        else if (res == -1) {
          this._toasterService.error("Email already exists.");
        }
        else if (res == -2) {
          this._toasterService.error("Yuo can not uncheck the box because this agent has some assigned customers. First unassigned them.");
        }
        else {
          this._toasterService.error("Server error, Please try again after some time.");
        }
      });
    }
  }

  ChangeMember(val) {
    if (val == 1) {
      this.selected = 1;
      const isVIPMember = this.UserForm.get('isVIPMember');
      isVIPMember.setValue(false);
      isVIPMember.updateValueAndValidity();
    }
    if (val == 2) {
      this.selected = 2;
      const isAgent = this.UserForm.get('isAgent');
      isAgent.setValue(false);
      isAgent.updateValueAndValidity();
    }
  }

  OpenImagePopUp(template: TemplateRef<any>, lst) {
    debugger
    this.PopUpDocumentImg = [];
    this.SelectedUserId = lst.userID;
    if (lst.userDocument != null) {
      lst.userDocument.forEach(element => {
        this.PopUpDocumentImg.push(this.UserDocumentPath + this.SelectedUserId + '/' + element);
      });
    }
    //SelectedProductImages
    this.PopUpPreviewUrl = this.PopUpDocumentImg[0];

    const dialogRef = this.dialog.open(template, {
      width: '90vw',
      height: '80vh',
      data: lst
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      this.SelectedUserId = 0;
      this.LoadData();
    });
  }

  UploadProductImages(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          debugger
          //console.log(event.target.result);
          // if (event.total / 1024 > 500) {
          //   this._toasterService.error('Photo should be less then 500kb.');
          //   return;
          // }
          this.PopUpDocumentImg.push(event.target.result);
          this.PopUpPreviewUrl = event.target.result;
          // this.EditProductDetailForm.updateValueAndValidity();
          // this.EditProductDetailForm.patchValue({
          //   productImg: this.images
          // });
          // this.EditProductDetailForm.updateValueAndValidity();
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeImg(index, type) {
    const initialState = {
      title: "Confirmation",
      message: "Do you want to delete " + type + " image?",
    };
    this.bsModalRef = this.modalService.show(ConfirmBoxComponent, { ignoreBackdropClick: true, keyboard: true, class: 'modal-sm', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      if (result) {
        debugger

        if (type == 'product') {
          debugger
          let obj = {
            ProductID: 0,
            ImagePath: (this.PopUpDocumentImg[index]).split(this.APIURL)[1]
          };
          this._userService.DeleteUserDocument(obj).subscribe(a => {
            this.PopUpDocumentImg.splice(index, 1);
            this._toasterService.success("Customer document has been deleted successfully.");
          });
        }
      }
    });
  }

  ShowPopUpImage(val) {
    this.PopUpPreviewUrl = val;
  }

  SaveUserDocument() {
    let obj = {
      UserID: Number(this.SelectedUserId),
      UserDocument: this.PopUpDocumentImg
    };
    this.spinner.show();
    this._userService.SaveUserDocumentImages(obj).subscribe(res => {
      this.spinner.hide();
      this.dialog.closeAll();
      this._toasterService.success("Customer document has been uploaded successfully.");
    });
  }

}


