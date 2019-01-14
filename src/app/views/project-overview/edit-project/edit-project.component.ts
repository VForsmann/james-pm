import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  @Input() modalInput;
  constructor(public activeModal: NgbActiveModal, private projectService: ProjectService) { }

  project: Project = {
    id: '',
    name: '',
    description: ''
  };
  role;
  ngOnInit() {
    this.project.id = this.modalInput.id;
    this.project.name = this.modalInput.name;
    this.project.description = this.modalInput.description;
    this.projectService.getRoleForProjectId(this.modalInput['id']).subscribe(role => {
      this.role = role;
      console.log(this.role);
    });
  }

  onSubmit() {
    this.projectService.updateProject(this.project);
    this.activeModal.close();
  }
}
