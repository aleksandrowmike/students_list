import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IUser } from "../../models/user.interface";
import { getUserInfo } from "../../store/selectors/students.selectors";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-dashboard",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"]
})
export class DashboardComponent implements OnInit {
  public user: Observable<IUser> = this._store.pipe(select(getUserInfo));
  constructor(private _store: Store<IAppState>) {}
  ngOnInit(): void {
  }
}
