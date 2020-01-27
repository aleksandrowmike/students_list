import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IDiscipline } from "../../interfaces/discipline";
import { IStudent } from "../../models/student.interface";
import { StudentsService } from "../../services/students.service";
import { GetStudent } from "../../store/actions/student.actions";
import { getMode, selectSelectedStudent, selectStudentList } from "../../store/selectors/students.selectors";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.less"]
})
export class DetailComponent implements OnInit {
  public student: IStudent;
  public mode: Observable<boolean> = this._store.pipe(select(getMode));
  constructor(private _store: Store<IAppState>,
              private _route: ActivatedRoute,
              private _router: Router) {}
  public discipline(period: string): Observable<IDiscipline[]> {
    return this._store.pipe(
      select(selectSelectedStudent),
      map((student) => {
        const recordBook = student.recordBook.find(record => record.period === period);
        const discipline = [];
        const keys = Object.keys(recordBook.discipline);
        const values = Object.values(recordBook.discipline);
        for (let i = 0; i < keys.length; i++) {
          discipline[i] = {subject: keys[i], result: values[i]};
        }
        return discipline;
      }),
    );
  }
  ngOnInit(): void {
    this._store.dispatch(new GetStudent(this._route.snapshot.params.id));
    this._store.pipe(select(selectSelectedStudent)).subscribe(data => this.student = data);
  }
}
