import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { IAuth } from "../models/auth.interface";
import { IUser, IUserAuth } from "../models/user.interface";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public apiUri: string  = environment.apiUrl;
  constructor(private notificationService: NotificationService, private http: HttpClient) {}
  public authUser(user: IUserAuth): Observable<IAuth> {
    return this.http.post<IAuth>(`${this.apiUri}auth/`, user);
  }
  public getAuthUser(email: string, token: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUri}users/${email}`, {headers: new HttpHeaders({
        "Authorization": `Bearer ${token}`
    })});
  }
}
