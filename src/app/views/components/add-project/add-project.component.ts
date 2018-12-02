import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  project: Project = {
    creator: 'gApsvyNMc8zP3KtC6MNr',
    name: '',
    description: ''
  };
  constructor(public activeModal: NgbActiveModal, private projectService: ProjectService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.projectService.addNewProject(this.project);
    this.activeModal.close();
  }

}
