import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  project: Observable<{}>;
  projectId: string;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private stateService: StateService,
    private router: Router
    ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.project = this.projectService.getProjectForId(this.projectId);
    this.stateService.setProjectId(this.projectId);
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
}
