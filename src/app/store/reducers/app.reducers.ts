import { Action, ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { studentReducers } from "./student.reducers";

export const appReducers: ActionReducerMap<IAppState, Action> = {
  students: studentReducers
};
