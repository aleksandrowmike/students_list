import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { IStudent } from "../../../models/student.interface";
import { StudentsService } from "../../../services/students.service";
import { CreateStudent, DeleteStudent, GetStudents } from "../../../store/actions/student.actions";
import { getCountStudent } from "../../../store/selectors/students.selectors";
import { IAppState } from "../../../store/state/app.state";
import { StudentValidatorsService } from "../../../validators/student-validators.service";

enum Action {
  delete = "delete",
  add = "add"
}

@Component({
  selector: "modal",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.less"]
})
export class ModalComponent implements OnInit, OnDestroy {
  public confirm: boolean = false;
  public id: number;
  public titleModal: string;
  public formStudent: FormGroup;
  public selectedFile: File = null;
  public imagePath: string | ArrayBuffer;
  public filename: string;
  constructor(private StudentValidators: StudentValidatorsService,
              private fb: FormBuilder,
              private _store: Store<IAppState>,
              private _ref: ChangeDetectorRef,
              private studentsService: StudentsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}
  public isControlInvalid(controlName: string): boolean {
    const control = this.formStudent.get(controlName);
    return control.invalid && control.touched;
  }
  public onFileSelected(fileList: FileList): void {
    if (<File>fileList[0]) {
      this.selectedFile = <File>fileList[0];
      if (this.selectedFile.type === "image/jpeg" || this.selectedFile.type === "image/png") {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
          this.imagePath = reader.result;
          this._ref.markForCheck();
        };
      } else {
        this.selectedFile = null;
        return;
      }
    }
  }
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
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.studentsService.onUpload(fd).subscribe(dataOut => this.filename = "avatars/" + dataOut.filename).unsubscribe();
    const data: IStudent = {
      ...this.formStudent.value,
      id: this.id + 1,
      name: this.formStudent.value.name.firstName + " " + this.formStudent.value.name.lastName,
      avatar: this.studentsService.apiUri + this.filename
    };
    this._store.dispatch(new CreateStudent(data));
    this.router.navigate(["/"]);
  }
  public delete(): void {
    this._store.dispatch(new DeleteStudent(this.activatedRoute.snapshot.url[1].path));
    this.router.navigate(["/"]);
  }
  private _action(event: string): void {
    switch (event) {
      case Action.delete: {
        this.confirm = true;
        this.titleModal = "Deletion Confirmation";
        break;
      }
      case Action.add: {
        this.initAddStudentForm();
        this.titleModal = "Add student";
        this._store.pipe(select(getCountStudent)).subscribe(count => this.id = count).unsubscribe();
        break;
      }
      default: {
        break;
      }
    }
  }
  ngOnInit(): void {
    this._action(this.activatedRoute.snapshot.url[0].path);
  }
  ngOnDestroy(): void {
    this._store.dispatch(new GetStudents());
  }
}
