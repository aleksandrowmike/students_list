import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IEvents } from "../../data/i-events";
import { IStudents } from "../../data/students";
import { DataService } from "../../services/data.service";
import { StudentValidatorsService } from "../../services/student-validators.service";
import { StudentsService } from "../../services/students.service";
import { HttpDataService } from "../../services/students/http-data.service";
import { InMemoryDataService } from "../../services/students/in-memory-data.service";

@Component({
  selector: "modal",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.less"]
})
export class ModalComponent implements OnInit {
  public title: string;
  public event: string;
  public studentId: string;
  public confirm: boolean = false;
  public formStudent: FormGroup;
  public action: Number;
  public currentDate = new Date().getFullYear() - 10;
  public data: IStudents = {__v: 0, _id: "", birth: undefined, firstName: "", id: 0, lastName: "", middleName: "", score: 0};
  public count: number;
  constructor(private StudentValidators: StudentValidatorsService,
              @Inject(DataService) private dataService: HttpDataService | InMemoryDataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private studentsService: StudentsService,
  ) {}
  public isControlInvalid(controlName: string): boolean {
    const control = this.formStudent.get(controlName);
    return control.invalid && control.touched;
  }
  public convertDate(date: Date): string {
    const dates = new Date(date);
    const month = dates.getMonth() + 1;
    const stMonth: string = (month < 10) ? "0" + month : month.toString();
    const stDay: string = (dates.getDate() < 10) ? "0" + dates.getDate() : dates.getDate().toString();
    return dates.getFullYear() + "-" + stMonth + "-" + stDay;
  }
  public initEditStudentForm(): void {
   this.formStudent = new FormGroup({
     name: new FormGroup({
       firstName: new FormControl("", [Validators.required]),
       lastName: new FormControl("", [Validators.required]),
       middleName: new FormControl("", [Validators.required])
     }, [this.StudentValidators.nameValidator]),
     birth: new FormControl("", [Validators.required, this.StudentValidators.dateValidator]),
     score: new FormControl("", [Validators.required, Validators.min(1), Validators.max(5)])
   });
    this.dataService.getStudentsById(this.studentId).subscribe((student) => {
      const editStudent = {
        name: {
          firstName: student[0].firstName,
          lastName: student[0].lastName,
          middleName: student[0].middleName
        },
        birth: this.convertDate(new Date(student[0].birth)),
        score: student[0].score
      };
      this.data.id = student[0].id;
      this.data._id = student[0]._id;
      this.formStudent.setValue(editStudent);
    });
  }
  public initAddStudentForm(): void {
    this.formStudent = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        middleName: new FormControl("", [Validators.required])
      }, [this.StudentValidators.nameValidator]),
      birth: new FormControl("", [Validators.required, this.StudentValidators.dateValidator]),
      score: new FormControl("", [Validators.required, Validators.min(1), Validators.max(5)])
    });
    this.dataService.getCountStudents().subscribe(num => this.count = +num);
  }
  public submitForm(): boolean {
    const controls = this.formStudent.controls;
    if (this.formStudent.invalid) {
              Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return false;
    }
    if (this.data === null) {
      this.data = {
        _id: "5e12bd9ffc13ae725b0000" + this.count,
        id: this.count + 1,
        birth: new Date(this.formStudent.value.birth),
        score: this.formStudent.value.score,
        firstName: this.formStudent.value.name.firstName,
        lastName: this.formStudent.value.name.lastName,
        middleName: this.formStudent.value.name.middleName
      };
      this.hideModal();
      return true;
    }
    this.data.birth = new Date(this.formStudent.value.birth);
    this.data.score = this.formStudent.value.score;
    this.data.firstName = this.formStudent.value.name.firstName;
    this.data.lastName = this.formStudent.value.name.lastName;
    this.data.middleName = this.formStudent.value.name.middleName;
    this.hideModal();
    return true;
  }
  public hideModal(): void {
    this.studentsService.debug() ? this.router.navigate([""], {queryParams: {debug: true}}) : this.router.navigate([""]);
  }
  public confirmation(): void {
    this.confirm = !this.confirm;
    this.studentsService.debug() ? this.router.navigate([""], {queryParams: {debug: true}}) : this.router.navigate([""]);
  }
  private _action(event: string): void {
    switch (IEvents[event]) {
      case 1: {
        this.data = null;
        this.action = 1;
        this.title = "Add new student";
        this.initAddStudentForm();
        break;
      }
      case 2: {
        this.title = "Edit";
        this.action = 2;
        this.activatedRoute.params.subscribe(param => this.studentId = param.id);
        this.initEditStudentForm();
        break;
      }
      case 0: {
        this.title = "Confirmation";
        this.action = 0;
        this.activatedRoute.params.subscribe(param => this.studentId = param.id);
        break;
      }
      default: {
        break;
      }
    }
  }
  ngOnInit(): void {
    this.event = this.activatedRoute.snapshot.url[0].path;
    this._action(this.event);
  }
}
