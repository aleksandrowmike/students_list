import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { StudentsRootComponent } from "./components/students-root/students-root.component";
import { StTable } from "./modules/table/st-table.module";
import { DataService } from "./services/data.service";
import { EditGuardService } from "./services/edit-guard.service";
import { StudentsService } from "./services/students.service";
import { HttpDataService } from "./services/students/http-data.service";
import { InMemoryDataService } from "./services/students/in-memory-data.service";
import { StudentRoutingModule } from "./student-routing.module";

@NgModule({
  declarations: [
    StudentsRootComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    StTable,
    HttpClientModule,
    StudentRoutingModule,
  ],
  providers: [EditGuardService, StudentsService, {provide: DataService, deps: [StudentsService, HttpClient], useFactory: (studentsService, httpClient) => {
    if (studentsService.debug()) {
      return new InMemoryDataService();
    }
      return new HttpDataService(httpClient);
  }}],
  bootstrap: [StudentsRootComponent]
})
export class StudentsModule {}
