import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  addUserstory: EventEmitter<void> = new EventEmitter();

  constructor() { }

  emitAddUserstorySubmit(backlogRef) {
    console.log('emit!!!');
    this.addUserstory.emit(backlogRef);
  }

  getAddUserstorySubmit() {
    return this.addUserstory;
  }
}
