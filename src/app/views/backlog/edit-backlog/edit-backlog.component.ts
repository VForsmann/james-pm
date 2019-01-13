import { Component, OnInit } from '@angular/core';
import { BacklogService } from 'src/app/services/backlog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-backlog',
  templateUrl: './edit-backlog.component.html',
  styleUrls: ['./edit-backlog.component.scss']
})
export class EditBacklogComponent implements OnInit {
  modalInput;
  backlogId;
  types;
  constructor(
    private backlogService: BacklogService,
    public activeModal: NgbActiveModal
  ) { }

  backlog = {
    name: '',
    description: '',
    priority: ''
  };
  ngOnInit() {
    this.backlogId = this.modalInput['id'];
    this.backlog['id'] = this.backlogId;
    this.backlog.name = this.modalInput['name'];
    this.backlog.description = this.modalInput['description'];
    this.backlog.priority = this.modalInput['priority'];
  }

  onSubmit() {
    this.backlogService.editBacklog(this.backlog);
    this.activeModal.close();
  }
}
