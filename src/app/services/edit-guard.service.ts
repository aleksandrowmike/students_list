import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { DataService } from "./data.service";
import { HttpDataService } from "./students/http-data.service";
import { InMemoryDataService } from "./students/in-memory-data.service";

@Injectable({
  providedIn: "root"
})
export class EditGuardService implements CanActivate {
  private _score: Number;
  constructor(@Inject(DataService) private dataService: HttpDataService | InMemoryDataService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   if (+route.queryParams.score === 5) {
     return false;
   }
   return true;
  }
}
