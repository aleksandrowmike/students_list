import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NotificationService } from "../../../services/notification.service";

@Component({
  selector: "students-notifications",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.less"]
})
export class NotificationsComponent implements OnInit {
  constructor(public notificationService: NotificationService) {}
  ngOnInit(): void {
  }
}
