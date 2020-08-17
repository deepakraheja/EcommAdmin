import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { LocalStorageService } from '../Service/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  public LoginId;
  public Password;
  public User = [];
  LoggedInUserId: number;
  constructor(
    private _UserService: UserService,
    private _LocalStorage: LocalStorageService,
    private _ToastrService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }
  Login() {
    this.spinner.show();
    debugger
    //if (this.LoginId == "admin" && this.Password == "123456") {
    let UserObj = {
      LoginId: this.LoginId,
      password: this.Password,
      UserType: 1
    }
    //this._LocalStorage.storeOnLocalStorage("Selected", "0");
    //this._LocalStorage.storeOnLocalStorage("LoggedInUserId", "1");
    //this.spinner.hide();
    //this.router.navigate(['/home']);
    this._UserService.ValidLogin(UserObj).subscribe(_user => {
      this.spinner.hide();
      this.User = _user;
      if (_user != null) {
        if (this.User.length > 0) {
          //console.log(this.User)

          this._LocalStorage.storeOnLocalStorage("LoggedInUserId", this.User[0].userID.toString());
          this._LocalStorage.storeOnLocalStorage("LoggedInUserType", this.User[0].userType.toString());
          this._LocalStorage.storeOnLocalStorage("Name", this.User[0].name.toString());
          this._LocalStorage.storeOnLocalStorage("Token", this.User[0].token);
          this._LocalStorage.storeOnLocalStorage("Selected", "0");
          //this._LocalStorage.storeOnLocalStorage("LoggedInUserType","2");
          // if (this.User[0].branchId.toString() != "" || this.User[0].branchId != null) {
          this.router.navigate(['/home']);
          // }
          // else {
          //   //$('#spinner').css('display', 'none');
          //   this._ToastrService.error("Something went wrong.");

          // }
        }
        else {
          //$('#spinner').css('display', 'none');
          this._ToastrService.error("Invalid username and password");
        }
      }
      else {
        //$('#spinner').css('display', 'none');
        this._ToastrService.error("Invalid username and password", 'Authentication failed');
      }
    },
      err => {
        if (err.status == 400) {
          this._ToastrService.error("Invalid username and password");
        }
      }
    )
    // }
    // else {
    //   this.spinner.hide();
    //   this._ToastrService.error("Invalid username and password");
    //   return;
    // }
  }
}
