import { Action } from "@ngrx/store";
import { IStudent } from "../../models/student.interface";

export enum EStudentActions {
  GetStudents = "[Student List] Get students",
  GetStudentsSuccess = "[Student List] Get students success",
  GetStudent = "[Student] Get student",
  GetStudentSuccess = "[Student] Get student success",
  CreateStudent = "[Create/Edit Student] Create student",
  CreateStudentsSuccess = "[Create/Edit Student] Create student success",
  CreateStudentsError = "[Create/Edit Student] Create student error",
  UpdateStudent = "[Create/Edit Student] Update student",
  UpdateStudentSuccess = "[Create/Edit Student] Update student success",
  UpdateStudentError = "[Create/Edit Student] Update student error",
  DeleteStudent = "[Student List] Delete student",
  DeleteStudentSuccess = "[Student List] Delete student success",
  DeleteStudentError = "[Student List] Delete student success",
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

export class CreateStudent implements Action {
  public readonly type = EStudentActions.CreateStudent;
  constructor(public payload: IStudent) {}
}
export class CreateStudentSuccess implements Action {
  public readonly type = EStudentActions.CreateStudentsSuccess;
  constructor(public payload: IStudent) {}
}
export class CreateStudentError implements Action {
  public readonly type = EStudentActions.CreateStudentsError;
}
export class UpdateStudent implements Action {
  public readonly type = EStudentActions.UpdateStudent;
}
export class UpdateStudentSuccess implements Action {
  public readonly type = EStudentActions.UpdateStudentSuccess;
  constructor(public payload: IStudent) {}
}
export class UpdateStudentError implements Action {
  public readonly type = EStudentActions.UpdateStudentError;
}
export class DeleteStudent implements Action {
  public readonly type = EStudentActions.DeleteStudent;
  constructor(public payload: string) {}
}
export class DeleteStudentSuccess implements Action {
  public readonly type = EStudentActions.DeleteStudentSuccess;
  constructor(public payload: string) {}
}
export type StudentActions =
  GetStudents | GetStudent | GetStudentsSuccess | GetStudentSuccess |
  CreateStudent | CreateStudentSuccess | CreateStudentError |
  DeleteStudent | DeleteStudentSuccess ;
