import { RouterReducerState } from "@ngrx/router-store";
import { IAuthState, initialAuthState } from "./auth.state";
import { IModeState, initialModeState } from "./mode.state";
import { initialStudentState, IStudentState } from "./student.state";


export interface IAppState {
  router?: RouterReducerState;
  students: IStudentState;
  mode: IModeState;
  auth: IAuthState;
}

export const initialAppState: IAppState = {
  students: initialStudentState,
  mode: initialModeState,
  auth: initialAuthState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
