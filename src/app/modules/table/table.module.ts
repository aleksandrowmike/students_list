import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TableComponent } from "./components/table.component";


@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TableComponent,
  ]
})
export class TableModule { }
