import { Component, OnInit} from '@angular/core';
import { MilestoneService } from 'src/app/services/milestone.service';
import { Observable } from 'rxjs';
import { MilestoneFirebase } from 'src/app/model/milestone';
import { AddMilestoneComponent } from '../milestone/add-milestone/add-milestone.component';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit{

  milestones: Observable<MilestoneFirebase[]>;
  addMilestoneComponent = AddMilestoneComponent;

  constructor(private milestoneService: MilestoneService) {}

  ngOnInit() {
    this.milestones = this.milestoneService.getMilestones();
  }
}
