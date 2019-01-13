import { Component, OnInit } from '@angular/core';
import { BacklogService } from 'src/app/services/backlog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddBacklogComponent } from './add-backlog/add-backlog.component';
import { EditBacklogComponent } from './edit-backlog/edit-backlog.component';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  backlogs: Observable<{}>;
  addBacklogComponent = AddBacklogComponent;
  editBacklogComponent = EditBacklogComponent;
  projectId: string;

  constructor(
    private backlogService: BacklogService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService
    ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(this.projectId);
    this.backlogs = this.backlogService.getBacklogs(this.projectId);
  }

  navigate = (backlog) => {
    this.router.navigate(['/dashboard', this.projectId, 'backlog', backlog.id]);
  }

}
