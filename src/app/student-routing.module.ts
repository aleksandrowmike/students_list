import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { ModalComponent } from "./components/modal/modal.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { EditGuardService } from "./guards/edit-guard.service";
import { StudentsListComponent } from "./modules/table/components/students-list/students-list.component";

const childRoutes: Routes = [
  { path: "add", component: ModalComponent },
  { path: "edit/:id", component: ModalComponent, canActivate: [EditGuardService]},
  { path: "delete/:id", component: ModalComponent},
];
const routes: Routes = [
  { path: "", redirectTo: "/welcome" , pathMatch: "full"},
  { path: "welcome", component: LoginComponent },
  { path: "dashboard", component: StudentsListComponent, children: childRoutes },
  { path: "page-not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "/page-not-found"},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
