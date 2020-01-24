import { RouterReducerState } from "@ngrx/router-store";
import { initialStudentState, IStudentState } from "./student.state";

export interface IAppState {
  router?: RouterReducerState;
  students: IStudentState;
}

export const initialAppState: IAppState = {
  students: initialStudentState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
