import { Component, OnInit, Input } from '@angular/core';
import { Model } from 'src/app/model/model';
import { Task } from 'src/app/model/task/task';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  @Input() name = '';
  tasks = [
    {
      description: 'fuck you',
      name: 'JUNGÄÄÄÄ',
      status: 'other'
    },
    {
      name: 'JUNGÄÄÄÄ',
      status: 'analyse'
    }
  ];
  task: Task;
  constructor(public model: Model) {
    // this.tasks = this.model.me.selectedProject.tasks;
    // this.task = new Task(this.model);
  }

  ngOnInit() {
  }

  onDrop(e: any) {
    this.task = e.dragData;
    // console.log(e.dragData);
    // this.tasks[this.tasks.findIndex(task => JSON.stringify(task) === JSON.stringify(this.task))].status = this.name;
    this.task.status = this.name;
    // console.log(this.tasks);
    // this.task.setTaskData();
  }
}
