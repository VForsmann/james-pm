import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-sprint-planning',
  templateUrl: './sprint-planning.component.html',
  styleUrls: ['./sprint-planning.component.scss']
})
export class SprintPlanningComponent implements OnInit {

  constructor(private projectService: ProjectService, private stateService: StateService) { }
  role: string;
  ngOnInit() {
    this.stateService.getProjectId().subscribe(id => {
      console.log(id);
      console.log(this.projectService.getRoleForProjectId(id));
    });
  }

}
