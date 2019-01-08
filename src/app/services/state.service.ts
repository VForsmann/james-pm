import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { load } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private projectId: BehaviorSubject<string> = new BehaviorSubject('');
  // used for LoadingScreen
  loading = false;
  loadingTimestamp: number;
  constructor() { }

  // call this method only in the dashboard component and project-overview component
  setProjectId(id: string) {
    this.projectId.next(id);
  }

  getProjectId() {
    return this.projectId;
  }

  /**
   * Sets Loadingscreen; If time between switches is to small it will get timeouted
   * @param loading true:= Loadingscreeen will appear; false:= Loadingscreen will disappear
   */
  setLoading(loading: boolean) {
    if (this.loading && (new Date().getTime()) - this.loadingTimestamp < 400) {
      setTimeout(() => {
        this.loading = loading;
      }, 700);
    } else {
      this.loadingTimestamp = new Date().getTime();
      this.loading = loading;
    }
  }

  /**
   * returns status of Loadingscreen
   */
  getLoading() {
    return this.loading;
  }
}
