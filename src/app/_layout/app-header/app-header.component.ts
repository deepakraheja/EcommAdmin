import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { Router } from '@angular/router';
import { GlobalConstantsService } from 'src/app/Service/global-constants.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  providers:[GlobalConstantsService]
})
export class AppHeaderComponent implements OnInit {
  menuname: string = "";
  public admin: boolean = false;
  public product: boolean = false;
  public payroll: boolean = false;
  public report: boolean = false;
  menuIconClass: string = "";

  public materialprimary: string;
  public materialsecondary: string;
  constructor(
    private _LocalStorage: LocalStorageService,
    private router: Router,
    public global: GlobalConstantsService
  ) { }

  ngOnInit(): void {
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "0") {
      this.menuname = "Dashboard";
      this.menuIconClass = "fa-tachometer icon-users bg-white-icon";
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-grey-primary";
      this.materialsecondary = "material-grey-secondary space-all";
    }
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "1") {
      this.menuname = "Admin";
      this.menuIconClass = "icon-users material-yellow-primary bg-white-icon bg-yellow-icon";
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-yellow-primary";
      this.materialsecondary = "material-yellow-secondary space-all";

      this.admin = true;
      // this.payroll = false;
      this.product = false;
      // this.report = false;

    }
    if (this._LocalStorage.getValueOnLocalStorage("Selected") == "2") {
      this.menuname = "Product";
      this.menuIconClass = "icon-stack material-blue-primary bg-white-icon bg-blue-icon";
      this.materialprimary = "navbar navbar-expand-md navbar-dark material-blue-primary";
      this.materialsecondary = "material-blue-secondary space-all";

      this.product = true;
      this.admin = false;
      // this.payroll = false;
      // this.report = false;
    }
    // if (this._LocalStorage.getValueOnLocalStorage("Selected") == "3") {
    //   this.materialprimary = "navbar navbar-expand-md navbar-dark material-green-primary";
    //   this.materialsecondary = "material-green-secondary space-all";

    //   this.payroll = true;
    //   this.admin = false;
    //   this.record = false;
    //   this.report = false;
    //   this.menuname = "Payroll";
    //   this.menuIconClass = "icon-cash material-green-primary bg-white-icon bg-green-icon";
    // }
    // if (this._LocalStorage.getValueOnLocalStorage("Selected") == "4") {
    //   this.materialprimary = "navbar navbar-expand-md navbar-dark material-blue-primary";
    //   this.materialsecondary = "material-blue-secondary space-all";

    //   this.payroll = false;
    //   this.admin = false;
    //   this.record = false;
    //   this.report = true;
    //   this.menuname = "Reports";
    //   this.menuIconClass = "icon-cash material-blue-primary bg-white-icon bg-blue-icon";
    // }
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
}
