import { Component, Input } from "@angular/core";
import { TabsComponent } from "../tabs.component";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.less"]
})
export class TabComponent {
  @Input() tabTitle: string;
  public active: boolean;
  constructor(tabs: TabsComponent) {
    tabs.addTab(this);
  }
}
