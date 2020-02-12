import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TableComponent } from "./components/table.component";


@NgModule({
  declarations: [
    TableComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
    ],
  exports: [
    TableComponent,
  ]
})
export class TableModule { }
