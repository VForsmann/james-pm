import { Component } from '@angular/core';
import { Model } from 'src/app/model/model';
import { Task } from 'src/app/model/task/task';

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
  // tasks: Task[] = [];
  constructor(public model: Model) {
  }

  onDropDelete(e: any) {
    // const index = this.tasks.indexOf(e.dragData);
    // this.tasks.splice(index, 1);
  }
}
