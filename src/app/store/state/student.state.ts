import { IStudent } from "../../models/student.interface";

export interface IStudentState {
  students: IStudent[];
  selectedStudent: IStudent;
}
export const initialStudentState: IStudentState = {
  students: null,
  selectedStudent: null
};
