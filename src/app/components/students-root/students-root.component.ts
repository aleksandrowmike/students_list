import { Component } from "@angular/core";
import { Students } from "../../data/students";
import { StudentsMock } from "../../data/students-mock";

@Component({
  selector: "students-root",
  templateUrl: "./students-root.component.html",
  styleUrls: ["./students-root.component.less"]
})
export class StudentsRootComponent {
  public mockStudents: Students[] = StudentsMock;
}
