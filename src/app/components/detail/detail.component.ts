import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { IStudent } from "../../models/student.interface";
import { GetStudent } from "../../store/actions/student.actions";
import { selectSelectedStudent } from "../../store/selectors/students.selectors";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.less"]
})
export class DetailComponent implements OnInit {
  public student: IStudent;
  constructor(private _store: Store<IAppState>, private _route: ActivatedRoute) {
    this._store.pipe(select(selectSelectedStudent)).subscribe(data => {
      this.student = data;
    });
  }
  ngOnInit(): void {
    this._store.dispatch(new GetStudent(this._route.snapshot.params.id));
  }

}
