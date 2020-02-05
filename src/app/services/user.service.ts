import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAuth } from "../models/auth.interface";
import { IUser } from "../models/user.interface";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private notificationService: NotificationService, private http: HttpClient) {}
  public authUser(user: IUser): Observable<IAuth> {
    return this.http.post<IAuth>("http://localhost:3000/auth/", user);
  }
}
