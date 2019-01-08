import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private projectId: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() { }

  // call this method only in the dashboard component and project-overview component
  setProjectId(id: string) {
    this.projectId.next(id);
  }

  getProjectId() {
    return this.projectId;
  }
}
