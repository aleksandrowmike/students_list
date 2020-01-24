import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { IStudentState } from "../state/student.state";

const selectStudents = (state: IAppState) => state.students;
export const selectStudentList = createSelector(
  selectStudents,
  (state: IStudentState) => state.students,
);
export const selectSelectedStudent = createSelector(
  selectStudents,
  (state: IStudentState) => state.selectedStudent,
);
