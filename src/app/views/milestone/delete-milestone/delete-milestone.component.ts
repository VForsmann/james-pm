import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MilestoneService } from 'src/app/services/milestone.service';
import { MilestoneFirebase } from 'src/app/model/milestone';

@Component({
  selector: 'app-delete-milestone',
  templateUrl: './delete-milestone.component.html',
  styleUrls: ['./delete-milestone.component.scss']
})
export class DeleteMilestoneComponent implements OnInit {
  @Input() modalInput: MilestoneFirebase;

  constructor(
    public activeModal: NgbActiveModal,
    private milestoneService: MilestoneService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.milestoneService.deleteMilestone(this.modalInput.id);
    this.activeModal.close();
  }
}
