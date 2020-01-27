import { Action, ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import { IAppState } from "../state/app.state";
import { appModeReducer } from "./app-mode.reducers";
import { studentReducers } from "./student.reducers";


export const appReducers: ActionReducerMap<IAppState, Action> = {
  students: studentReducers,
  mode: appModeReducer
};
export function localStorageSyncReducer(reducer: ActionReducer<Action>): ActionReducer<Action> {
  return localStorageSync({keys: ["students", "mode"], rehydrate: true})(reducer);
}
export const metaReducers: Array<MetaReducer<unknown, Action>> = [localStorageSyncReducer];
