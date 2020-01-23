import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { IData } from "../../interfaces/i-data";
import { IStudents } from "../../interfaces/students";
import { DataService } from "../data.service";
import { NotificationService } from "../notification.service";

@Injectable({
  providedIn: DataService
})

export class HttpDataService implements IData {
  constructor(private http: HttpClient, private notificationService: NotificationService) {
  }
  private _apiUri: string  = "https://backend-list.herokuapp.com/students/";
  public getStudents(): Observable<IStudents[]> {
    return this.http.get<IStudents[]>(this._apiUri).pipe(
      catchError(this.notificationService.handleError<IStudents[]>("Error")),
    );
  }
  public getCountStudents(): Observable<Number> {
    return this.http.get<Number>(this._apiUri + "count").pipe(
      catchError(this.notificationService.handleError<Number>("Error")),
    );
  }
  public createStudent(data: IStudents): Observable<IStudents> {
    return this.http.post<IStudents>(this._apiUri, data).pipe(
      tap(() => this.notificationService.add({type: "success", message: "Student successfully added"})),
      catchError(this.notificationService.handleError<IStudents>("Error")),
    );
  }
  public getStudentsById(_id: string): Observable<IStudents[]> {
    return this.http.get<IStudents[]>(this._apiUri + _id).pipe(
      catchError(this.notificationService.handleError<IStudents[]>("Error")),
    );
  }
  public updateStudent(_id: string, data: IStudents ): Observable<IStudents> {
    return this.http.put<IStudents>(this._apiUri + _id, data).pipe(
      tap(() => this.notificationService.add({type: "success", message: "Student successfully updated"})),
      catchError(this.notificationService.handleError<IStudents>("Error")),
    );
  }
  public deleteStudent(_id: string): Observable<IStudents> {
      return this.http.delete<IStudents>(this._apiUri + _id).pipe(
        tap(() => this.notificationService.add({type: "success", message: "Student successfully deleted"})),
        catchError(this.notificationService.handleError<IStudents>("Error")),
      );
  }
  public getEditPermission(_id: string): Observable<boolean> {
    return this.http.get<IStudents[]>(this._apiUri + _id).pipe(
      map(student => student[0].score !== 5),
      catchError(this.notificationService.handleError<boolean>("Error")),
  );
  }
}
