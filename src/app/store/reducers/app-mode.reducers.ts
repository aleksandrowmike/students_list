import { AppActions, EAppActions } from "../actions/app.actions";
import { IModeState, initialModeState } from "../state/mode.state";

export function appModeReducer (state: IModeState = initialModeState, action: AppActions): IModeState {
  switch (action.type) {
    case EAppActions.EditMode: {
      return {
        ...state,
        edit: action.payload
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
