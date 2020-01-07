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
      if (firstName === middleName || lastName === middleName) {
        return { invalidName: "Invalid Name" };
      }
      return { invalidName: "Invalid Name" };
    }
    if (firstName === middleName) {
      if (firstName === lastName || lastName === middleName) {
        return { invalidName: "Invalid Name" };
      }
      return { invalidName: "Invalid Name" };
    }
    if (lastName === middleName) {
      if (firstName === lastName || lastName === middleName) {
        return { invalidName: "Invalid Name" };
      }
      return { invalidName: "Invalid Name" };
    }
    return null;
  }
}
