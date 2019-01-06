import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';
import { ReferenceService } from 'src/app/services/reference.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, private projectService: ProjectService,
    private referenceService: ReferenceService) { }
  project = {
    name: 'Name',
    description: 'Beschreibung'
  };
  ngOnInit() {
  }

  onSubmit() {
    this.projectService.addNewProject(this.project);
    this.activeModal.close();
  }

}
