import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-planning-poker',
  templateUrl: './planning-poker.component.html',
  styleUrls: ['./planning-poker.component.scss']
})
export class PlanningPokerComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}
  projectId: string;
  project;
  ngOnInit() {}

  endPoker() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.projectService.getProjectForId(this.projectId).subscribe(pro => {
      this.project = pro;
      this.project['id'] = this.projectId;
      this.project['pokering'] = false;
      this.projectService.updateProject(this.project);
    });
  }
}
