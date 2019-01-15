import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { ActivatedRoute } from '@angular/router';
import { BacklogService } from 'src/app/services/backlog.service';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.scss']
})
export class BurndownComponent implements OnInit {
  projectId;
  constructor(
    private stateService: StateService,
    private route: ActivatedRoute,
    private backlogService: BacklogService
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(this.projectId);
    this.backlogService.getFinishedBacklogs(this.projectId).subscribe(res => {
      console.log(res);
    });
  }
}
