import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { ModalComponent } from "./components/modal/modal.component";
import { StudentsListComponent } from "./components/students-list/students-list.component";
import { StudentsRootComponent } from "./components/students-root/students-root.component";

@NgModule({
  declarations: [
    StudentsRootComponent,
    StudentsListComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [StudentsRootComponent]
})
export class StudentsModule { }
