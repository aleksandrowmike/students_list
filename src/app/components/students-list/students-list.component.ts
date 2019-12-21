import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { IEvents } from "../../data/i-events";
import { Students } from "../../data/students";
import { StudentsMock } from "../../data/students-mock";

@Component({
  selector: "students-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.less"]
})

export class StudentsListComponent implements OnInit {
  public students: Students[] = StudentsMock;
  public countStudents: number = this.students.length;
  public isAccent: boolean;
  public action: IEvents;
  private _isFilterScore: boolean = false;
  private _isFilterDate: boolean = false;
  public student: Students;
  public isDisplayed: boolean;
  public selectedStudents: string;
  public valueScore: string;
  public valueDate: string;
  public hideModal(displayed: boolean): void {
    this.isDisplayed = displayed;
  }
  public editStudent(student: Students, displayed: boolean): void {
    this.student  = student;
    this.isDisplayed = !displayed;
    this.action = IEvents.Edit;
  }
  public addModal(displayed: boolean): void {
    this.isDisplayed = !displayed;
    this.action = IEvents.Add;
  }
  public addStudent(student: Students): void {
    this.students.push(student);
  }
  public accentuation(accent: boolean): void {
    this.isAccent = !accent;
  }
  public resetFilter(): void {
    this.students = StudentsMock;
    this.valueScore = "";
    this.valueDate = "";
  }
  public applySearch(search: string): void {
    this.selectedStudents = search;
  }
  public scoreFilter(): void {
    if (this.valueScore !== "") {
      this._isFilterScore = true;
      this.students = this.students.filter(value => value.score === Number(this.valueScore));
    } else {
      this._isFilterScore = false;
    }
    if (this.valueScore === "" && this._isFilterDate === false) {
      this.students = StudentsMock;
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
    if (this.valueDate === "" && this._isFilterScore === false) {
      this.students = StudentsMock;
      this._isFilterDate = false;
    }
  }
  public deleteConfirmation(deleteStudent: Students, displayed: boolean): void {
    this.student  = deleteStudent;
    this.isDisplayed = !displayed;
    this.action = IEvents.Confirmation;
  }
  public delete(confirmation: boolean): void {
    if (confirmation) {
      this.students = this.students.filter(student => student !== this.student);
    }
  }
  ngOnInit(): void {}
}
