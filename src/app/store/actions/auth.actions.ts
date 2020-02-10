import { Action } from "@ngrx/store";
import { IUser, IUserAuth } from "../../models/user.interface";

export enum EAuthActions {
  AuthUser = "[Auth] User Authorization",
  AuthUserSuccess = "[Auth] User Authorization success",
  AuthUserFail = "[Auth] User Authorization fail",
  UserLogOut = "[Auth] User log out",
  GetDataUser = "[User] Get data user",
  GetDataUserSuccess = "[User] Get data user success"
}
export class AuthUser implements Action {
  public readonly type = EAuthActions.AuthUser;
  constructor(public payload: IUserAuth ) {}
}
export class AuthUserSuccess implements Action {
  public readonly type = EAuthActions.AuthUserSuccess;
  constructor(public payload: {token: string, email: string}) {}
}
export class GetDataUser implements Action {
  public readonly type = EAuthActions.GetDataUser;
}
export class GetDataUserSuccess implements Action {
  public readonly type = EAuthActions.GetDataUserSuccess;
  constructor(public payload: IUser) {}
}
export class AuthUserFail implements Action {
  public readonly type = EAuthActions.AuthUserFail;
}
export class UserLogOut implements Action {
  public readonly type = EAuthActions.UserLogOut;
}
export type AuthActions = AuthUser | AuthUserSuccess | AuthUserFail | UserLogOut | GetDataUser | GetDataUserSuccess;
