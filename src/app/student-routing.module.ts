import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModalComponent } from "./components/modal/modal.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { StudentsListComponent } from "./modules/table/components/students-list/students-list.component";
import { EditGuardService } from "./services/edit-guard.service";

const childRoutes: Routes = [
  { path: "add", component: ModalComponent },
  { path: "edit/:id", component: ModalComponent, canActivate: [EditGuardService]},
  { path: "delete/:id", component: ModalComponent},
];
const routes: Routes = [
  { path: "", component: StudentsListComponent, children: childRoutes },
  { path: "page-not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "/page-not-found"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
