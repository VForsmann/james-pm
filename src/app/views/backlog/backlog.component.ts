import { Component, OnInit } from '@angular/core';
import { BacklogService } from 'src/app/services/backlog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  backlogs: Observable<{}>;
  constructor(
    private backlogService: BacklogService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.backlogs = this.backlogService.getBacklogs(projectId);
  }

  navigate = (backlog) => {
    this.router.navigate([backlog.id], {relativeTo: this.route});
  }

}
