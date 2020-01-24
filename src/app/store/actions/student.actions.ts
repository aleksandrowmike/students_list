import { Action } from "@ngrx/store";
import { IStudent } from "../../models/student.interface";

export enum EStudentActions {
  GetStudents = "[Student] Get students",
  GetStudentsSuccess = "[Student] Get students success",
  GetStudent = "[Student] Get student",
  GetStudentSuccess = "[Student] Get student success",
  AddStudent = "[Student] Add student",
  AddStudentsSuccess = "[Student] Add student success",
  UpdateStudent = "[Student] Update student",
  UpdateStudentsSuccess = "[Student] Update student success",
  DeleteStudent = "[Student] Delete student",
  DeleteStudentsSuccess = "[Student] Delete student success",
}
export class GetStudents implements Action {
  public readonly type = EStudentActions.GetStudents;
}
export class GetStudentsSuccess implements Action {
  public readonly type = EStudentActions.GetStudentsSuccess;
  constructor(public payload: IStudent[]) {}
}
export class GetStudent implements Action {
  public readonly type = EStudentActions.GetStudent;
  constructor(public payload: string) {}
}
export class GetStudentSuccess implements Action {
  public readonly type = EStudentActions.GetStudentSuccess;
  constructor(public payload: IStudent) {}
}
export type StudentActions = GetStudents | GetStudent | GetStudentsSuccess | GetStudentSuccess;
