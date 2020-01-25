import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TabComponent } from "./components/tab/tab.component";
import { TabsComponent } from "./components/tabs.component";

@NgModule({
  declarations: [
    TabsComponent,
    TabComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TabComponent,
    TabsComponent,
  ]
})

export class TabsModule { }
