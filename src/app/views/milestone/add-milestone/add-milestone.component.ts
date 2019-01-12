import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MilestoneAngular } from 'src/app/model/milestone-angular';
import { MilestoneService } from 'src/app/services/milestone.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrls: ['./add-milestone.component.scss']
})
export class AddMilestoneComponent implements OnInit {

  milestone: MilestoneAngular = {
    name: '',
    description: '',
    done: new Date()
  }

  constructor(public activeModal: NgbActiveModal, private milestoneService: MilestoneService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.activeModal.close();
  }

}
