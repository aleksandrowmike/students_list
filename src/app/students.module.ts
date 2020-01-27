import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DetailComponent } from "./components/detail/detail.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { StudentListComponent } from "./components/student-list/student-list.component";
import { StudentsRootComponent } from "./components/students-root/students-root.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { SortingDirective } from "./directives/sorting.directive";
import { ModalModule } from "./modules/modal/modal.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { TableModule } from "./modules/table/table.module";
import { TabsModule } from "./modules/tabs/tabs.module";
import { TextLabelModePipe } from "./pipes/text-label-mode.pipe";
import { TextResultPipe } from "./pipes/text-resut.pipe";
import { StudentEffects } from "./store/effects/student.effects";
import { appReducers, metaReducers } from "./store/reducers/app.reducers";
import { StudentRoutingModule } from "./student-routing.module";

@NgModule({
  declarations: [
    StudentsRootComponent,
    NotFoundComponent,
    WelcomeComponent,
    DashboardComponent,
    DetailComponent,
    SortingDirective,
    SideBarComponent,
    TextResultPipe,
    StudentListComponent,
    TextLabelModePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StudentRoutingModule,
    StoreModule.forRoot(appReducers, {metaReducers}),
    EffectsModule.forRoot([StudentEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    RouterModule,
    TableModule,
    TabsModule,
    ModalModule,
    NotificationsModule,
  ],
  bootstrap: [StudentsRootComponent]
})
export class StudentsModule {}
