import { Component, OnInit } from '@angular/core';
import { TaskStatusesService } from 'src/app/services/task-statuses.service';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit {
  projectId;
  statusBars$: Observable<DocumentChangeAction<{}>[]>;
  constructor(
    private taskStatusesService: TaskStatusesService,
    private route: ActivatedRoute,
    private stateService: StateService
    ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(this.projectId);
    this.statusBars$ = this.taskStatusesService.getTaskStatuses();
  }
}
