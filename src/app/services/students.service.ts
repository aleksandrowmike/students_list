import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class StudentsService {
  constructor(private router: ActivatedRoute) { }

  public debug(): boolean {
    if (this.router.snapshot.queryParams["debug"] === "true") {
      return true;
    }
    return false;
  }
}
