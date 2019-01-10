import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReferenceService } from 'src/app/services/reference.service';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-backlog-tasks',
  templateUrl: './backlog-tasks.component.html',
  styleUrls: ['./backlog-tasks.component.scss']
})
export class BacklogTasksComponent implements OnInit {
  backlogId: string;
  tasks: Observable<{}>;
  constructor(private route: ActivatedRoute, private referenceService: ReferenceService, private taskService: TaskService) { }

  ngOnInit() {
    this.backlogId = this.route.snapshot.paramMap.get('bid');
    this.tasks = this.taskService.getTasksForBacklog(this.backlogId);
  }

}
