import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DetailComponent } from "./components/detail/detail.component";
import { ModalComponent } from "./components/modal/modal.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { TableComponent } from "./components/table/table.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";

const studentsRoutes: Routes = [
  { path: "add", component: ModalComponent },
  { path: "edit/:id", component: ModalComponent},
  { path: "delete/:id", component: ModalComponent},
];

const dashboardRoutes: Routes = [
  { path: "", component: TableComponent},
  { path: "students", component: TableComponent , children: studentsRoutes},
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
