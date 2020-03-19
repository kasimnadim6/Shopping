import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: { email: string, localId: string, _token: string, _tokenExpirationDate: Date }) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload: string) { }
}

export type Actions = Login | Logout | LoginStart | LoginFail;
