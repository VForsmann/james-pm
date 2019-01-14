import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.scss']
})
export class AddSprintComponent implements OnInit {
  sprint = {
    project: '',
    start_date: new Date()
  };
  constructor(public activeModal: NgbActiveModal, private sprintService: SprintService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.activeModal.close();
  }

}
