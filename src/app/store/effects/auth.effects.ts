import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { IAuth } from "../../models/auth.interface";
import { IUser, IUserAuth } from "../../models/user.interface";
import { UserService } from "../../services/user.service";
import { AuthUser, AuthUserSuccess, EAuthActions, GetDataUser, GetDataUserSuccess, UserLogOut } from "../actions/auth.actions";
import { getAuthData } from "../selectors/students.selectors";
import { IAppState } from "../state/app.state";
import { IAuthState } from "../state/auth.state";

@Injectable()
export class AuthEffects {
  @Effect()
  authUser$ = this._actions$.pipe(
    ofType<AuthUser>(EAuthActions.AuthUser),
    map(action => action.payload),
    switchMap((action: IUserAuth) => this._userService.authUser(action).pipe(
      switchMap((res: IAuth) => of(new AuthUserSuccess({token: res.token, email: action.email}))),
      tap(() => this.router.navigate(["/"])),
    )),
  );
  @Effect()
  getUserData$ = this._actions$.pipe(
    ofType<GetDataUser>(EAuthActions.GetDataUser),
    switchMap(() => this._store.pipe(select(getAuthData))),
    switchMap((action: IAuthState) => this._userService.getAuthUser(action.email, action.token).pipe(
      switchMap((result: IUser) => of(new GetDataUserSuccess(result))),
    )),
  );
  @Effect()
  userLogOut$ = this._actions$.pipe(
    ofType<UserLogOut>(EAuthActions.UserLogOut),
    switchMap(() => of(new UserLogOut())),
    tap(() => this.router.navigate(["/"])),
  );
  constructor(
    private _userService: UserService,
    private _actions$: Actions,
    private router: Router,
    private _store: Store<IAppState>) {}
}
