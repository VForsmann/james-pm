import { Component, OnInit } from '@angular/core';
import { TaskStatusesService } from 'src/app/services/task-statuses.service';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { AddTaskComponent } from '../task/add-task/add-task.component';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit {
  addTaskComponent = AddTaskComponent;
  projectId;
  tasks = [];
  statusBars$: Observable<DocumentChangeAction<{}>[]>;
  constructor(
    private taskStatusesService: TaskStatusesService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private stateService: StateService
  ) {}

  ngOnInit() {
    let not_exist = true;
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(this.projectId);
    this.statusBars$ = this.taskStatusesService.getTaskStatuses();
    // this.tasks = this.taskService.getAllTasks(this.projectId);
    this.taskService.getAllTasks(this.projectId).subscribe(res => {
      this.tasks.map(task => {
        if (task['id'] === res['id']) {
          not_exist = false;
          if (!task['user']) {
            if (res['user']) {
              this.tasks.splice(this.tasks.indexOf(task), 1);
              this.tasks.push(res);
            }
          } else if (!res['user']) {
            this.tasks.splice(this.tasks.indexOf(task), 1);
            this.tasks.push(res);
          } else if (
            task !== undefined &&
            task['id'] === res['id'] &&
            task['user'].id !== res['user'].id
          ) {
            this.tasks.splice(this.tasks.indexOf(task), 1);
            this.tasks.push(res);
          }
        }
      });
      if (not_exist && res['id']) {
        this.tasks.push(res);
      }
      not_exist = true;
    });
  }
}
