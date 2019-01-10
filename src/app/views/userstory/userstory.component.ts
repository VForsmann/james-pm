import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserstoryService } from 'src/app/services/userstory.service';
import { StateService } from 'src/app/services/state.service';
import { AddUserstoryComponent } from './add-userstory/add-userstory.component';
import { AddBacklogComponent } from '../backlog/add-backlog/add-backlog.component';
import { EditUserstoryComponent } from './edit-userstory/edit-userstory.component';
import { DeleteUserstoryComponent } from './delete-userstory/delete-userstory.component';

@Component({
  selector: 'app-userstory',
  templateUrl: './userstory.component.html',
  styleUrls: ['./userstory.component.scss']
})
export class UserstoryComponent implements OnInit {
  userstorys: Observable<any>;
  projectId: string;
  addUserstoryComponent = AddUserstoryComponent;
  editUserstoryComponent = EditUserstoryComponent;
  deleteUserstoryComponent = DeleteUserstoryComponent;
  addBacklogComponent = AddBacklogComponent;

  constructor(
    private userstoryService: UserstoryService,
    private stateService: StateService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(this.projectId);
    this.userstorys = this.userstoryService.getUserstorysFromProjectId(this.projectId);
  }

}
