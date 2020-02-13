import { Component } from "@angular/core";
import { TabComponent } from "./tab/tab.component";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.less"]
})
export class TabsComponent {
  tabs: TabComponent[] = [];

  selectTab(tab: TabComponent): void {
    this.tabs.forEach((tabItem: TabComponent) => {
      tabItem.active = false;
    });
    tab.active = true;
  }
  addTab(tab: TabComponent): void {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}
