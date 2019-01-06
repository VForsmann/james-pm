import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  @Input() modalInput;
  constructor(public activeModal: NgbActiveModal, private projectService: ProjectService) { }
  user = {
    email: ''
  };
  ngOnInit() {
  }

  onSubmit() {
    alert(this.modalInput['id']);
    this.projectService.addMemberToProject(this.modalInput['id'], this.user.email);
    this.activeModal.close();
  }
}
