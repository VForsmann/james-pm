import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserstoryService } from 'src/app/services/userstory.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-userstory',
  templateUrl: './userstory.component.html',
  styleUrls: ['./userstory.component.scss']
})
export class UserstoryComponent implements OnInit {
  userStorys: Observable<any>;

  constructor(
    private userStoryService: UserstoryService,
    private route: ActivatedRoute,
    private stateService: StateService
    ) { }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.userStorys = this.userStoryService.getUserstorysFromProjectId(projectId);
  }

}
