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
  sortLastName(sort: string): void {
    if (sort === "ASC") {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a.lastName < b.lastName) {
          return -1;
        }
      });
    }
    if (sort === "DESC") {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a.lastName < b.lastName) {
          return -1;
        }
      });
      this.students = this.students.reverse();
    }
  }
  sortMiddleName(sort: string): void {
    if (sort === "ASC") {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a.middleName < b.middleName) {
          return -1;
        }
      });
    }
    if (sort === "DESC") {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a.middleName < b.middleName) {
          return -1;
        }
      });
      this.students = this.students.reverse();
    }
  }
  sortBirth(sort: string): void {
    if (sort === "ASC") {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a.birth < b.birth) {
          return -1;
        }
      });
    }
    if (sort === "DESC") {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a.birth < b.birth) {
          return -1;
        }
      });
      this.students = this.students.reverse();
    }
  }
  sortScore(sort: string): void {
    if (sort === "ASC") {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a.score < b.score) {
          return -1;
        }
      });
    }
    if (sort === "DESC") {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a.score < b.score) {
          return -1;
        }
      });
      this.students = this.students.reverse();
    }
  }
  sortID(sort: string): void {
    if (sort === "ASC") {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
      });
    }
    if (sort === "DESC") {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a.id < b.id) {
          return -1;
        }
      });
      this.students.reverse();
    }
  }
  delete(deleteStudent: Students): void {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      this.students = this.students.filter(student => student !== deleteStudent);
    }
  }
  ngOnInit(): void {}
}
