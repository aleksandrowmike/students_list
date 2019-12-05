import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
  public isFilterScore: boolean = false;
  public isFilterDate: boolean = false;
  public selectedStudents: string;
  accentuation(accent: boolean): void {
    this.isAccent = !accent;
  }
  applySearch(search: string): void {
    this.selectedStudents = search;
  }
  scoreFilter(score: string): void {
    if (score !== "") {
      this.isFilterScore = true;
      this.students = this.students.filter(value => value.score === Number(score));
    } else {
      this.isFilterScore = false;
    }
    if (score === "" && this.isFilterDate === false) {
      this.students = StudentsMock;
      this.isFilterScore = false;
    }
  }
  dateFilter(date: string): void {
    if (date !== "") {
      this.isFilterDate = true;
      this.students = this.students.filter(value => value.birth.toDateString() === new Date(date).toDateString());
    } else {
      this.isFilterDate = false;
    }
    if (date === "" && this.isFilterScore === false) {
      this.students = StudentsMock;
      this.isFilterDate = false;
    }
  }
  ascSort(objectKey: string): void {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a[objectKey] < b[objectKey]) {
          return -1;
        }
      });
  }
  descSort(objectKey: string): void {
    this.students = this.students.sort(( a: Students, b: Students ): number => {
      if (a[objectKey] > b[objectKey]) {
        return -1;
      }
    });
  }
  delete(deleteStudent: Students): void {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      this.students = this.students.filter(student => student !== deleteStudent);
    }
  }
  ngOnInit(): void {}
}
