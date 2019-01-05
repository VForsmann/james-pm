import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AddProjectComponent } from '../project-overview/add-project/add-project.component';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  constructor(
    private projectService: ProjectService
  ) {}
  addProjectComponent = AddProjectComponent;
  projects;
  project;
  ngOnInit() {
  this.projectService.getProjects().subscribe(result => {
    this.projects = result;
  });
  }
}
