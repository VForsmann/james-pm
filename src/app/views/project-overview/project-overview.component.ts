import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddProjectComponent } from '../project-overview/add-project/add-project.component';
import { Project } from 'src/app/model/project';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  constructor(private projectService: ProjectService, private authService: AuthService) { }
  addProjectComponent = AddProjectComponent;
  projects = [];
  project;
  ngOnInit() {
    this.projectService.getProjects().subscribe(res => {
      res.map(actions => {
        console.log(actions.payload.doc.data());
        this.project = this.projectService.getProjectForReference(actions.payload.doc.data()['project'].id);
        console.log(this.project);
        this.project.id = actions.payload.doc.id;
        if (this.projects.map(pro => pro.id).indexOf(this.project.id) === -1) {
          this.projects.push(this.project);
        }
      });
    });
  }
}
