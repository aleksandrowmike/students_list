import { Pipe, PipeTransform } from "@angular/core";
import { EResult } from "../interfaces/result.emun";

@Pipe({
  name: "textResult"
})
export class TextResultPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case (EResult.good): {
        return "good";
      }
      case (EResult.satisfactorily): {
        return "satisfactorily";
      }
      case (EResult.noTurnout): {
        return "no-turnout";
      }
      case (EResult.nonCharitable): {
        return "non-charitable";
      }
      case (EResult.wellDone): {
        return "well done";
      }
      default: {
        return "none";
      }
    }
  }
}
