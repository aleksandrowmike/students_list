import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { IStudent } from "../../models/student.interface";
import { StudentsService } from "../../services/students.service";
import { CreateStudent, CreateStudentSuccess, DeleteStudent, DeleteStudentSuccess, EStudentActions, GetStudent, GetStudents, GetStudentsSuccess, GetStudentSuccess } from "../actions/student.actions";
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
  @Effect()
  createStudent$ = this._actions$.pipe(
    ofType<CreateStudent>(EStudentActions.CreateStudent),
    map(action => action.payload),
    switchMap((createStudent: IStudent) => this._studentsService.createStudent(createStudent).pipe(
      switchMap(() => of(new CreateStudentSuccess(createStudent))),
    )),
  );
  @Effect()
  deleteStudent$ = this._actions$.pipe(
    ofType<DeleteStudent>(EStudentActions.DeleteStudent),
    map(action => action.payload),
    switchMap((id: string) => this._studentsService.deleteStudent(id).pipe(
        switchMap(() => of(new DeleteStudentSuccess(id))),
    )),
  );
  constructor(
    private _studentsService: StudentsService,
    private _actions$: Actions,
    private _store: Store<IAppState>) {}
}
