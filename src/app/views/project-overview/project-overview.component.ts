import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AddProjectComponent } from '../project-overview/add-project/add-project.component';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  addProjectComponent = AddProjectComponent;
  projects: Observable<Project[]>;

  constructor(
    private projectService: ProjectService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.projects = this.projectService.getProjects();
    this.stateService.setProjectId('');
  }
}
