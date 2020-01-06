import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalComponent } from "../../../../components/modal/modal.component";
import { IEvents } from "../../../../data/i-events";
import { IStudents } from "../../../../data/students";
import { DataService } from "../../../../services/data.service";
import { StudentsService } from "../../../../services/students.service";
import { HttpDataService } from "../../../../services/students/http-data.service";
import { InMemoryDataService } from "../../../../services/students/in-memory-data.service";

@Component({
  selector: "st-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.less"],
})

export class StudentsListComponent implements OnInit, AfterViewChecked {
  public countStudents: number;
  public notificationShow: boolean;
  public notificationCode: string;
  public notificationMessage: string;
  public isAccent: boolean;
  public action: IEvents;
  private _isFilterScore: boolean = false;
  private _isFilterDate: boolean = false;
  public student: IStudents;
  public isDisplayed: boolean;
  public selectedStudents: string;
  public valueScore: string;
  public valueDate: string;
  public students: IStudents[];
  constructor(@Inject(DataService) private dataService: InMemoryDataService | HttpDataService,
              private ref: ChangeDetectorRef,
              private router: Router,
              private studentsService: StudentsService) {}
  public hideModal(displayed: boolean): void {
    this.isDisplayed = displayed;
  }
  public addModal(displayed: boolean): void {
    this.isDisplayed = !displayed;
    this.action = IEvents.add;
  }
  public accentuation(accent: boolean): void {
    this.isAccent = !accent;
  }
  public resetFilter(): void {
    this._reloadStudents();
  }
  public applySearch(search: string): void {
    this.selectedStudents = search;
  }
  public scoreFilter(): void {
    if (this.valueScore !== null) {
      this._isFilterScore = true;
      this.students = this.students.filter(value => value.score === Number(this.valueScore));
    } else {
      this._isFilterScore = false;
    }
    if (this.valueScore === null && this._isFilterDate === false) {
      this._reloadStudents();
      this._isFilterScore = false;
    }
  }
  public dateFilter(): void {
    if (this.valueDate !== "") {
      this._isFilterDate = true;
      this.students = this.students.filter(value => value.birth.toDateString() === new Date(this.valueDate).toDateString());
    } else {
      this._isFilterDate = false;
    }
    if (this.valueDate === null && this._isFilterScore === false) {
      this._reloadStudents();
      this._isFilterDate = false;
    }
  }
  public deleteStudent(_id: string): void {
    this.studentsService.debug() ? this.router.navigate([`delete/${_id}`], {queryParams: {debug: true}}) : this.router.navigate([`delete/${_id}`]);
  }
  public addStudent(): void {
    this.studentsService.debug() ? this.router.navigate([`add`], {queryParams: {debug: true}}) : this.router.navigate([`add`]);
  }
  public editStudent(_id: string, score: number): void {
    this.studentsService.debug() ? this.router.navigate([`edit/${_id}`], {queryParams: {debug: true, score: score}}) : this.router.navigate([`edit/${_id}`], {queryParams: {score: score}});
  }
  public actions(modal: ModalComponent): void {
    switch (IEvents[modal.event]) {
      case 1: {
        if (modal.submitForm()) {
          this.dataService.createStudent(modal.data).subscribe(() => {
            this.notificationShow = true;
            this.notificationCode = "success";
            this.notificationMessage = "Student successfully added!";
            this._reloadStudents();
          });
        }
        break;
      }
      case 2: {
        if (modal.submitForm()) {
          this.dataService.updateStudent(modal.studentId, modal.data).subscribe(() => {
              this.notificationShow = true;
              this.notificationCode = "success";
              this.notificationMessage = "Student successfully changed!";
              this._reloadStudents();
          });
        }
        break;
      }
      case 0: {
        if (modal.confirm) {
          this.dataService.deleteStudent(modal.studentId).subscribe(() => {
            this.notificationShow = true;
            this.notificationCode = "success";
            this.notificationMessage = "Student successfully deleted!";
            this._reloadStudents();
          });
        }
        break;
      }
      default: {
        break;
      }
    }
  }
  private _reloadStudents(): void {
   this.dataService.getStudents().subscribe(data => this.students = data);
  }
  ngOnInit(): void {
    this._reloadStudents();
  }
  ngAfterViewChecked(): void {
    this.ref.detectChanges();
    this.notificationShow = false;
  }
}
