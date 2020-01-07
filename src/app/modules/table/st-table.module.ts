import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ModalComponent } from "../../components/modal/modal.component";
import { NotificationsComponent } from "../../components/notifications/notifications.component";

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
        RouterModule,
    ],
    exports: [
        StudentsListComponent,
    ],
  providers: [],
})
export class StTable { }
