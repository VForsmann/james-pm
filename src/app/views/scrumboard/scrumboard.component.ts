import { Component, OnInit } from '@angular/core';
import { TaskStatusesService } from 'src/app/services/task-statuses.service';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit {
  projectId;
  statusBars$: Observable<DocumentChangeAction<{}>[]>;
  tasks: Observable<{}>;
  constructor(
    private taskStatusesService: TaskStatusesService,
    private taskService: TaskService,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.statusBars$ = this.taskStatusesService.getTaskStatuses();
    this.tasks = this.taskService.getAllTasks(this.projectId);
  }
}
