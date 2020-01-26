import { Action } from "@ngrx/store";

export enum EAppActions {
  EditMode = "[Edit mode] Edit mode on/off"
}

export class EditMode implements Action {
  public readonly type = EAppActions.EditMode;
  constructor(public payload: boolean) {}
}

export type AppActions = EditMode;
