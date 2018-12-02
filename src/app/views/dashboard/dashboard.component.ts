import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  statusBars = [
    'analyse',
    'other',
    'quality_check',
    'something',
    'documentation',
    'preprocess'
  ];
  tasks: Task[] = [];
  task: Task = {
    id: '',
    description: '',
    title: '',
    status: '',
  };
  constructor(private taskService: TaskService, private projectService: ProjectService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(res => {
      res.map(actions => {
        this.task = <Task> actions.payload.doc.data();
        this.task.id = actions.payload.doc.id;
        this.tasks.push(this.task);
      });
    });
  }
}
