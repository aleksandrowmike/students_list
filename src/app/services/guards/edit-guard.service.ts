import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { IData } from "../../data/i-data";
import { DataService } from "../data.service";
import { NotificationService } from "../notification.service";

@Injectable({
  providedIn: "root"
})
export class EditGuardService implements CanActivate {
  constructor(@Inject(DataService) private dataService: IData, private notificationService: NotificationService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.dataService.getEditPermission(route.params["id"]).pipe(
      tap((guard) => {
        if (!guard) {
          this.notificationService.add({type: "notice", message: "Students with an average score of 5 cannot be edited"});
        }
      }),
    );
  }
}
