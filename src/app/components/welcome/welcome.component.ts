import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-welcome",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.less"]
})
export class WelcomeComponent implements OnInit {

  public title = "Students list";

  ngOnInit(): void {
  }

}
