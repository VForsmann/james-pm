import { Component } from '@angular/core';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'james-pm';
  constructor(private stateService: StateService) {
    stateService.getLoading().subscribe(loading => {
      console.log(loading);
    });
    stateService.setLoading(true);
  }
}
