import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IStudent } from "../../models/student.interface";
import { GetStudents } from "../../store/actions/student.actions";
import { getMode, selectStudentList } from "../../store/selectors/students.selectors";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-student-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.less"]
})
export class StudentListComponent implements OnInit {
  public students$: Observable<IStudent[]> = this._store.pipe(select(selectStudentList));
  public mode: Observable<boolean> = this._store.pipe(select(getMode));
  constructor(private _store: Store<IAppState>, private ref: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this._store.dispatch(new GetStudents());
  }
}
