import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { IModeState } from "../state/mode.state";
import { IStudentState } from "../state/student.state";

const selectStudents = (state: IAppState) => state.students;
const appMode = (state: IAppState) => state.mode;
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
