import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { IAuth } from "../../models/auth.interface";
import { IUser } from "../../models/user.interface";
import { UserService } from "../../services/user.service";
import { AuthUser, AuthUserSuccess, EAuthActions } from "../actions/auth.actions";
import { IAppState } from "../state/app.state";

@Injectable()
export class AuthEffects {
  @Effect()
  authUser$ = this._actions$.pipe(
    ofType<AuthUser>(EAuthActions.AuthUser),
    map(action => action.payload),
    switchMap((action: IUser) => this._userService.authUser(action).pipe(
      switchMap((res: IAuth) => of(new AuthUserSuccess({token: res.token}))),
      tap(() => this.router.navigate(["/"])),
    )),
  );
  constructor(
    private _userService: UserService,
    private _actions$: Actions,
    private router: Router,
    private _store: Store<IAppState>) {}
}
