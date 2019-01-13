import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { BacklogService } from 'src/app/services/backlog.service';

@Component({
  selector: 'app-planning-poker',
  templateUrl: './planning-poker.component.html',
  styleUrls: ['./planning-poker.component.scss']
})
export class PlanningPokerComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private backlogService: BacklogService
  ) {}
  projectId: string;
  scrummaster = false;
  product_owner = false;
  developer = false;
  project;
  backlogs;
  storyPoints = 0;
  spCounter = 0;

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.backlogs = this.backlogService.getSelectedBacklogs(this.projectId);
    this.projectService.getRoleForProjectId(this.projectId).subscribe(role => {
      switch (role) {
        case 'scrum master': {
          this.scrummaster = true;
          this.developer = false;
          this.product_owner = false;
          break;
        }
        case 'product owner': {
          this.product_owner = true;
          this.developer = false;
          this.scrummaster = false;
          break;
        }
        case 'developer': {
          this.developer = true;
          this.scrummaster = false;
          this.product_owner = false;
        }
      }
    });
  }

  endPoker() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    const sub = this.projectService
      .getProjectForId(this.projectId)
      .subscribe(pro => {
        this.project = pro;
        this.project['id'] = this.projectId;
        this.project['pokering'] = false;
        this.projectService.updateProject(this.project);
        sub.unsubscribe();
      });
    this.router.navigate(['/dashboard', this.projectId, 'sprint-planning']);
  }

  increase(backlog) {
    this.spCounter = this.spCounter + 1;
    this.storyPoints = this.fibonacci(this.spCounter);
    this.update(backlog);
  }

  decrease(backlog) {
    if (this.spCounter >= 1) {
      this.spCounter = this.spCounter - 1;
      this.storyPoints = this.fibonacci(this.spCounter);
    }
    if (this.spCounter === 0) {
      this.storyPoints = 0;
    }
    this.update(backlog);
  }

  update(backlog) {
    
  }

  fibonacci(num) {
    let a = 1,
      b = 0,
      temp;

    while (num >= 0) {
      temp = a;
      a = a + b;
      b = temp;
      num--;
    }

    return b;
  }
}
