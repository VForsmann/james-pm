import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Backlog } from 'src/app/model/backlog';
import { AddTaskComponent } from '../../task/add-task/add-task.component';
import { BacklogService } from 'src/app/services/backlog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { TaskService } from 'src/app/services/task.service';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: 'app-selected-backlog',
  templateUrl: './selected-backlog.component.html',
  styleUrls: ['./selected-backlog.component.scss']
})
export class SelectedBacklogComponent implements OnInit {
  backlogs: Observable<Backlog[]>;
  addTaskComponent = AddTaskComponent;
  projectId: string;
  backlogStoryPoints = {};

  constructor(
    private backlogService: BacklogService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private sprintService: SprintService
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(this.projectId);
    this.backlogs = this.backlogService.getSelectedBacklogs(this.projectId);
  }

  saveNextSprint() {
    const subBacklogs = this.backlogs.subscribe(backlogs => {
      subBacklogs.unsubscribe();
      this.sprintService
      .getNextSprintOrCreate(this.projectId)
      .then(sprintRef => {
        if (backlogs) {
          backlogs.forEach(backlog => {
            backlog.sprint = sprintRef;
            backlog.selected = false;
            if (this.backlogStoryPoints[backlog.id]) {
              backlog.storypoints = this.backlogStoryPoints[backlog.id];
            }
            this.backlogService.updateBacklog(backlog);
          });
        }
          },
          error => console.warn('could not get next Sprint!' + error)
          )
          .then(
            () => {
              this.router.navigate([
                'dashboard',
                this.projectId,
                'scrum'
              ]);
            }
          );
    });
  }

  saveStoryPoints(backlog, storypoints: number) {
    this.backlogStoryPoints[backlog.id] = storypoints;
  }
}
