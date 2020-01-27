import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { IStudent } from "../../models/student.interface";
import { StudentsService } from "../../services/students.service";
import { EStudentActions, GetStudent, GetStudents, GetStudentsSuccess, GetStudentSuccess } from "../actions/student.actions";
import { selectStudentList } from "../selectors/students.selectors";
import { IAppState } from "../state/app.state";

@Injectable()
export class StudentEffects {
  @Effect()
  getStudent$ = this._actions$.pipe(
    ofType<GetStudent>(EStudentActions.GetStudent),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectStudentList))),
    switchMap(([id, students]) => {
      const selectedStudent = students.filter(student => student._id === id)[0];
      return of(new GetStudentSuccess(selectedStudent));
    }),
    );
  @Effect()
  getStudents$ = this._actions$.pipe(
    ofType<GetStudents>(EStudentActions.GetStudents),
    switchMap(() => this._studentsService.getStudents()),
    switchMap((studentHttp: IStudent[]) => {
      return of(new GetStudentsSuccess(studentHttp));
    }),
  );

  constructor(
    private _studentsService: StudentsService,
    private _actions$: Actions,
    private _store: Store<IAppState>) {}
}
