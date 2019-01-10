import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BacklogService } from 'src/app/services/backlog.service';
import { ReferenceService } from 'src/app/services/reference.service';

@Component({
  selector: 'app-add-backlog',
  templateUrl: './add-backlog.component.html',
  styleUrls: ['./add-backlog.component.scss']
})
export class AddBacklogComponent implements OnInit {
  modalInput;
  backlog = {
    name: '',
    project: undefined
  };

  constructor(
    public activeModal: NgbActiveModal,
    private backlogService: BacklogService,
    private referenceService: ReferenceService
    ) { }

  ngOnInit() {
    this.backlog.project = this.referenceService.getProjectReference(this.modalInput);
  }

  onSubmit() {
    this.backlogService.addNewBacklog(this.backlog);
    this.activeModal.close();
  }

}
