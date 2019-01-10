import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserstoryService } from 'src/app/services/userstory.service';
import { StateService } from 'src/app/services/state.service';
import { AddUserstoryComponent } from './add-userstory/add-userstory.component';
import { AddBacklogComponent } from '../backlog/add-backlog/add-backlog.component';

@Component({
  selector: 'app-userstory',
  templateUrl: './userstory.component.html',
  styleUrls: ['./userstory.component.scss']
})
export class UserstoryComponent implements OnInit {
  userStorys: Observable<any>;
  projectId: string;
  addUserstoryComponent = AddUserstoryComponent;
  addBacklogComponent = AddBacklogComponent;

  constructor(
    private userStoryService: UserstoryService,
    private stateService: StateService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(this.projectId);
    this.userStorys = this.userStoryService.getUserstorysFromProjectId(this.projectId);
  }

}
