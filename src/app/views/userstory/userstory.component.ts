import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserstoryService } from 'src/app/services/userstory.service';
import { StateService } from 'src/app/services/state.service';
import { AddUserstoryComponent } from './add-userstory/add-userstory.component';
import { AddBacklogComponent } from '../backlog/add-backlog/add-backlog.component';
import { EditUserstoryComponent } from './edit-userstory/edit-userstory.component';
import { DeleteUserstoryComponent } from './delete-userstory/delete-userstory.component';
import { ReferenceService } from 'src/app/services/reference.service';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: 'app-userstory',
  templateUrl: './userstory.component.html',
  styleUrls: ['./userstory.component.scss']
})
export class UserstoryComponent implements OnInit {
  userstorys;
  projectId: string;
  addUserstoryComponent = AddUserstoryComponent;
  editUserstoryComponent = EditUserstoryComponent;
  deleteUserstoryComponent = DeleteUserstoryComponent;
  addBacklogComponent = AddBacklogComponent;

  constructor(
    private userstoryService: UserstoryService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private sprintService: SprintService
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(this.projectId);
    this.userstorys = this.userstoryService.getUserstorysFromProjectId(
      this.projectId
    );
    this.sprintService.getActualSprintFromProject(this.projectId).then(res => {
      if (res) {
        console.log(res);
      }
    });
  }
}
