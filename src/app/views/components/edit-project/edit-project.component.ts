import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Model } from 'src/app/model/model';
import { Project } from 'src/app/model/project/project';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { ProjectService } from 'src/app/model/project/project.service';
import { UserService } from 'src/app/model/user/user.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  @Input() modalInput;
  project;
  editor = '';
  constructor(public activeModal: NgbActiveModal, public model: Model,
    private router: Router, private projectService: ProjectService, private userService: UserService) {
      this.project = new Project(model, router);
  }

  ngOnInit() {
    this.project = this.modalInput;
  }

  async onSubmit() {
  }
}
