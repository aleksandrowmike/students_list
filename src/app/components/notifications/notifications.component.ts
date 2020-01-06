import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "students-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.less"]
})
export class NotificationsComponent implements OnInit {
  @Input() notification: string;
  @Input() textMessage: string;

  ngOnInit(): void {}
}
