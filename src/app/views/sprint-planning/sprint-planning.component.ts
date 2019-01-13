import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { StateService } from 'src/app/services/state.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sprint-planning',
  templateUrl: './sprint-planning.component.html',
  styleUrls: ['./sprint-planning.component.scss']
})
export class SprintPlanningComponent implements OnInit {

  constructor(private projectService: ProjectService, private stateService: StateService, private route: ActivatedRoute) { }
  role: string;
  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(projectId);
    this.stateService.getProjectId().subscribe(id => {
      this.projectService.getRoleForProjectId(id).subscribe(role => {
        this.role = role;
      });
    });
  }

}
