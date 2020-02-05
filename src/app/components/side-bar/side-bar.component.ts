import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getMode } from "../../store/selectors/students.selectors";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "side-bar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.less"]
})
export class SideBarComponent implements OnInit {
  public editMode: Observable<boolean> = this._store.pipe(select(getMode));
  constructor(private _store: Store<IAppState>) { }
  ngOnInit(): void {
  }
}
