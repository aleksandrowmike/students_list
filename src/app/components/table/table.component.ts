import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { EventsInterface } from "../../interfaces/events.interface";
import { IStudent } from "../../models/student.interface";
import { StudentsService } from "../../services/students.service";
import { GetStudents } from "../../store/actions/student.actions";
import { selectStudentList } from "../../store/selectors/students.selectors";
import { IAppState } from "../../store/state/app.state";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "app-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.less"],
})

export class TableComponent implements OnInit {
  public students$ = this._store.pipe(select(selectStudentList));
  public isAccent: boolean;
  public action: EventsInterface;
  private _isFilterScore: boolean = false;
  private _isFilterDate: boolean = false;
  public student: IStudent;
  public isDisplayed: boolean;
  public selectedStudents: string;
  public valueScore: string;
  public valueDate: string;
  constructor(private ref: ChangeDetectorRef,
              private _router: Router,
              private studentsService: StudentsService,
              private _store: Store<IAppState>) {}
  // public hideModal(displayed: boolean): void {
  //   this.isDisplayed = displayed;
  // }
  // public detail(_id: string): void {
  //   this.router.navigate([`dashboard/detail/${_id}`]);
  // }
  public addModal(displayed: boolean): void {
    this.isDisplayed = !displayed;
    this.action = EventsInterface.add;
  }
  public accentuation(accent: boolean): void {
    this.isAccent = !accent;
  }
  // public resetFilter(): void {
  //   this._reloadStudents();
  // }
  public applySearch(search: string): void {
    this.selectedStudents = search;
  }
  // public scoreFilter(): void {
  //   if (this.valueScore !== null) {
  //     this._isFilterScore = true;
  //     this.students = this.students.filter(value => value.score === Number(this.valueScore));
  //   } else {
  //     this._isFilterScore = false;
  //   }
  //   if (this.valueScore === null && this._isFilterDate === false) {
  //     this._reloadStudents();
  //     this._isFilterScore = false;
  //   }
  // }
  // public dateFilter(): void {
  //   if (this.valueDate !== "") {
  //     this._isFilterDate = true;
  //     this.students = this.students.filter(value => value.birth.toDateString() === new Date(this.valueDate).toDateString());
  //   } else {
  //     this._isFilterDate = false;
  //   }
  //   if (this.valueDate === null && this._isFilterScore === false) {
  //     this._reloadStudents();
  //     this._isFilterDate = false;
  //   }
  // }
  // public deleteStudent(_id: string): void {
  //   this.studentsService.debug() ? this.router.navigate([`delete/${_id}`], {queryParams: {debug: true}}) : this.router.navigate([`delete/${_id}`]);
  // }
  public addStudent(): void {
    // this.studentsService.debug() ? this.router.navigate([`add`], {queryParams: {debug: true}}) : this.router.navigate([`add`]);
  }
  // public editStudent(_id: string): void {
  //   this.studentsService.debug() ? this.router.navigate([`dashboard/edit/${_id}`], {queryParams: {debug: true}}) : this.router.navigate([`dashboard/edit/${_id}`]);
  // }
  // public actions(modal: ModalComponent): void {
  //   switch (EventsInterface[modal.event]) {
  //     case 1: {
  //       if (modal.confirm) {
  //         this.dataService.createStudent(modal.data).subscribe(() => {
  //           this.students.push(modal.data);
  //           this.ref.markForCheck();
  //         });
  //       }
  //       break;
  //     }
  //     case 2: {
  //       if (modal.confirm) {
  //         this.dataService.updateStudent(modal.studentId, modal.data).subscribe(() => {
  //           this.students.forEach(student => {
  //             if (student._id === modal.studentId) {
  //               student.firstName = modal.data.firstName;
  //               student.lastName = modal.data.lastName;
  //               student.middleName = modal.data.middleName;
  //               student.birth = modal.data.birth;
  //               student.score = modal.data.score;
  //             }
  //           });
  //           this.ref.markForCheck();
  //         });
  //       }
  //       break;
  //     }
  //     case 0: {
  //       if (modal.confirm) {
  //         this.dataService.deleteStudent(modal.studentId).subscribe(() => {
  //           this.students = this.students.filter(student => student._id !== modal.studentId);
  //           this.ref.markForCheck();
  //         });
  //       }
  //       break;
  //     }
  //     default: {
  //       break;
  //     }
  //   }
  // }
  // private _reloadStudents(): void {
  //  this.dataService.getStudents().subscribe(data => {
  //    this.students = data;
  //    this.ref.markForCheck();
  //  });
  // }
  public navigateToStudent(id: string): void {
    this._router.navigate(["dashboard/detail", id]);
  }
  ngOnInit(): void {
    this._store.dispatch(new GetStudents());
    // this._reloadStudents();
  }
}
