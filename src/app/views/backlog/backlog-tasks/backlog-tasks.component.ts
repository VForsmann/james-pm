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
  projectId: string;
  tasks: Observable<{}>;
  allTasks: Observable<{}>;
  constructor(private route: ActivatedRoute, private referenceService: ReferenceService, private taskService: TaskService) { }

  ngOnInit() {
    this.backlogId = this.route.snapshot.paramMap.get('bid');
    this.tasks = this.taskService.getTasksForBacklog(this.backlogId);
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.allTasks = this.taskService.getAllTasks(this.projectId);
  }

  onDropAdd(e: any) {
    // e.dragdata entspricht dem aktuellen task den man an die methode übergibt
    this.taskService.addTaskToBacklog(e.dragData, this.backlogId).then(res => {
      console.log('task update');
    });
    // Nur zum testen, nicht aufregen (Ändert den Status von dem Task) name => Status bzw. name vom Balken
    // e => Task den man bewegt
    // e.dragData.status = this.name;
  }

  onDropRemove(e: any) {
    // e.dragdata entspricht dem aktuellen task den man an die methode übergibt
    // this.taskService.removeTaskFromBacklog(e.dragData, this.backlogId).then(res => {
    //   console.log('task update');
    // });
  }
}
