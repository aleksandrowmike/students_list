import { Action } from "@ngrx/store";
import { IAuth } from "../../models/auth.interface";
import { IUser } from "../../models/user.interface";

export enum EAuthActions {
  AuthUser = "[Auth] User Authorization",
  AuthUserSuccess = "[Auth] User Authorization success",
  AuthUserFail = "[Auth] User Authorization fail",
  UserLogOut = "[Auth] User log out"
}
export class AuthUser implements Action {
  public readonly type = EAuthActions.AuthUser;
  constructor(public payload: IUser ) {}
}
export class AuthUserSuccess implements Action {
  public readonly type = EAuthActions.AuthUserSuccess;
  constructor(public payload: {token: string}) {}
}
export class AuthUserFail implements Action {
  public readonly type = EAuthActions.AuthUserFail;
}
export class UserLogOut implements Action {
  public readonly type = EAuthActions.UserLogOut;
}
export type AuthActions = AuthUser | AuthUserSuccess | AuthUserFail | UserLogOut;
