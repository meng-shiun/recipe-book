import { Action } from '@ngrx/store';

export const SIGNUP = '[Auth] Signup';
export const SIGNIN = '[Auth] Signin';
export const LOGOUT = '[Auth] Logout';
export const SET_TOKEN = '[Auth] Set Token';

export class Signup implements Action {
    readonly type = SIGNUP;
}

export class Signin implements Action {
    readonly type = SIGNIN;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string) {}
}

export type AuthActions = Signup | Signin | Logout | SetToken;