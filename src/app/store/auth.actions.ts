import { Action } from '@ngrx/store';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const LOGOUT = 'LOG_OUT';
export const SET_TOKEN = 'SET_TOKEN';

export class SignUp implements Action {
  readonly type = SIGN_UP;
}

export class SignIn implements Action {
  readonly type = SIGN_IN;
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) { }
}

export type AuthActions =
  SignUp |
  SignIn |
  LogOut |
  SetToken;
