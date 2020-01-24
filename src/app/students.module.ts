import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DetailComponent } from "./components/detail/detail.component";
import { ModalComponent } from "./components/modal/modal.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { StudentsRootComponent } from "./components/students-root/students-root.component";
import { TableComponent } from "./components/table/table.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { SortingDirective } from "./directives/sorting.directive";
import { TextResultPipe } from "./pipes/text-resut.pipes";
import { StudentEffects } from "./store/effects/student.effects";
import { appReducers } from "./store/reducers/app.reducers";
import { StudentRoutingModule } from "./student-routing.module";
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';

@NgModule({
  declarations: [
    StudentsRootComponent,
    NotFoundComponent,
    NotificationsComponent,
    WelcomeComponent,
    DashboardComponent,
    DetailComponent,
    TableComponent,
    SortingDirective,
    ModalComponent,
    SideBarComponent,
    TabsComponent,
    TabComponent,
    TextResultPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StudentRoutingModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([StudentEffects]),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  bootstrap: [StudentsRootComponent]
})
export class StudentsModule {}
