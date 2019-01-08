import { Component} from '@angular/core';
import { StateService } from './services/state.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'james-pm';
  loading: boolean;
  constructor(private stateService: StateService) {
  }
}
