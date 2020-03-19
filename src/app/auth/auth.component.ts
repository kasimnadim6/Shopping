import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean;
  constructor(
    private authSvc: AuthService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
      this.spinner.show();
      this.authSvc.logIn(email, password)
        // this.store.dispatch(new AuthActions.LoginStart({
        //   email: email,
        //   password: password
        // }))
        .subscribe(
          resp => {
            this.spinner.hide();
            this.messagePopUp(`You're logged-in successfully.`);
            this.router.navigate(['./recipe']);
          },
          errMsg => {
            this.spinner.hide();
            this.messagePopUp(errMsg);
          });
    } else {
      this.spinner.show();
      this.authSvc.signUp(email, password).subscribe(
        resp => {
          this.spinner.hide();
          this.messagePopUp(`You're data has been saved.`);
          this.router.navigate(['./recipe']);
        },
        errMsg => {
          this.spinner.hide();
          this.messagePopUp(errMsg);
        });
    }
    form.reset();
  }

  messagePopUp(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
