import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DetailComponent } from "./components/detail/detail.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { StudentListComponent } from "./components/student-list/student-list.component";
import { LoginComponent } from "./modules/auth/components/login/login.component";
import { AuthGuard } from "./modules/auth/guards/auth.guard";
import { ModalComponent } from "./modules/modal/components/modal.component";

const studentsRoutes: Routes = [
  { path: "add", component: ModalComponent },
  { path: "delete/:id", component: ModalComponent},
];

const dashboardRoutes: Routes = [
  { path: "", component: StudentListComponent},
  { path: "students", component: StudentListComponent , children: studentsRoutes},
  { path: "detail/:id", component: DetailComponent},
];

const routes: Routes = [
  { path: "", redirectTo: "/dashboard" , pathMatch: "full"},
  { path: "login", component: LoginComponent},
  { path: "dashboard", component: DashboardComponent, children: dashboardRoutes, canActivate: [AuthGuard]},
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
