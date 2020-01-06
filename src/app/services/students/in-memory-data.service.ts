import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { toArray } from "rxjs/operators";
import { IStudents } from "../../data/students";
import { StudentsMock } from "../../data/students-mock";
import { DataService } from "../data.service";

@Injectable({
  providedIn: DataService
})
export class InMemoryDataService {
  private _students: IStudents[] = StudentsMock;
  private _student: IStudents;
  public getStudents(): Observable<IStudents[]> {
     return of(this._students);
  }
  public deleteStudent(_id: string): Observable<IStudents> {
    console.log(this._students);
    this._students = this._students.filter(student => student._id !== _id ? this._student = student : this._student = null);
    console.log(this._students);
    return of(this._student);
  }
  public createStudent(data: IStudents): Observable<IStudents> {
    this._students.push(data);
    return of(data);
  }
  public getStudentsById(_id: string): Observable<IStudents[]> {
    this._student = this._students.find(student => student._id === _id);
    return of(this._student).pipe(toArray());
  }
  public updateStudent(_id: string, data: IStudents ): Observable<IStudents> {
    this._students.forEach(student => {
      if (student._id === _id) {
        student.firstName = data.firstName;
        student.lastName = data.lastName;
        student.middleName = data.middleName;
        student.birth = data.birth;
        student.score = data.score;
      }
    });
    return of(this._student);
  }
  public getCountStudents(): Observable<Number> {
    return of(this._students.length);
  }
}
