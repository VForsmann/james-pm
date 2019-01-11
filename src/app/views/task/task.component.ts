import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks: Observable<{}>;
  projectId;
  addTaskComponent = AddTaskComponent;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.tasks = this.taskService.getAllTasks(this.projectId);
  }

  navigate = (task) => {
    this.router.navigate(['/dashboard', this.projectId, 'backlog', task['backlog'].id]);
  }

}
