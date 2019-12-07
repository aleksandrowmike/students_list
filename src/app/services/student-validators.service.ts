import { Injectable } from "@angular/core";
import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class StudentValidatorsService {
  public dateValidator(control: FormControl): ValidationErrors {
    const value = new Date(control.value).getFullYear();
    const correctDate = new Date().getFullYear() - 10;
    if (value > correctDate) {
      return { invalidDate: "Invalid date" };
    }
    return null;
  }
  public nameValidator(group: FormGroup): ValidationErrors {
    const firstName = group.controls["firstName"].value.replace(/\s/g, "").toLowerCase();
    const lastName = group.controls["lastName"].value.replace(/\s/g, "").toLowerCase();
    const middleName = group.controls["middleName"].value.replace(/\s/g, "").toLowerCase();
    if (firstName === lastName) {
      group.controls["firstName"].setErrors({nameValidator: true});
      group.controls["lastName"].setErrors({nameValidator: true});
      if (firstName === middleName || lastName === middleName) {
        group.controls["middleName"].setErrors({nameValidator: true});
      }
      return { invalidName: "Invalid Name" };
    }
    if (firstName === middleName) {
      group.controls["firstName"].setErrors({nameValidator: true});
      group.controls["middleName"].setErrors({nameValidator: true});
      if (firstName === lastName || lastName === middleName) {
        group.controls["middleName"].setErrors({nameValidator: true});
      }
      return { invalidName: "Invalid Name" };
    }
    if (lastName === middleName) {
      group.controls["lastName"].setErrors({nameValidator: true});
      group.controls["middleName"].setErrors({nameValidator: true});
      if (firstName === lastName || lastName === middleName) {
        group.controls["middleName"].setErrors({nameValidator: true});
      }
      return { invalidName: "Invalid Name" };
    }
    return null;
  }
}
