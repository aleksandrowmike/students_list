import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { IAuthState } from "../state/auth.state";
import { IModeState } from "../state/mode.state";
import { IStudentState } from "../state/student.state";

const selectStudents = (state: IAppState) => state.students;
const appMode = (state: IAppState) => state.mode;
const tokenUser = (state: IAppState) => state.auth;
export const selectStudentList = createSelector(
  selectStudents,
  (state: IStudentState) => state.students,
);
export const selectSelectedStudent = createSelector(
  selectStudents,
  (state: IStudentState) => state.selectedStudent,
);
export const getMode = createSelector(
  appMode,
  (state: IModeState) => state.edit,
);
export const getCountStudent = createSelector(
  selectStudents,
  (state: IStudentState) => state.count,
);

export const getLoggedUser = createSelector(
  tokenUser,
  (state: IAuthState) => state.isLogged,
);
export const getAuthData = createSelector(
  tokenUser,
  (state: IAuthState) => state,
);
export const getUserInfo = createSelector(
  tokenUser,
  (state: IAuthState) => state.user,
);
