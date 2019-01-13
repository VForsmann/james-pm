import { Component, OnInit } from '@angular/core';
import { BacklogService } from 'src/app/services/backlog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddBacklogComponent } from './add-backlog/add-backlog.component';
import { EditBacklogComponent } from './edit-backlog/edit-backlog.component';
import { StateService } from 'src/app/services/state.service';
import { DeleteBacklogComponent } from './delete-backlog/delete-backlog.component';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  backlogs: Observable<{}>;
  addBacklogComponent = AddBacklogComponent;
  editBacklogComponent = EditBacklogComponent;
  deleteBacklogComponent = DeleteBacklogComponent;
  projectId: string;
  role;
  constructor(
    private backlogService: BacklogService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private projectService: ProjectService
    ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(this.projectId);
    this.projectService.getRoleForProjectId(this.projectId).subscribe(role => {
      this.role = role;
      console.log(role);
    });
    this.backlogs = this.backlogService.getBacklogs(this.projectId);
  }

  navigate = (backlog) => {
    this.router.navigate(['/dashboard', this.projectId, 'backlog', backlog.id]);
  }
}
