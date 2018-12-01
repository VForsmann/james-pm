import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Me } from '../../../../model/user/me';
import { Model } from 'src/app/model/model';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task/task';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Input()
  modalInput;
  userService = this.model.userService;
  user: Me;

  task: Task;

  errorMessage = '';

  constructor(
    public activeModal: NgbActiveModal,
    public model: Model,
    public router: Router
    ) {
    this.user = new Me(this.model, router);
  }

  ngOnInit() {}

  async onSubmit() {
    await this.user.create(user => {
      user.setUserData({
        fields: {
          Firstname: this.user.firstname,
          Lastname: this.user.lastname,
          Email: this.user.email,
          Password: this.user.password
        }
      });
    })
    .catch(error => console.warn(error));
    this.activeModal.close();
    await this.user.login(this.user.email, this.user.password);
  }
}
