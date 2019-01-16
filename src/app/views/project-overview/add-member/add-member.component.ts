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
    role: '',
    working_units: 0
  };
  role;
  roles;
  selectedRole;
  constructor(
    public activeModal: NgbActiveModal,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.projectService.getRoleForProjectId(this.modalInput['id']).subscribe(role => {
      this.role = role;
      if (role === 'product owner') {
        this.selectedRole = 'scrum master';
      } else if (role === 'scrum master') {
        this.selectedRole = 'developer';
      }
    });

    this.roles = this.projectService.getRoles();
  }

  onSubmit() {
    this.projectService.addMemberToProject(
      this.modalInput['id'],
      this.user.email,
      this.user.working_units,
      this.selectedRole
    );
    console.log(this.selectedRole);
    this.activeModal.close();
  }
}
