import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IStudents } from "../../data/students";
import { DataService } from "../data.service";
@Injectable({
  providedIn: DataService
})
export class HttpDataService {
  constructor(private http: HttpClient) {}
  private apiUri: string  = "http://localhost:3000/students/";
  public getStudents(): Observable<IStudents[]> {
    return this.http.get<IStudents[]>(this.apiUri);
  }
  public getCountStudents(): Observable<Number> {
    return this.http.get<Number>(this.apiUri + "count");
  }
  public createStudent(data: IStudents): Observable<IStudents> {
    return this.http.post<IStudents>(this.apiUri, data);
  }
  public getStudentsById(_id: string): Observable<IStudents[]> {
    return this.http.get<IStudents[]>(this.apiUri + _id);
  }
  public updateStudent(_id: string, data: IStudents ): Observable<IStudents> {
    return this.http.put<IStudents>(this.apiUri + _id, data);
  }
  public deleteStudent(_id: string): Observable<IStudents> {
      return this.http.delete<IStudents>(this.apiUri + _id);
  }
}
