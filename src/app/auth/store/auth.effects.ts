import { Actions, ofType } from '@ngrx/effects';
import * as AuthActions from '../store/auth.action';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>
                ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                ).pipe(
                    map(resData => {
                        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                        return of(
                            new AuthActions.Login({
                                email: resData.email,
                                localId: resData.localId,
                                _token: resData.idToken,
                                _tokenExpirationDate: expirationDate
                            })
                        );
                    }),
                    catchError(error => {
                        of();
                    })
                );
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) { }
}
