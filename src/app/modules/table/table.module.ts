import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { TableComponent } from "./components/table.component";


@NgModule({
  declarations: [
    TableComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        AngularFontAwesomeModule,
    ],
  exports: [
    TableComponent,
  ]
})
export class TableModule { }
