import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { INotification } from "../data/i-notification";

@Injectable({
  providedIn: "root"
})
export class NotificationService implements INotification {
  messages: object[] = [];
  add(message: object): void {
    this.messages = [];
    this.messages.push(message);
  }
  // tslint:disable-next-line:no-any
  public handleError<T>(type: string, result?: T, ): (error: any) => Observable<T> {
    // tslint:disable-next-line:no-any
    return (error: any): Observable<T> => {
      console.error(error);
      this.add({message: error.message, type: type});
      return of(result as T);
    };
  }
}
