import { Component, OnInit, OnDestroy } from '@angular/core';
import { MilestoneService } from 'src/app/services/milestone.service';
import { Observable, Subscription } from 'rxjs';
import { MilestoneFirebase } from 'src/app/model/milestone';
import { AddMilestoneComponent } from '../milestone/add-milestone/add-milestone.component';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { StateService } from 'src/app/services/state.service';
import { ActivatedRoute } from '@angular/router';
import { DeleteMilestoneComponent } from '../milestone/delete-milestone/delete-milestone.component';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit, OnDestroy {
  milestones: Observable<MilestoneFirebase[]>;
  addMilestoneComponent = AddMilestoneComponent;
  deleteMilestoneComponent = DeleteMilestoneComponent;

  faEdit = faEdit;
  faTrash = faTrash;

  canDeleteSubscription: Subscription;
  canDelete: boolean = false;

  constructor(
    private milestoneService: MilestoneService,
    private stateService: StateService,
    private route: ActivatedRoute, 
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.stateService.setProjectId(projectId);
    this.milestones = this.milestoneService.getMilestones();
    this.canDeleteSubscription = this.projectService.getRoleForProjectId(projectId)
    .subscribe(role => {
      if(role !== 'developer'){this.canDelete = true;}
    })
  }

  ngOnDestroy() {
    this.canDeleteSubscription.unsubscribe();
  }
}
