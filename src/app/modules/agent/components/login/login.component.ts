import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { StorageService } from '../../../../shared/services/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    
    private fb: FormBuilder,
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
    this.loginStart = true;

      this.router.navigate(['service/dashboard']);
  } 

}
