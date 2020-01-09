import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap, toArray } from "rxjs/operators";
import { IData } from "../../data/i-data";
import { IStudents } from "../../data/students";
import { StudentsMock } from "../../data/students-mock";
import { DataService } from "../data.service";
import { NotificationService } from "../notification.service";

@Injectable({
  providedIn: DataService
})
export class InMemoryDataService implements IData {
  private _students: IStudents[] = StudentsMock;
  private _student: IStudents;
  private _editPermission: boolean;
  constructor(private notificationService: NotificationService) {}
  public getStudents(): Observable<IStudents[]> {
     return of(this._students).pipe(
       catchError(this.notificationService.handleError<IStudents[]>("Error")),
     );
  }
  public deleteStudent(_id: string): Observable<IStudents> {
    this._students = this._students.filter(student => student._id !== _id ? this._student = student : this._student = null);
    return of(this._student).pipe(
      tap(() => this.notificationService.add({type: "success", message: "Student successfully deleted"})),
      catchError(this.notificationService.handleError<IStudents>("Error")),
    );
  }
  public createStudent(data: IStudents): Observable<IStudents> {
    this._students.push(data);
    return of(data).pipe(
      tap(() => this.notificationService.add({type: "success", message: "Student successfully added"})),
      catchError(this.notificationService.handleError<IStudents>("Error")),
    );
  }
  public getStudentsById(_id: string): Observable<IStudents[]> {
    this._student = this._students.find(student => student._id === _id);
    return of(this._student).pipe(
      toArray(),
      catchError(this.notificationService.handleError<IStudents[]>("Error")),
    );
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
    return of(this._student).pipe(
      tap(() => this.notificationService.add({type: "success", message: "Student successfully updated"})),
      catchError(this.notificationService.handleError<IStudents>("Error")),
    );
  }
  public getCountStudents(): Observable<Number> {
    return of(this._students.length).pipe(
      catchError(this.notificationService.handleError<Number>("Error")),
    );
  }
  public getEditPermission(_id: string): Observable<boolean> {
    this._student = this._students.find(student => student._id === _id);
    this._student.score === 5 ? this._editPermission = false : this._editPermission = true;
    return of(this._editPermission).pipe(catchError(this.notificationService.handleError<boolean>("Error")));
}
}
