import { RouterReducerState } from "@ngrx/router-store";
import { IModeState, initialModeState } from "./mode.state";
import { initialStudentState, IStudentState } from "./student.state";


export interface IAppState {
  router?: RouterReducerState;
  students: IStudentState;
  mode: IModeState;
}

export const initialAppState: IAppState = {
  students: initialStudentState,
  mode: initialModeState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
