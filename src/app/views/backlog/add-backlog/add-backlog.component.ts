import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BacklogService } from 'src/app/services/backlog.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-add-backlog',
  templateUrl: './add-backlog.component.html',
  styleUrls: ['./add-backlog.component.scss']
})
export class AddBacklogComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private backlogService: BacklogService,
    private referenceService: ReferenceService,
    private route: ActivatedRoute,
    private stateService: StateService
    ) { }
  backlog = {
    name: '',
    project: undefined
  };
  ngOnInit() {
    this.stateService.getProjectId().subscribe(id => {
      this.backlog.project = this.referenceService.getProjectReference(id);
    });
  }

  onSubmit() {
    this.backlogService.addNewBacklog(this.backlog);
    this.activeModal.close();
  }

}
