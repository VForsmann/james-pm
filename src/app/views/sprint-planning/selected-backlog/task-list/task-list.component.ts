import { Component, OnInit, Input } from '@angular/core';
import { Backlog } from 'src/app/model/backlog';
import { Observable } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() backlog: Backlog;
  @Input() addTask: Component;
  @Input() payload: any;

  tasks: Observable<Task[]>;
  faPlus = faPlus;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private stateService: StateService
    ) { }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(projectId);
    this.tasks = this.taskService.getTasksForBacklog(this.backlog.id);
  }
}
