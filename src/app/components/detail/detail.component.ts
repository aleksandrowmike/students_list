import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { IDiscipline } from "../../interfaces/discipline";
import { IStudent } from "../../models/student.interface";
import { StudentsService } from "../../services/students.service";
import { GetStudent, UpdateRecordBook, UpdateStudent } from "../../store/actions/student.actions";
import { getMode, selectSelectedStudent } from "../../store/selectors/students.selectors";
import { IAppState } from "../../store/state/app.state";
import { StudentValidatorsService } from "../../validators/student-validators.service";

@Component({
  selector: "app-detail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.less"]
})
export class DetailComponent implements OnInit {
  public student: IStudent;
  public mode: Observable<boolean> = this._store.pipe(select(getMode));
  public selectedFile: File = null;
  public filename: string = this.studentsService.apiUri + "avatars/default.png";
  public imagePath: string | ArrayBuffer;
  public updateForm: FormGroup;
  public updateRecordBookForm: FormGroup;
  public updateRecordBookButtonName: string = "Add data";
  constructor(private _store: Store<IAppState>,
              private _route: ActivatedRoute,
              private _router: Router,
              private fb: FormBuilder,
              private StudentValidators: StudentValidatorsService,
              private studentsService: StudentsService,
              private _ref: ChangeDetectorRef) {}
  public discipline(period: string): Observable<IDiscipline[]> {
    return this._store.pipe(
      select(selectSelectedStudent),
      map((student) => {
        const recordBook = student.recordBook.find(record => record.period === period);
        const discipline = [];
        const keys = Object.keys(recordBook.discipline);
        const values = Object.values(recordBook.discipline);
        for (let i = 0; i < keys.length; i++) {
          discipline[i] = {subject: keys[i], result: values[i]};
        }
        return discipline;
      }),
    );
  }
  public onFileSelected(fileList: FileList): void {
    if (<File>fileList[0]) {
      this.selectedFile = <File>fileList[0];
      if (this.selectedFile.type === "image/jpeg" || this.selectedFile.type === "image/png") {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
          this.imagePath = reader.result;
          const fd = new FormData();
          fd.append("image", this.selectedFile, this.selectedFile.name);
          this.studentsService.onUpload(fd).pipe(first())
            .subscribe(data => this.filename = this.studentsService.apiUri + "avatars/" + data.filename);
          this._ref.markForCheck();
        };
      }
      return;
    }
  }
  public deleteFile(): void {
    this.imagePath = this.student.avatar;
  }
  public convertDate(date: Date): string {
    const dates = new Date(date);
    const month = dates.getMonth() + 1;
    const stMonth: string = (month < 10) ? "0" + month : month.toString();
    const stDay: string = (dates.getDate() < 10) ? "0" + dates.getDate() : dates.getDate().toString();
    return dates.getFullYear() + "-" + stMonth + "-" + stDay;
  }
  public isControlInvalid(controlName: string): boolean {
    const control = this.updateForm.get(controlName);
    return control.invalid && control.touched;
  }
  public initUpdateStudentForm(): void {
    this.updateForm = this.fb.group({
      name: [this.student.name, [Validators.required]],
      birth: [this.convertDate(new Date(this.student.birth)), [Validators.required, this.StudentValidators.dateValidator]],
      email: [this.student.email, [Validators.email]],
      phone: [this.student.phone, [Validators.required]],
      country: [this.student.country, [Validators.required]],
      city: [this.student.city, [Validators.required]],
      grade: [this.student.grade, [Validators.required]],
      sex: [this.student.sex, [Validators.required]],
      about: [this.student.about],
    });
  }
  public submitForm(): boolean {
    const controls = this.updateForm.controls;
    if (this.updateForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return false;
    }
    if (!this.selectedFile) {
      this.filename = this.student.avatar;
    }
    const dataForm: IStudent = {
      ...this.updateForm.value,
      _id: this._route.snapshot.params.id,
      avatar: this.filename,
      recordBook: this.student.recordBook
    };
    this._store.dispatch(new UpdateStudent({_id: this._route.snapshot.params.id, data: dataForm}));
 }
  public updateRecordBook(data: {period: string, subject: string, result: number}): void {
    this.updateRecordBookForm.setValue(data);
    this.updateRecordBookButtonName = "Update data";
  }
  public submitUpdateRecordBookForm(): boolean {
    const controls = this.updateRecordBookForm.controls;
    if (this.updateRecordBookForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return false;
    }
    const discipline = {};
    discipline[this.updateRecordBookForm.value.subject] = this.updateRecordBookForm.value.result;
    if (this.student.recordBook.find(s => s.period === this.updateRecordBookForm.value.period)) {
       this.student.recordBook.forEach(record => {
        if (record.period === this.updateRecordBookForm.value.period) {
          record.discipline = {
            ...record.discipline,
            ...discipline
          };
        }
      });
    } else {
      this.student.recordBook.push({period: this.updateRecordBookForm.value.period, discipline: discipline});
    }
    this._store.dispatch(new UpdateRecordBook({_id: this._route.snapshot.params.id, data: this.student.recordBook}));
  }
  public initUpdateRecordBookForm(): void {
    this.updateRecordBookForm = this.fb.group({
      period: ["", [Validators.required]],
      subject: ["", [Validators.required]],
      result: ["", [Validators.required]]
    },
    );
  }

  ngOnInit(): void {
    this._store.dispatch(new GetStudent(this._route.snapshot.params.id));
    this._store.pipe(select(selectSelectedStudent)).subscribe(data => this.student = data);
    this.imagePath = this.student.avatar;
    this.initUpdateStudentForm();
    this.initUpdateRecordBookForm();
  }
}
