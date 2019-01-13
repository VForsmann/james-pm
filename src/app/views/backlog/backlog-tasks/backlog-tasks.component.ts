import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReferenceService } from 'src/app/services/reference.service';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';
import { BacklogService } from 'src/app/services/backlog.service';

@Component({
  selector: 'app-backlog-tasks',
  templateUrl: './backlog-tasks.component.html',
  styleUrls: ['./backlog-tasks.component.scss']
})
export class BacklogTasksComponent implements OnInit {
  backlogId: string;
  projectId: string;
  backlog; // : Observable<{}>;
  tasks: Observable<{}>;
  allTasks: Observable<{}>;
  constructor(
    private route: ActivatedRoute,
    private referenceService: ReferenceService,
    private taskService: TaskService,
    private backlogService: BacklogService
  ) {}

  ngOnInit() {
    this.backlogId = this.route.snapshot.paramMap.get('bid');
    // this.backlog = this.backlogService.getBacklogWithIdValue(this.backlogId);
    this.backlogService.getBacklogWithIdValue(this.backlogId).subscribe(res => {
      this.backlog = res['name'];
    });
    this.tasks = this.taskService.getTasksForBacklog(this.backlogId);
    this.projectId = this.route.snapshot.paramMap.get('id');
    // this.allTasks = this.taskService.getAllTasksWithoutBacklog(this.projectId);
  }

  onDropAdd(e: any) {
    // e.dragdata entspricht dem aktuellen task den man an die methode übergibt
    this.taskService.addTaskToBacklog(e.dragData, this.backlogId).then(res => {
      console.log('task update');
    });
  }

  onDropRemove(e: any) {
    // e.dragdata entspricht dem aktuellen task den man an die methode übergibt
    // this.taskService.removeTaskFromBacklog(e.dragData, this.backlogId).then(res => {
    //   console.log('task update');
    // });
  }
}
