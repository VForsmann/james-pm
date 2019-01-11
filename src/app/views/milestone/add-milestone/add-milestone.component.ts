import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrls: ['./add-milestone.component.scss']
})
export class AddMilestoneComponent implements OnInit {

  name: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSubmit(){
    this.activeModal.close();
  }

}
