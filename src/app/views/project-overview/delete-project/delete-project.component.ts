import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent implements OnInit {

  @Input() modalInput;

  projectName = '';
  role;
  constructor(public activeModal: NgbActiveModal, private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getRoleForProjectId(this.modalInput['id']).subscribe(role => {
      this.role = role;
      console.log(this.role);
    });
  }

  onSubmit() {
    this.projectService.deleteProject(this.modalInput.id);
    this.activeModal.close();
  }
}
