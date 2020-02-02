import { HttpClient, HttpEventType } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { environment } from "../../../../environments/environment";
import { IStudent } from "../../../models/student.interface";
import { StudentsService } from "../../../services/students.service";
import { CreateStudent, GetStudents } from "../../../store/actions/student.actions";
import { StudentValidatorsService } from "../../../validators/student-validators.service";
// import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { ActivatedRoute, Router } from "@angular/router";
// import { DataInterface } from "../../interfaces/data.interface";
// import { EventsInterface } from "../../interfaces/events.interface";
// import { IStudents } from "../../interfaces/student.interface";
// import { DataService } from "../../services/data.service";
// import { StudentValidatorsService } from "../../validators/student-validators.service";

@Component({
  selector: "modal",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.less"]
})
export class ModalComponent implements OnInit, OnDestroy {
  public formStudent: FormGroup;
  public selectedFile: File = null;
  public imagePath: string | ArrayBuffer;
  public filename: string;
  constructor(private StudentValidators: StudentValidatorsService,
              private fb: FormBuilder,
              private _store: Store<IStudent>,
              private _ref: ChangeDetectorRef,
              private studentsService: StudentsService,
              private router: Router) {}
  public isControlInvalid(controlName: string): boolean {
    const control = this.formStudent.get(controlName);
    return control.invalid && control.touched;
  }
  // tslint:disable-next-line:typedef
  public onFileSelected(event): void {
    if (<File>event.target.files[0]) {
      this.selectedFile = <File>event.target.files[0];
      if (this.selectedFile.type === "image/jpeg" || this.selectedFile.type === "image/png") {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
          const fd = new FormData();
          fd.append("image", this.selectedFile, this.selectedFile.name);
          this.studentsService.onUpload(fd).subscribe(data => this.filename = "avatars/" + data.filename);
          this.imagePath = reader.result;
          this._ref.markForCheck();
        };
      } else {
        this.selectedFile = null;
        return;
      }
    }
  }
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
  public initAddStudentForm(): void {
    this.formStudent = this.fb.group({
      name: this.fb.group({
        firstName: ["", Validators.required],
        lastName: ["", Validators.required]
      }),
      birth: ["", Validators.required, this.StudentValidators.dateValidator],
      email: ["", Validators.email],
      phone: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required],
      grade: ["", Validators.required],
      sex: ["Sex", Validators.required],
      about: [""],
      avatar: [""]
    });


  }
  public submitForm(): boolean {
    const controls = this.formStudent.controls;
    if (this.formStudent.invalid) {
              Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return false;
    }
    const data: IStudent = {
      ...this.formStudent.value,
      id: 30,
      name: this.formStudent.value.name.firstName + " " + this.formStudent.value.name.lastName,
      avatar: this.studentsService.apiUri + this.filename
    };
    this._store.dispatch(new CreateStudent(data));
    this.router.navigate(["/"]);
    // if (this.action === 1) {
    //   if (this.studentsService.debug()) {
    //     this.data._id = "5e12bd9ffc13ae725b0000" + this.count;
    //   }
    //   this.data.id = this.count + 1;
    //   this.data.birth = new Date(this.formStudent.value.birth);
    //   this.data.firstName = this.formStudent.value.name.firstName;
    //   this.data.lastName = this.formStudent.value.name.lastName;
    //   this.data.middleName = this.formStudent.value.name.middleName;
    //   this.data.score = this.formStudent.value.score;
    //   this.hideModal();
    //   this.confirm = true;
    // }
    // this.data.birth = new Date(this.formStudent.value.birth);
    // this.data.score = this.formStudent.value.score;
    // this.data.firstName = this.formStudent.value.name.firstName;
    // this.data.lastName = this.formStudent.value.name.lastName;
    // this.data.middleName = this.formStudent.value.name.middleName;
    // this.hideModal();
    // this.confirm = true;
  }
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
    this.initAddStudentForm();
    // this.event = this.activatedRoute.snapshot.url[0].path;
    // this._action(this.event);
  }
  ngOnDestroy(): void {
    this._store.dispatch(new GetStudents());
  }
}
