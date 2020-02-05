import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-not-found",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.less"]
})
export class NotFoundComponent {}
