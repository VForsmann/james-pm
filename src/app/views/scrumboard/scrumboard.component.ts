import { Component, OnInit } from '@angular/core';
import { TaskStatusesService } from 'src/app/services/task-statuses.service';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit {

  statusBars$: Observable<DocumentChangeAction<{}>[]>;

  constructor(private taskStatusesService: TaskStatusesService) { }

  ngOnInit() {
    this.statusBars$ = this.taskStatusesService.getTaskStatuses();
  }
}
