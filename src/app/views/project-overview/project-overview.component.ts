import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  constructor(private projectService: ProjectService, private authService: AuthService) { }
  projects;
  ngOnInit() {
    this.projectService.getProjects().subscribe(res => {
      this.projects = res;
    });
  }

  addNewProject() {
    console.log(this.authService.getLoggedInUser());
    // this.projectService.addNewProject({
    //   creator: this.authService.getLoggedInUser(),
    //   description: 'Next Project',
    //   name: 'Firestore lets go'
    // }).then(res => {
    //   console.log('Wuhuhuu');
    // });
  }

}
