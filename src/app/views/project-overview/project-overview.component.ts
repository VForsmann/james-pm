import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddProjectComponent } from '../project-overview/add-project/add-project.component';
import { Project } from 'src/app/model/project';
import { UserProjectService } from 'src/app/services/user-project.service';

import { ReferenceService } from 'src/app/services/reference.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private userProjektService: UserProjectService,
    private referenceService: ReferenceService
  ) {}
  addProjectComponent = AddProjectComponent;
  projects: Observable<any>;
  project: Project;
  ngOnInit() {
    this.userProjektService.getUserProjects().subscribe(r => {
      r.map(actions => {
        console.log(actions.payload.doc.data());
      });
    });
    // this.projectService.getEditorProjects().subscribe(res => {
    //   res.map(actions => {
    //     this.project = <Project> actions.payload.doc.data();
    //     this.project.id = actions.payload.doc.id;
    //     if (this.projects.map(pro => pro.id).indexOf(this.project.id) === -1) {
    //       this.projects.push(this.project);
    //     }
    //   });
    // });
    // this.userstoryService.getUserstorysFromProject(this.referenceService.getProjectReference('Qiw8MhO0vY7TVP3R8Xe7')).subscribe(res => {
    //   console.log(res);
    // })
  }
}
