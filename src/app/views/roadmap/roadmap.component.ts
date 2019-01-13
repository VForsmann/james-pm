import { Component, OnInit } from '@angular/core';
import { MilestoneService } from 'src/app/services/milestone.service';
import { Observable } from 'rxjs';
import { MilestoneFirebase } from 'src/app/model/milestone';
import { AddMilestoneComponent } from '../milestone/add-milestone/add-milestone.component';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { StateService } from 'src/app/services/state.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {
  milestones: Observable<DocumentChangeAction<MilestoneFirebase>[]>;
  addMilestoneComponent = AddMilestoneComponent;

  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    private milestoneService: MilestoneService,
    private stateService: StateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(projectId);
    this.milestones = this.milestoneService.getMilestones();
  }
}
