import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddProjectComponent } from '../components/add-project/add-project.component';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  constructor(private projectService: ProjectService, private authService: AuthService) { }
  addProjectComponent = AddProjectComponent;
  projects: Project[] = [];
  project: Project;
  ngOnInit() {
    this.projectService.getProjects().subscribe(res => {
      res.map(actions => {
        this.project = <Project> actions.payload.doc.data();
        this.project.id = actions.payload.doc.id;
        if (this.projects.map(pro => pro.id).indexOf(this.project.id) === -1) {
          this.projects.push(this.project);
        }
      });
    });

    this.projectService.getEditorProjects().subscribe(res => {
      res.map(actions => {
        this.project = <Project> actions.payload.doc.data();
        this.project.id = actions.payload.doc.id;
        if (this.projects.map(pro => pro.id).indexOf(this.project.id) === -1) {
          this.projects.push(this.project);
        }
      });
    });
  }
}
