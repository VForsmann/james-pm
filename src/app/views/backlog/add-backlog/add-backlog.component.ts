import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BacklogService } from 'src/app/services/backlog.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { Observable } from 'rxjs';
import { AddUserstoryComponent } from '../../userstory/add-userstory/add-userstory.component';

@Component({
  selector: 'app-add-backlog',
  templateUrl: './add-backlog.component.html',
  styleUrls: ['./add-backlog.component.scss']
})
export class AddBacklogComponent implements OnInit {
  modalInput;
  backlog = {
    name: '',
    description: '',
    type: '',
    priority: 0,
    project: null
  };
  types: Observable<{}>;
  @ViewChild(AddUserstoryComponent) addUserstory: AddUserstoryComponent;

  constructor(
    public activeModal: NgbActiveModal,
    private backlogService: BacklogService,
    private referenceService: ReferenceService,
  ) {}

  ngOnInit() {
    this.backlog.project = this.referenceService.getProjectReference(
      this.modalInput
    );
    this.types = this.backlogService.getTypes();
  }

  onSubmit() {
    this.backlogService.addNewBacklog(this.backlog).then(res => {
      if (this.backlog.type === 'Feature') {
        this.addUserstory.userstory.name = this.backlog.name;
        this.addUserstory.userstory.description = this.backlog.description;
        this.addUserstory.onSubmit(res);
      }
      this.activeModal.close();
    });
  }

}
