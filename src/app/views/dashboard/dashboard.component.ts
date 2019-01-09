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

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private stateService: StateService,
    private router: Router
    ) { }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.project = this.projectService.getProjectForId(projectId);
    this.stateService.setProjectId(projectId);
  }

  navigateBacklogs() {
    this.router.navigate(['backlog'], {relativeTo: this.route});
  }

  navigateSprints() {
    this.router.navigate(['sprint'], {relativeTo: this.route});
  }

  navigateUserStorys() {
    this.router.navigate(['userstory'], {relativeTo: this.route});
  }

  navigateScrumBoard() {
    this.router.navigate(['scrum'], {relativeTo: this.route});
  }
}
