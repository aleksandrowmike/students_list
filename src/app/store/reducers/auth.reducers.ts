import { AuthActions, EAuthActions } from "../actions/auth.actions";
import { IAuthState, initialAuthState } from "../state/auth.state";

export function authReducers (state: IAuthState = initialAuthState, action: AuthActions): IAuthState {
  switch (action.type) {
    case EAuthActions.AuthUserSuccess: {
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
        isLogged: true
      };
    }
    case EAuthActions.GetDataUserSuccess: {
      return {
        ...state,
        user: {
          email: action.payload.email,
          name: action.payload.name,
          avatar: action.payload.avatar
        }
      };
    }
    case EAuthActions.UserLogOut: {
      return {
        ...state,
        user: null,
        isLogged: false,
        token: null
      };
    }
    default: {
      return state;
    }
  }
}
