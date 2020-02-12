import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IUser } from "../../models/user.interface";
import { UserLogOut } from "../../store/actions/auth.actions";
import { getMode } from "../../store/selectors/students.selectors";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "side-bar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.less"]
})
export class SideBarComponent implements OnInit, OnChanges {
  public editMode: Observable<boolean> = this._store.pipe(select(getMode));
  @Input() user: IUser;
  public dataLoaded: boolean;
  public showContent: boolean = false;
  constructor(private _store: Store<IAppState>, private router: Router) { }
  public changeShow(): void {
    this.showContent = !this.showContent;
  }
  public logOut(): void {
    this._store.dispatch(new UserLogOut());
    this.router.navigate(["login"]);
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user.currentValue) {
      this.dataLoaded = true;
    }
  }
}
