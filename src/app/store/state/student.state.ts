import { IStudent } from "../../models/student.interface";

export interface IStudentState {
  students: IStudent[];
  selectedStudent: IStudent;
  count: number;
}
export const initialStudentState: IStudentState = {
  students: null,
  selectedStudent: null,
  count: null
};
