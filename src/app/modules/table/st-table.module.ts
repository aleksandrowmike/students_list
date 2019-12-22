import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ModalComponent } from "../../components/modal/modal.component";

import { StudentsListComponent } from "./components/students-list/students-list.component";
import { SortingDirective } from "./directives/sorting.directive";

@NgModule({
  declarations: [
    StudentsListComponent,
    SortingDirective,
    ModalComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  exports: [
    StudentsListComponent,
  ],
  providers: [],
})
export class StTable { }
