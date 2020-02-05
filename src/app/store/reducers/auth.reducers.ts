import { AuthActions, EAuthActions } from "../actions/auth.actions";
import { IAuthState, initialAuthState } from "../state/auth.state";

export function authReducers (state: IAuthState = initialAuthState, action: AuthActions): IAuthState {
  switch (action.type) {
    case EAuthActions.AuthUserSuccess: {
      return {
        ...state,
        token: action.payload.token,
        isLogged: true
      };
    }
    default: {
      return state;
    }
  }
}
