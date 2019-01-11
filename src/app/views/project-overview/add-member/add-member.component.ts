import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  @Input() modalInput;

  user = {
    email: '',
    working_units: 0
  };

  constructor(public activeModal: NgbActiveModal, private projectService: ProjectService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.projectService.addMemberToProject(this.modalInput['id'], this.user.email, this.user.working_units);
    this.activeModal.close();
  }
}
