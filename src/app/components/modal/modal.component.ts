import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IEvents } from "../../data/i-events";
import { Students } from "../../data/students";
import { StudentValidatorsService } from "../../services/student-validators.service";

@Component({
  selector: "modal",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.less"]
})
export class ModalComponent implements OnInit {
  public title: string;
  public show: boolean;
  public formStudent: FormGroup;
  public currentDate = new Date().getFullYear() - 10;
  @Input() action: IEvents;
  @Input() data: Students;
  @Input() count: number;
  @Output() hideModalEmmit = new EventEmitter<boolean>();
  @Output() newStudent = new EventEmitter<Students>();
  @Output() returnConfirmation = new EventEmitter<boolean>();
  constructor(private StudentValidators: StudentValidatorsService) {
  }
  public isControlInvalid(controlName: string): boolean {
    const control = this.formStudent.get(controlName);
    return control.invalid && control.touched;
  }
  public convertDate(date: Date): string {
    const month = this.data.birth.getMonth() + 1;
    const stMonth: string = (month < 10) ? "0" + month : month.toString();
    const stDay: string = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate().toString();
    return date.getFullYear() + "-" + stMonth + "-" + stDay;
  }
  public initEditStudentForm(): void {
   this.formStudent = new FormGroup({
     name: new FormGroup({
       firstName: new FormControl(this.data.firstName, [Validators.required]),
       lastName: new FormControl(this.data.lastName, [Validators.required]),
       middleName: new FormControl(this.data.middleName, [Validators.required])
     }, [this.StudentValidators.nameValidator]),
     birth: new FormControl(this.convertDate(this.data.birth), [Validators.required, this.StudentValidators.dateValidator]),
     score: new FormControl(this.data.score, [Validators.required, Validators.min(1), Validators.max(5)])
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
  }
  public submitForm(): void {
    const controls = this.formStudent.controls;
    if (this.formStudent.invalid) {
              Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    if (this.data === null) {
      this.data = {
        id: this.count + 1,
        birth: new Date(this.formStudent.value.birth),
        score: this.formStudent.value.score,
        firstName: this.formStudent.value.name.firstName,
        lastName: this.formStudent.value.name.lastName,
        middleName: this.formStudent.value.name.middleName
      };
      this.newStudent.emit(this.data);
    }
    this.data.birth = new Date(this.formStudent.value.birth);
    this.data.score = this.formStudent.value.score;
    this.data.firstName = this.formStudent.value.name.firstName;
    this.data.lastName = this.formStudent.value.name.lastName;
    this.data.middleName = this.formStudent.value.name.middleName;
    this.hideModal();
  }
  public hideModal(): void {
    this.hideModalEmmit.emit(false);
    this.show = false;
  }
  public confirmation(): void {
    this.returnConfirmation.emit(true);
    this.hideModal();
  }
  private _action(event: IEvents): void {
    switch (event) {
      case IEvents.Add: {
        this.data = null;
        this.title = "Add new student";
        this.initAddStudentForm();
        break;
      }
      case IEvents.Edit: {
        this.title = "Edit " + this.data.firstName + " " + this.data.lastName;
        this.initEditStudentForm();
        break;
      }
      case IEvents.Confirmation: {
        this.title = "Confirmation";
        break;
      }
      default: {
        break;
      }
    }
  }
  ngOnInit(): void {
    this.show = true;
    this._action(this.action);
  }
}
