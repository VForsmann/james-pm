import { Component, OnInit } from '@angular/core';
import { Model } from '../../model/model';
import { Project } from '../../model/project/project';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  projects: Project[] = [];
  constructor(private model: Model) {
    this.model.me.projects.forEach((project) => {
      this.projects.push(project);
    });
  }

  ngOnInit() {
  }

  addNewProject() {
    console.log('add new Project!');
  }

}
