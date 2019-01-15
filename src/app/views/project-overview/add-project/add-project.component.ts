import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { TimeService } from 'src/app/services/time.service';
import { Observable } from 'rxjs';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, private projectService: ProjectService,
    private referenceService: ReferenceService, private ts: TimeService, private sprintService: SprintService) { }
  project = {
    name: 'Name',
    description: 'Beschreibung',
    default_sprint_time: '7 days'
  };
  user = {
    working_units: 0
  };
  default_times: Observable<{}>;
  ngOnInit() {
    this.default_times = this.ts.getDefaultSprintTimes();
  }

  onSubmit() {
    this.projectService.addNewProject(this.project, this.user.working_units).then(
      ref => {
        console.log('addSprint');
        this.sprintService.addFirstSprint(ref);
      }
    );
    this.activeModal.close();
  }

}
