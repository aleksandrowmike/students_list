import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { ModalComponent } from "./components/modal/modal.component";
import { StudentsListComponent } from "./components/students-list/students-list.component";
import { StudentsRootComponent } from "./components/students-root/students-root.component";
import { SortingDirective } from "./directives/sorting.directive";

@NgModule({
  declarations: [
    StudentsRootComponent,
    StudentsListComponent,
    ModalComponent,
    SortingDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [StudentsRootComponent]
})
export class StudentsModule { }
