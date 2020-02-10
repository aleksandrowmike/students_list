import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { GetDataUser } from "../../store/actions/auth.actions";
import { IAppState } from "../../store/state/app.state";

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
