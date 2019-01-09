import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AddProjectComponent } from '../project-overview/add-project/add-project.component';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project';
import { StateService } from 'src/app/services/state.service';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  addProjectComponent = AddProjectComponent;
  projects: Observable<Project[]>;
  editProjectComponent = EditProjectComponent;
  deleteProjectComponent = DeleteProjectComponent;
  addMemberComponent = AddMemberComponent;

  constructor(
    private projectService: ProjectService,
    private stateService: StateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.projects = this.projectService.getProjects();
    this.stateService.setProjectId('');
  }

  navigate = (project) => {
    this.router.navigate(['dashboard', project.id]);
  }
}
