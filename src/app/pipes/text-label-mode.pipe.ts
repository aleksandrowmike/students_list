import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "textLabelMode"
})
export class TextLabelModePipe implements PipeTransform {

  transform(value: boolean): string {
    if (value) {
      return "edit mode";
    }
    return "view mode";
  }

}
