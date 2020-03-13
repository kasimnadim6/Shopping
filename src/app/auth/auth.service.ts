import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<User>(null);
  expirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(emailId: string, pass: string) {
    return this.http.post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKey,
        {
          email: emailId,
          password: pass,
          returnSecureToken: true
        }
      ).pipe(catchError(this.handleErrors),
        tap(resp => {
          this.handleAuthentication(resp);
        })
      );
  }

  logIn(emailId: string, pass: string) {
    return this.http.post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey,
        {
          email: emailId,
          password: pass,
          returnSecureToken: true
        }
      ).pipe(catchError(this.handleErrors),
        tap(resp => {
          this.handleAuthentication(resp);
        })
      );
  }

  autoLogin() {
    const loggedInUser: { email: string, id: string, _token: string, _tokenExpirationDate: Date }
      = JSON.parse(localStorage.getItem('userData'));
    if (!loggedInUser) {
      return;
    }
    const loadedUser = new User(loggedInUser.email, loggedInUser.id, loggedInUser._token, new Date(loggedInUser._tokenExpirationDate));
    if (loadedUser.token) {
      this.user$.next(loadedUser);
      const remainingTokenExpirationTime = new Date(loggedInUser._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(remainingTokenExpirationTime);
    }
  }

  logout() {
    this.user$.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['./auth']);

    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(user) {
    const expirationDate = new Date(new Date().getTime() + +user.expiresIn * 1000);
    const loggedInUser = new User(user.email, user.localId, user.idToken, expirationDate);
    this.user$.next(loggedInUser);
    this.autoLogout(user.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(loggedInUser));
  }

  private handleErrors(err: HttpErrorResponse) {
    let errMsg = 'Something went wrong.';
    if (!err.error || !err.error.error) {
      return throwError(errMsg);
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errMsg = 'This e-mail already exist.';
        break;
      case 'EMAIL_NOT_FOUND':
        errMsg = 'This e-mail not found';
        break;
      case 'INVALID_PASSWORD':
        errMsg = 'You entered Invalid Password !';
        break;
    }
    return throwError(errMsg);
  }
}
