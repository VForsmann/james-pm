import { Injectable } from '@angular/core';
import { Me } from './user/me';
import { UserService } from './user/user.service';
import { ProjectService } from './project/project.service';
import { Observable } from 'rxjs';
import { TaskService } from './task/task.service';
import { Router } from '@angular/router';

@Injectable()
export class Model {
  me: Me;
  loading: boolean;

  constructor(
    public userService: UserService,
    public projectService: ProjectService,
    public taskService: TaskService,
    public router: Router
  ) {
    this.me = new Me(this, router);
    this.loading = false;
  }
}
