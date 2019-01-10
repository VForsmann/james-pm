import { Component, OnInit} from '@angular/core';
import { MilestoneService } from 'src/app/services/milestone.service';
import { Subscription, Observable } from 'rxjs';
import { Milestone } from 'src/app/model/milestone';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit{

  tomorrow = new Date(2017, 9, 20, 14, 34);
  subscription: Subscription;
  milestones: Observable<Milestone[]>;

  constructor(private milestoneService: MilestoneService) {}

  ngOnInit() {
    this.milestones = this.milestoneService.getMilestones();
  }
}
