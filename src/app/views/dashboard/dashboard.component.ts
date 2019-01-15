import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/model/sprint';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  project: Observable<Partial<Project>>;
  projectId: string;
  sprintStartDate = null;
  sprintEndDate = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private stateService: StateService,
    private router: Router,
    private sprintService: SprintService
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.project = this.projectService.getProjectForId(this.projectId);
    this.stateService.setProjectId(this.projectId);
    this.getCurrentSprint();
  }

  navigateBacklogs() {
    this.router.navigate(['/dashboard', this.projectId, 'backlogs']);
  }

  navigateSprints() {
    this.router.navigate(['/dashboard', this.projectId, 'sprints']);
  }

  navigateUserStorys() {
    this.router.navigate(['/dashboard', this.projectId, 'userstorys']);
  }

  navigateTasks() {
    this.router.navigate(['/dashboard', this.projectId, 'tasks']);
  }

  navigateRoadmap() {
    this.router.navigate(['/dashboard', this.projectId, 'roadmap']);
  }

  navigateSprintplanning() {
    console.log('ja');
    this.router.navigate(['/dashboard', this.projectId, 'sprint-planning']);
  }

  getCurrentSprint() {
    this.sprintService
      .getActualSprintFromProject(this.projectId)
      .then(sprint => {
        if (sprint) {
          this.sprintService
            .getSprintWithId((sprint as Sprint).id)
            .subscribe(sprintData => {
              this.sprintStartDate = new Date(
                sprintData.start_date * 1000
              ).toLocaleDateString();
              this.projectService.getProjectForId(this.projectId).subscribe(project => {
                if (project.default_sprint_time_ms) {
                  this.sprintEndDate = new Date(
                    sprintData.start_date * 1000 +
                    project.default_sprint_time_ms
                    ).toLocaleDateString();
                  }
              });
            });
        }
      });
  }
}
