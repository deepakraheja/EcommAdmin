import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { StorageService } from '../../../../shared/services/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgentService } from 'src/app/Service/agent.service';
//import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginStart = false;
  submitted = false;

  constructor(
    private router: Router,
    private _LocalStorage: LocalStorageService,
    private _ToastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private _agentService: AgentService
  ) {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // if (this.storageService.getItem('token') != null) {
    //   this.router.navigateByUrl('account/login');
    // }
  }
  get f() {
    return this.loginForm.controls;
  }

  //***********************Login Here**************************/

  login() {
    debugger;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    //this.loginStart = true;
    let UserObj = {
      LoginId: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this._agentService.ValidAgentLogin(UserObj).subscribe(_user => {
      this.spinner.hide();
      debugger
      if (_user != null) {
        debugger
        if (_user.length > 0) {
          debugger
          this._LocalStorage.storeOnLocalStorage("LoggedInUserId", _user[0].userID.toString());
          this._LocalStorage.storeOnLocalStorage("Name", _user[0].name.toString());
          this._LocalStorage.storeOnLocalStorage("Token", _user[0].token);
          this._LocalStorage.storeOnLocalStorage("Selected", "0");
          this.router.navigate(['service/dashboard']);
        }
        else {
          this._ToastrService.error("Invalid username and password");
        }
      }
      else {
        this._ToastrService.error("Invalid username and password", 'Authentication failed');
      }
    },
      err => {
        if (err.status == 400) {
          this._ToastrService.error("Invalid username and password");
        }
      }
    )
  }
}
