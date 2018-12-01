import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  statusBars = [
    'analyse',
    'other',
    'quality_check',
    'something',
    'documentation',
    'preprocess'
  ];
  constructor() { }
}
