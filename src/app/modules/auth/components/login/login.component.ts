import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthUser, GetDataUser } from "../../../../store/actions/auth.actions";
import { IAppState } from "../../../../store/state/app.state";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit, OnDestroy {
  public authForm: FormGroup;
  constructor(private fb: FormBuilder, private _store: Store<IAppState>, private router: Router) {}
  public initAuthFrom(): void {
    this.authForm = this.fb.group({
      email: [""],
      password: [""]
    });
    this.authForm.setValue({email: "mike@mike.ru", password: "123456789"});
  }
  public submitForm(): boolean {
    const controls = this.authForm.controls;
    if (this.authForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return false;
    }
    this._store.dispatch(new AuthUser(this.authForm.value));
  }
  ngOnInit(): void {
    this.initAuthFrom();
  }
  ngOnDestroy(): void {
    this._store.dispatch(new GetDataUser());
  }
}
