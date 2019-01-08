import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor() {
  }

  setLoading(loading: boolean) {
  }

  getLoading() {
  }
}
