import {Attribute, Directive, ElementRef, HostListener, Input } from "@angular/core";
import { Students } from "../../../data/students";

enum Sort {
  ASC,
  DESC
}

@Directive({
  selector: "[sorting]"
})

export class SortingDirective {
  private _numberOfClicks = 0;
  private _childElement: ElementRef;
  private readonly _sortField: string;
  constructor(@Attribute("sorting") sortField: string, private el: ElementRef) {
    this._sortField = sortField;
    this._childElement = this.el.nativeElement.childNodes;
  }
  @Input() students: Students[];
  @HostListener("click") onClick(): void {
    this._action(Sort[this._numberOfClicks]);
    this._numberOfClicks = this._numberOfClicks === 1 ? this._numberOfClicks = 0 : this._numberOfClicks = 1;
  }
  private _action(event: string): Students[] {
    switch (event) {
      case "ASC": {
        this._childElement[1].className = "visibility";
        this._childElement[2].className = "unvisibility";
        return this.students.sort((a: Students, b: Students ): number => {
          if (a[this._sortField] < b[this._sortField]) {
            return -1;
          }
        });
      }
      case "DESC": {
        this._childElement[2].className = "visibility";
        this._childElement[1].className = "unvisibility";
        return this.students.sort((a: Students, b: Students ): number => {
          if (a[this._sortField] > b[this._sortField]) {
            return -1;
          }
        });
        break;
      }
      default: {
        break;
      }
    }
  }
}
