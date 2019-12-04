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
  public selectedStudents: string;
  public accentStudents: Students[];
  accentuation(accent: Students): void {
    if (accent.accent) {
      this.students.filter(e => {
        if ( e === accent) {
          e.accent = false;
        }
      });
    } else {
      this.students.filter(e => {
        if ( e === accent) {
          e.accent = true;
        }
      });
    }
  }
  applySearch(search: string): void {
    this.selectedStudents = search;
  }
  scoreFilter(score: string): void {
    this.students = this.students.filter(value => value.score === Number(score));
    if (score === "") {
      this.students = StudentsMock;
    }
  }
  dateFilter(date: string): void {
    this.students = this.students.filter(value => value.birth.toDateString() === new Date(date).toDateString());
    if (date === "") {
      this.students = StudentsMock;
    }
  }
  sortFirstName(sort: string): void {
    if (sort === "ASC") {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a.firstName < b.firstName) {
          return -1;
        }
      });
    }
    if (sort === "DESC") {
      this.students = this.students.sort(( a: Students, b: Students ): number => {
        if (a.firstName < b.firstName) {
          return -1;
        }
      });
      this.students = this.students.reverse();
    }
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
  delete(student: Students): void {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      this.students = this.students.filter(e => e !== student);
    }
  }
  ngOnInit(): void {
    this.students.filter(e => {
      if (e.score > 3) {
        e.accent = true;
      }
    });
  }
}
