import { Action, ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { appModeReducer } from "./app-mode.reducers";
import { studentReducers } from "./student.reducers";


export const appReducers: ActionReducerMap<IAppState, Action> = {
  students: studentReducers,
  mode: appModeReducer
};
