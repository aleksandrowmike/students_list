import { AfterContentChecked, ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IUser } from "../../models/user.interface";
import { GetDataUser, UserLogOut } from "../../store/actions/auth.actions";
import { getMode, getUserInfo } from "../../store/selectors/students.selectors";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "side-bar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.less"]
})
export class SideBarComponent implements OnInit {
  public editMode: Observable<boolean> = this._store.pipe(select(getMode));
  public users: Observable<IUser[]> =  this._store.pipe(select(getUserInfo));
  public showContent: boolean = false;
  constructor(private _store: Store<IAppState>, private router: Router) { }
  public changeShow(): void {
    this.showContent = !this.showContent;
  }
  public logOut(): void {
    this._store.dispatch(new UserLogOut());
  }
  ngOnInit(): void {}
}
