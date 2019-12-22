import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StTable } from "./modules/table/st-table.module";

import { StudentsRootComponent } from "./components/students-root/students-root.component";

@NgModule({
  declarations: [
    StudentsRootComponent,
  ],
  imports: [
    BrowserModule,
    StTable,
  ],
  providers: [],
  bootstrap: [StudentsRootComponent]
})
export class StudentsModule { }
