import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  project: Observable<{}>;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.project = this.projectService.getProjectForId(projectId);
  }

  navigateBacklogs() {
    console.log('test');
  }

  navigateSprints() {

  }

  navigateUserStorys() {

  }
}
