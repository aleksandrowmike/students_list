import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  // tslint:disable-next-line:no-any
  private modals: any[] = [];

  // tslint:disable-next-line:no-any
  add(modal: any): void {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string): void {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string): void {
    // open modal specified by id
    // tslint:disable-next-line:no-any
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open();
  }

  close(id: string): void {
    // close modal specified by id
    // tslint:disable-next-line:no-any
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }
}
