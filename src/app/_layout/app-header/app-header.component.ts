import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { Router } from '@angular/router';
import { GlobalConstantsService } from 'src/app/Service/global-constants.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  providers: [GlobalConstantsService]
})
export class AppHeaderComponent implements OnInit {
  menuname: string = "";
  public admin: boolean = false;
  public product: boolean = false;
  public user: boolean = false;
  public order: boolean = false;
  public report: boolean = false;
  public Category: boolean = false;
  public fabric: boolean = false;
  public agent: boolean = false;
  public customer: boolean = false;
  menuIconClass: string = "";
  public LoggedInName: string = "";
  public materialprimary: string;
  public materialsecondary: string;
  public ChangePasswordForm: FormGroup;
  constructor(
    private _LocalStorage: LocalStorageService,
    private router: Router,
    public global: GlobalConstantsService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public _toasterService: ToastrService,
    public _UserService: UserService
  ) { }

  ngOnInit(): void {
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "0") {
      this.menuname = "Dashboard";
      this.menuIconClass = "fa-tachometer icon-users bg-white-icon";
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-grey-primary";
      this.materialsecondary = "material-grey-secondary space-all";
    }
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "1") {
      this.menuname = "Setting";
      this.menuIconClass = "icon-users material-yellow-primary bg-white-icon bg-yellow-icon";
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-yellow-primary";
      this.materialsecondary = "material-yellow-secondary space-all";

      this.admin = true;
      this.order = false;
      this.product = false;
      this.user = false;
      this.report = false;
      this.Category = false;
      this.fabric = false;
      this.agent = false;
      this.customer = false;
    }
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "2") {
      this.menuname = "Product";
      this.menuIconClass = "icon-stack material-blue-primary bg-white-icon bg-blue-icon";
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-blue-primary";
      this.materialsecondary = "material-blue-secondary space-all";

      this.product = true;
      this.admin = false;
      this.order = false;
      this.user = false;
      this.report = false;
      this.Category = false;
      this.fabric = false;
      this.agent = false;
      this.customer = false;
    }
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "3") {
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-green-primary";
      this.materialsecondary = "material-green-secondary space-all";

      this.order = false;
      this.admin = false;
      this.product = false;
      this.user = true;
      this.report = false;
      this.Category = false;
      this.fabric = false;
      this.agent = false;
      this.customer = false;
      this.menuname = "User";
      this.menuIconClass = "icon-cash material-green-primary bg-white-icon bg-green-icon";
    }
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "4") {
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-navyblue-primary";
      this.materialsecondary = "material-navyblue-secondary space-all";

      this.order = true;
      this.admin = false;
      this.product = false;
      this.user = false;
      this.report = false;
      this.Category = false;
      this.fabric = false;
      this.agent = false;
      this.customer = false;
      this.menuname = "Order";
      this.menuIconClass = "icon-cash material-navyblue-primary bg-white-icon bg-navyblue-icon";
    }
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "5") {
      this.menuname = "Category";
      this.menuIconClass = "icon-stack material-DarkGreen-primary bg-white-icon bg-DarkGreen-icon";
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-DarkGreen-primary";
      this.materialsecondary = "material-DarkGreen-secondary space-all";

      this.Category = true;
      this.product = false;
      this.admin = false;
      this.order = false;
      this.user = false;
      this.fabric = false;
      this.agent = false;
      this.report = false;
      this.customer = false;
    }
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "6") {
      this.menuname = "Fabric";
      this.menuIconClass = "icon-stack material-DarkGreen-primary bg-white-icon bg-DarkGreen-icon";
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-DarkGreen-primary";
      this.materialsecondary = "material-DarkGreen-secondary space-all";

      this.Category = false;
      this.product = false;
      this.admin = false;
      this.order = false;
      this.user = false;
      this.fabric = true;
      this.agent = false;
      this.report = false;
      this.customer = false;
    }
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "7") {
      this.menuname = "Agent";
      this.menuIconClass = "icon-stack material-DarkGreen-primary bg-white-icon bg-DarkGreen-icon";
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-DarkGreen-primary";
      this.materialsecondary = "material-DarkGreen-secondary space-all";

      this.Category = false;
      this.product = false;
      this.admin = false;
      this.order = false;
      this.user = false;
      this.fabric = false;
      this.agent = true;
      this.report = false;
      this.customer = false;
    }
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "8") {
      this.menuname = "Reports";
      this.menuIconClass = "icon-stack material-DarkGreen-primary bg-white-icon bg-DarkGreen-icon";
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-DarkGreen-primary";
      this.materialsecondary = "material-DarkGreen-secondary space-all";

      this.Category = false;
      this.product = false;
      this.admin = false;
      this.order = false;
      this.user = false;
      this.fabric = false;
      this.agent = false;
      this.report = true;
      this.customer = false;
    }
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "9") {
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-green-primary";
      this.materialsecondary = "material-green-secondary space-all";

      this.order = false;
      this.admin = false;
      this.product = false;
      this.user = false;
      this.report = false;
      this.Category = false;
      this.fabric = false;
      this.agent = false;
      this.customer = true;
      this.menuname = "Customer";
      this.menuIconClass = "icon-cash material-green-primary bg-white-icon bg-green-icon";
    }
    this.LoggedInName = this._LocalStorage.getValueOnLocalStorage("Name");


  }

  public ChangeName(name: string): void {
    debugger;

    this._LocalStorage.storeOnLocalStorage("Selected", name);

  }

  logout() {
    debugger
    this._LocalStorage.removeAllLocalStorage();
    this.router.navigate(['/adminlogin']);
  }

  onChangePassword(template: TemplateRef<any>, lst) {
    this.ChangePasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    const dialogRef = this.dialog.open(template, {
      width: '500px',
      data: this.ChangePasswordForm
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  Save() {
    if (this.ChangePasswordForm.invalid) {
      this.ChangePasswordForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      if (this.ChangePasswordForm.value.newPassword != this.ChangePasswordForm.value.confirmPassword) {
        this._toasterService.error("New password & confirm password must be same.");
        return;
      }
      else {
        let obj = {
          password: this.ChangePasswordForm.value.password,
          NewPassword: this.ChangePasswordForm.value.newPassword
        }
        this._UserService.UserPasswordChange(obj).subscribe(res => {
          if (res > 0) {
            this._toasterService.success("Password has been changed sucessfully.");
            this.dialog.closeAll();
          }
          else {
            this._toasterService.error("Old password is invalid");
          }
        });
      }
    }
  }
}
