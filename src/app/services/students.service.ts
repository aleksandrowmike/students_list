import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { IStudent } from "../models/student.interface";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: "root"
})
export class StudentsService {
  private _apiUri: string  = !environment.production ? "http://localhost:3000/students/" : "https://backend-students.herokuapp.com/students/";
  constructor(private http: HttpClient,
              private notificationService: NotificationService,
              private router: ActivatedRoute) {
  }
  public editMode(): boolean {
    return this.router.snapshot.queryParams["edit"] === "true";
  }

  public getStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(this._apiUri).pipe(
      catchError(this.notificationService.handleError<IStudent[]>("Error")),
    );
  }
  // public getCountStudents(): Observable<Number> {
  //   return this.http.get<Number>(this._apiUri + "count").pipe(
  //     catchError(this.notificationService.handleError<Number>("Error")),
  //   );
  // }
  // public createStudent(data: IStudent): Observable<IStudent> {
  //   return this.http.post<IStudent>(this._apiUri, data).pipe(
  //     tap(() => this.notificationService.add({type: "success", message: "Student successfully added"})),
  //     catchError(this.notificationService.handleError<IStudent>("Error")),
  //   );
  // }
  // public getStudentsById(_id: string): Observable<IStudent[]> {
  //   return this.http.get<IStudent[]>(this._apiUri + _id).pipe(
  //     catchError(this.notificationService.handleError<IStudent[]>("Error")),
  //   );
  // }
  // public updateStudent(_id: string, data: IStudent ): Observable<IStudent> {
  //   return this.http.put<IStudent>(this._apiUri + _id, data).pipe(
  //     tap(() => this.notificationService.add({type: "success", message: "Student successfully updated"})),
  //     catchError(this.notificationService.handleError<IStudent>("Error")),
  //   );
  // }
  // public deleteStudent(_id: string): Observable<IStudent> {
  //   return this.http.delete<IStudent>(this._apiUri + _id).pipe(
  //     tap(() => this.notificationService.add({type: "success", message: "Student successfully deleted"})),
  //     catchError(this.notificationService.handleError<IStudent>("Error")),
  //   );
  // }
}
