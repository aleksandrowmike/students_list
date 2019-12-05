import { Component, OnInit } from "@angular/core";
import { Students } from "../../data/students";
import { StudentsMock } from "../../data/students-mock";

@Component({
  selector: "students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.less"]
})

export class StudentsListComponent implements OnInit {
  public students: Students[] = StudentsMock;
  public isAccent: boolean;
  private _isFilterScore: boolean = false;
  private _isFilterDate: boolean = false;
  public selectedStudents: string;
  public valueScore: string;
  public valueDate: string;
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
  public ascSort(objectKey: string): void {
      this.students = this.students.sort((a: Students, b: Students ): number => {
        if (a[objectKey] < b[objectKey]) {
          return -1;
        }
      });
  }
  public descSort(objectKey: string): void {
    this.students = this.students.sort((a: Students, b: Students ): number => {
      if (a[objectKey] > b[objectKey]) {
        return -1;
      }
    });
  }
  public delete(deleteStudent: Students): void {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      this.students = this.students.filter(student => student !== deleteStudent);
    }
  }
  ngOnInit(): void {}
}
