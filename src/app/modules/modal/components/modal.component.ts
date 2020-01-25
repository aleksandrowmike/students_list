import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
// import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { ActivatedRoute, Router } from "@angular/router";
// import { DataInterface } from "../../interfaces/data.interface";
// import { EventsInterface } from "../../interfaces/events.interface";
// import { IStudents } from "../../interfaces/student.interface";
// import { DataService } from "../../services/data.service";
// import { StudentsService } from "../../services/students.service";
// import { StudentValidatorsService } from "../../validators/student-validators.service";

@Component({
  selector: "modal",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.less"]
})
export class ModalComponent implements OnInit {
  // public title: string;
  // public event: string;
  // public studentId: string;
  // public confirm: boolean = false;
  // public formStudent: FormGroup;
  // public action: Number;
  // public currentDate = new Date().getFullYear() - 10;
  // public data: IStudents = {birth: undefined, firstName: "", id: 0, lastName: "", middleName: "", score: 0};
  // public count: number;
  // constructor(private StudentValidators: StudentValidatorsService,
  //             @Inject(DataService) private dataService: DataInterface,
  //             private router: Router,
  //             private activatedRoute: ActivatedRoute,
  //             private studentsService: StudentsService,
  // ) {}
  // public isControlInvalid(controlName: string): boolean {
  //   const control = this.formStudent.get(controlName);
  //   return control.invalid && control.touched;
  // }
  // public convertDate(date: Date): string {
  //   const dates = new Date(date);
  //   const month = dates.getMonth() + 1;
  //   const stMonth: string = (month < 10) ? "0" + month : month.toString();
  //   const stDay: string = (dates.getDate() < 10) ? "0" + dates.getDate() : dates.getDate().toString();
  //   return dates.getFullYear() + "-" + stMonth + "-" + stDay;
  // }
  // public initEditStudentForm(): void {
  //  this.formStudent = new FormGroup({
  //    name: new FormGroup({
  //      firstName: new FormControl("", [Validators.required]),
  //      lastName: new FormControl("", [Validators.required]),
  //      middleName: new FormControl("", [Validators.required])
  //    }, [this.StudentValidators.nameValidator]),
  //    birth: new FormControl("", [Validators.required, this.StudentValidators.dateValidator]),
  //    score: new FormControl("", [Validators.required, Validators.min(1), Validators.max(5)])
  //  });
  //   this.dataService.getStudentsById(this.studentId).subscribe((student) => {
  //     const editStudent = {
  //       name: {
  //         firstName: student[0].firstName,
  //         lastName: student[0].lastName,
  //         middleName: student[0].middleName
  //       },
  //       birth: this.convertDate(new Date(student[0].birth)),
  //       score: student[0].score
  //     };
  //     this.data.id = student[0].id;
  //     this.data._id = student[0]._id;
  //     this.formStudent.setValue(editStudent);
  //   });
  // }
  // public initAddStudentForm(): void {
  //   this.formStudent = new FormGroup({
  //     name: new FormGroup({
  //       firstName: new FormControl("", [Validators.required]),
  //       lastName: new FormControl("", [Validators.required]),
  //       middleName: new FormControl("", [Validators.required])
  //     }, [this.StudentValidators.nameValidator]),
  //     birth: new FormControl("", [Validators.required, this.StudentValidators.dateValidator]),
  //     score: new FormControl("", [Validators.required, Validators.min(1), Validators.max(5)])
  //   });
  //   this.dataService.getCountStudents().subscribe(num => this.count = +num);
  // }
  // public submitForm(): boolean {
  //   const controls = this.formStudent.controls;
  //   if (this.formStudent.invalid) {
  //             Object.keys(controls)
  //       .forEach(controlName => controls[controlName].markAsTouched());
  //     return false;
  //   }
  //   if (this.action === 1) {
  //     if (this.studentsService.debug()) {
  //       this.data._id = "5e12bd9ffc13ae725b0000" + this.count;
  //     }
  //     this.data.id = this.count + 1;
  //     this.data.birth = new Date(this.formStudent.value.birth);
  //     this.data.firstName = this.formStudent.value.name.firstName;
  //     this.data.lastName = this.formStudent.value.name.lastName;
  //     this.data.middleName = this.formStudent.value.name.middleName;
  //     this.data.score = this.formStudent.value.score;
  //     this.hideModal();
  //     this.confirm = true;
  //   }
  //   this.data.birth = new Date(this.formStudent.value.birth);
  //   this.data.score = this.formStudent.value.score;
  //   this.data.firstName = this.formStudent.value.name.firstName;
  //   this.data.lastName = this.formStudent.value.name.lastName;
  //   this.data.middleName = this.formStudent.value.name.middleName;
  //   this.hideModal();
  //   this.confirm = true;
  // }
  // public hideModal(): void {
  //   this.studentsService.debug() ? this.router.navigate([""], {queryParams: {debug: true}}) : this.router.navigate([""]);
  //   this.confirm = false;
  // }
  // public confirmation(): void {
  //   this.confirm = !this.confirm;
  //   this.studentsService.debug() ? this.router.navigate([""], {queryParams: {debug: true}}) : this.router.navigate([""]);
  // }
  // private _action(event: string): void {
  //   switch (EventsInterface[event]) {
  //     case 1: {
  //       this.action = 1;
  //       this.title = "Add new student";
  //       this.initAddStudentForm();
  //       break;
  //     }
  //     case 2: {
  //       this.title = "Edit";
  //       this.action = 2;
  //       this.activatedRoute.params.subscribe(param => this.studentId = param.id);
  //       this.initEditStudentForm();
  //       break;
  //     }
  //     case 0: {
  //       this.title = "Confirmation";
  //       this.action = 0;
  //       this.activatedRoute.params.subscribe(param => this.studentId = param.id);
  //       break;
  //     }
  //     default: {
  //       break;
  //     }
  //   }
  // }
  ngOnInit(): void {
    // this.event = this.activatedRoute.snapshot.url[0].path;
    // this._action(this.event);
  }
}
