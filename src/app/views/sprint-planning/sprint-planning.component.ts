import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { StateService } from 'src/app/services/state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BacklogService } from 'src/app/services/backlog.service';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-sprint-planning',
  templateUrl: './sprint-planning.component.html',
  styleUrls: ['./sprint-planning.component.scss']
})
export class SprintPlanningComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private backlogService: BacklogService,
    private router: Router
  ) {}
  backlogs: Observable<{}>;
  role: string;
  scrummaster = false;
  product_owner = false;
  developer = false;
  projectId: string;
  project;
  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.projectService.getRoleForProjectId(this.projectId).subscribe(role => {
      this.role = role;
      switch (this.role) {
        case 'scrum master': {
          this.scrummaster = true;
          this.developer = false;
          this.product_owner = false;
          break;
        }
        case 'product owner': {
          this.product_owner = true;
          this.developer = false;
          this.scrummaster = false;
          break;
        }
        case 'developer': {
          this.developer = true;
          this.scrummaster = false;
          this.product_owner = false;
        }
      }
    });
    this.backlogs = this.backlogService.getBacklogs(this.projectId);
    this.project = this.projectService.getProjectForId(this.projectId);
  }

  select(backlog) {
    if (this.scrummaster || this.product_owner) {
      backlog.selected
        ? (backlog.selected = undefined)
        : (backlog.selected = true);
      this.backlogService.updateBacklog(backlog);
    }
  }

  navigatePoker() {
    /* this.projectService.updateProject();
    this.router.navigate([
      '/dashboard',
      this.projectId,
      'sprint-planning',
      'planning-poker'
    ]); */
  }
}
