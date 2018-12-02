import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AddProjectComponent } from '../components/add-project/add-project.component';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  constructor(private projectService: ProjectService, private authService: AuthService) { }
  addProjectComponent = AddProjectComponent;
  projects: Project[] = []; // Das letztendlich fertige Array mit den Projekten
  project: Project; // Wird benötigt für das zusammenbauen von daten und der ID
  ngOnInit() {
    this.projectService.getProjects().subscribe(res => {
      console.log(res);
      // mapped die document Id, da die sonst nicht mitgeliefert wird. (Wird benötigt für weitere Funktionen z.B. Backlog)
      res.map(actions => {
        this.project = <Project> actions.payload.doc.data();
        this.project.id = actions.payload.doc.id;
        this.projects.push(this.project);
      });
    });
  }
}
