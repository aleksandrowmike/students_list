import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "students-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./students-root.component.html",
  styleUrls: ["./students-root.component.less"]
})
export class StudentsRootComponent implements OnInit {
  ngOnInit(): void {
  }
}
