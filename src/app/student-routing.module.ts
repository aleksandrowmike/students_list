import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DetailComponent } from "./components/detail/detail.component";
import { ModalComponent } from "./components/modal/modal.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { EditGuardService } from "./guards/edit-guard.service";
import { StudentsListComponent } from "./modules/table/components/students-list/students-list.component";

const studentsRoutes: Routes = [
  { path: "add", component: ModalComponent },
  { path: "edit/:id", component: ModalComponent, canActivate: [EditGuardService]},
  { path: "delete/:id", component: ModalComponent},
];

const dashboardRoutes: Routes = [
  { path: "", component: StudentsListComponent},
  { path: "students", component: StudentsListComponent , children: studentsRoutes},
  { path: "detail/:id", component: DetailComponent},
];

const routes: Routes = [
  { path: "", redirectTo: "/dashboard" , pathMatch: "full"},
  { path: "login", component: WelcomeComponent },
  { path: "dashboard", component: DashboardComponent, children: dashboardRoutes },
  { path: "page-not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "/page-not-found"},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
