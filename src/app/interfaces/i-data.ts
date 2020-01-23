import { Observable } from "rxjs";
import { IStudents } from "./students";

export interface IData {
  getStudents(): Observable<IStudents[]>;
  getCountStudents(): Observable<Number>;
  createStudent(data: IStudents): Observable<IStudents>;
  getStudentsById(_id: string): Observable<IStudents[]>;
  updateStudent(_id: string, data: IStudents ): Observable<IStudents>;
  deleteStudent(_id: string): Observable<IStudents>;
  getEditPermission(_id: string): Observable<boolean>;
}
