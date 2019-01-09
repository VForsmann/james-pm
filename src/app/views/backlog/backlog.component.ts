import { Component, OnInit } from '@angular/core';
import { BacklogService } from 'src/app/services/backlog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  constructor(
    private backlogService: BacklogService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.backlogService.getBacklogs(projectId);
  }

}
