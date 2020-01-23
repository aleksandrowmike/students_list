import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { StudentsRootComponent } from "./components/students-root/students-root.component";
import { EditGuardService } from "./guards/edit-guard.service";
import { StTable } from "./modules/table/st-table.module";
import { DataService } from "./services/data.service";
import { NotificationService } from "./services/notification.service";
import { StudentsService } from "./services/students.service";
import { HttpDataService } from "./services/students/http-data.service";
import { InMemoryDataService } from "./services/students/in-memory-data.service";
import { StudentRoutingModule } from "./student-routing.module";

@NgModule({
  declarations: [
    StudentsRootComponent,
    NotFoundComponent,
    NotificationsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    StTable,
    HttpClientModule,
    StudentRoutingModule,
  ],
  providers: [EditGuardService, StudentsService, NotificationService, {
    provide: DataService, deps: [StudentsService, HttpClient, NotificationService], useFactory: (studentsService, httpClient, notificationService) => {
      if (studentsService.debug()) {
        return new InMemoryDataService(notificationService);
      }
      return new HttpDataService(httpClient, notificationService);
    }
  }],
  bootstrap: [StudentsRootComponent]
})
export class StudentsModule {}
