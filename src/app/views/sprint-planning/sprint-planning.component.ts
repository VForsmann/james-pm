import { Component, OnInit, AfterViewChecked } from '@angular/core';
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
    this.backlogs = this.backlogService
      .getBacklogs(this.projectId);
     /*  .subscribe(backlogs => {
        this.backlogs = backlogs;
      }); */
    this.projectService.getProjectForId(this.projectId).subscribe(pro => {
      this.project = pro;
    });
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
    if ((this.scrummaster || this.product_owner) && !this.project['pokering']) {
      this.project['id'] = this.projectId;
      this.project['pokering'] = true;
      this.projectService.updateProject(this.project);
    }
    this.router.navigate([
      '/dashboard',
      this.projectId,
      'sprint-planning',
      'planning-poker'
    ]);
  }

  navigateSelectedBacklogs() {
    this.router.navigate([
      '/dashboard',
      this.projectId,
      'sprint-planning',
      'selected-backlogitems'
    ]);
  }
}
