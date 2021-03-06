import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SprintService } from 'src/app/services/sprint.service';
import { Observable } from 'rxjs';
import { AddSprintComponent } from './add-sprint/add-sprint.component';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit {
  constructor(private route: ActivatedRoute, private sprintService: SprintService, private stateService: StateService) { }
  sprints: Observable<{}>;
  addSprintComponent = AddSprintComponent;
  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(projectId);
    // this.sprints = this.sprintService.getSprintsForProjectId(projectId);
    this.sprints.subscribe((sprint) => {
      console.log(sprint);
    });
  }

}
