import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { GetStudents } from "../../store/actions/student.actions";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "students-root",
  templateUrl: "./students-root.component.html",
  styleUrls: ["./students-root.component.less"]
})
export class StudentsRootComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
  }
}
