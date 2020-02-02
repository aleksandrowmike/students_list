import { HttpClient, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { IRecordBook } from "../models/recordbook.interface";
import { IStudent } from "../models/student.interface";
import { NotificationService } from "./notification.service";

export interface IFile {
  filename: string;
}

@Injectable({
  providedIn: "root"
})
export class StudentsService {
  public apiUri: string  = environment.apiUrl;
  constructor(private notificationService: NotificationService, private http: HttpClient) {
  }
  public getStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(this.apiUri).pipe (
      catchError(this.notificationService.handleError<IStudent[]>("Error")),
    );
  }
  public onUpload(fd: FormData): Observable<IFile> {
    return this.http.post<IFile>(this.apiUri + "upload", fd);
  }
  public updateRecordBook(_id: string, data: IRecordBook[]): Observable<IRecordBook[]> {
    return this.http.put<IRecordBook[]>(this.apiUri + _id + "/record", data);
  }
  // public getCountStudents(): Observable<Number> {
  //   return this.http.get<Number>(this._apiUri + "count").pipe(
  //     catchError(this.notificationService.handleError<Number>("Error")),
  //   );
  // }
  public createStudent(data: IStudent): Observable<IStudent> {
    return this.http.post<IStudent>(this.apiUri, data);
  }
  // public getStudentsById(_id: string): Observable<IStudent[]> {
  //   return this.http.get<IStudent[]>(this._apiUri + _id).pipe(
  //     catchError(this.notificationService.handleError<IStudent[]>("Error")),
  //   );
  // }
  public updateStudent(_id: string, data: IStudent ): Observable<IStudent> {
    return this.http.put<IStudent>(this.apiUri + _id, data).pipe(
      tap(() => this.notificationService.add({type: "success", message: "Student successfully updated"})),
      catchError(this.notificationService.handleError<IStudent>("Error")),
    );
  }
  public deleteStudent(_id: string): Observable<string> {
    return this.http.delete<string>(this.apiUri + _id);
  }
}
