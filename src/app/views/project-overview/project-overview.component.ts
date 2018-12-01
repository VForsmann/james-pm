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
  projects = []; // Das letztendlich fertige Array mit den Projekten
  project = {}; // Wird benötigt für das zusammenbauen von daten und der ID
  ngOnInit() {
    this.projectService.getProjects().subscribe(res => {
      // mapped die document Id, da die sonst nicht mitgeliefert wird. (Wird benötigt für weitere Funktionen z.B. Backlog)
      res.map(actions => {
        this.project = actions.payload.doc.data();
        this.project['id'] = actions.payload.doc.id;
        this.projects.push(this.project);
      });
    });
  }

  addNewProject() {
    // this.projectService.addNewProject({
    //   creator: this.authService.getLoggedInUser(),
    //   description: 'Next Project',
    //   name: 'Firestore lets go'
    // }).then(res => {
    //   console.log('Wuhuhuu');
    // });
  }

}
