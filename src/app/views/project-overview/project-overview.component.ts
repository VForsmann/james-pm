import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddProjectComponent } from '../project-overview/add-project/add-project.component';
import { Project } from 'src/app/model/project';
import { UserProjectService } from 'src/app/services/user-project.service';

import { ReferenceService } from 'src/app/services/reference.service';
import { Observable, merge, forkJoin, zip } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

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
  projects;
  project;
  ngOnInit() {
    const obsProjects = [];
    this.userProjektService.getUserProjects().then(p => {
      p.subscribe(r => {
        console.log('hallo');
        r.map(actions => {
          const projectId = actions.payload.doc.data()['project'].id;
          const obsProject = this.projectService.getProjetForId(projectId);
          obsProjects.push(obsProject);
        });
        this.projects = zip(...obsProjects);
        console.log(this.projects);
        this.projects.subscribe(project => {
          console.log(project);
        });
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
