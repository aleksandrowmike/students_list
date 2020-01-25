import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { IStudent } from "../../../models/student.interface";
import { StudentsService } from "../../../services/students.service";
import { GetStudents } from "../../../store/actions/student.actions";
import { selectStudentList } from "../../../store/selectors/students.selectors";
import { IAppState } from "../../../store/state/app.state";

enum Sort {
  ASC,
  DESC
}

@Component({
  selector: "app-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.less"],
})

export class TableComponent implements OnInit {
  @Input() data: IStudent[];
  public editMode: boolean = false;
  public selectedStudents: string;
  private _numberOfClicks: number = 0;
  constructor(private ref: ChangeDetectorRef,
              private _router: Router) {}
  public applySearch(search: string): void {
    search === "" ? this.selectedStudents = null :  this.selectedStudents = search;
  }
  public sort(sortField: string): void {
    switch (Sort[this._numberOfClicks]) {
      case ("ASC"): {
        this.data.sort((a, b) => {
          if (a[sortField] < b[sortField]) {
            return -1;
          }
        });
        break;
      }
      case ("DESC"): {
        this.data.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return -1;
          }
        });
        break;
      }
      default: {
        break;
      }
    }
    this._numberOfClicks = this._numberOfClicks === 1 ? this._numberOfClicks = 0 : this._numberOfClicks = 1;
  }
  public addStudent(): void {}
  public navigateToStudent(id: string): void {
    this._router.navigate(["dashboard/detail", id], {queryParams: {edit: true}});
  }
  ngOnInit(): void {}
}
