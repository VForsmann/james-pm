import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
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
    private stateService: StateService
    ) { }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.project = this.projectService.getProjectForId(projectId);
    this.stateService.setProjectId(projectId);
  }

  navigateBacklogs() {
    console.log('test');
  }

  navigateSprints() {

  }

  navigateUserStorys() {

  }
}
