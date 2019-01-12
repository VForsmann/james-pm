import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MilestoneAngular } from 'src/app/model/milestone';
import { MilestoneService } from 'src/app/services/milestone.service';
import { DatepickerComponent } from 'src/app/shared/datepicker/datepicker.component';
import { firestore } from 'firebase';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrls: ['./add-milestone.component.scss']
})
export class AddMilestoneComponent implements OnInit {
  @ViewChild('Datepicker')
  datepicker: DatepickerComponent;
  milestone: MilestoneAngular = {
    name: '',
    description: '',
    done: new Date()
  }

  constructor(public activeModal: NgbActiveModal, private milestoneService: MilestoneService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.milestoneService.addMilestone({
      name: this.milestone.name,
      description: this.milestone.description,
      done: firestore.Timestamp.fromDate(this.milestone.done)
    })
    this.activeModal.close();
  }

  datepicked(datepickerDate: NgbDateStruct){
    this.milestone.done = new Date(datepickerDate.year, datepickerDate.month - 1, datepickerDate.day);
  }
}
