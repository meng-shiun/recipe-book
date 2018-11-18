import { Action } from '@ngrx/store';

export const TRY_SIGNUP = '[Auth] Try Signup';
export const SIGNUP = '[Auth] Signup';
export const TRY_SIGNIN = '[Auth] Try Signin';
export const SIGNIN = '[Auth] Signin';
export const LOGOUT = '[Auth] Logout';
export const SET_TOKEN = '[Auth] Set Token';

export class TrySignup implements Action {
    readonly type = TRY_SIGNUP;

    constructor(public payload: {username: string, password: string}) {}
}

export class TrySignin implements Action {
    readonly type = TRY_SIGNIN;

    constructor(public payload: {username: string, password: string}) {}
}

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

export type AuthActions = Signup | Signin | Logout | SetToken | TrySignup | TrySignin;