import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { GetStudents } from "../../store/actions/student.actions";
import { selectStudentList } from "../../store/selectors/students.selectors";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.less"]
})
export class StudentListComponent implements OnInit {
  public students$ = this._store.pipe(select(selectStudentList));
  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this._store.dispatch(new GetStudents());
  }
}
