import { Component, OnInit } from '@angular/core';
import { BacklogService } from 'src/app/services/backlog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-backlog',
  templateUrl: './edit-backlog.component.html',
  styleUrls: ['./edit-backlog.component.scss']
})
export class EditBacklogComponent implements OnInit {
  modalInput;
  backlogId;
  selectedUserId = '';
  users: Observable<{}>;
  constructor(
    private backlogService: BacklogService,
    private activeModal: NgbActiveModal
  ) { }
  backlog = {
    name: '',
    project: undefined
  };
  ngOnInit() {
    this.backlogId = this.modalInput['id'];
  }

  onSubmit() {
    this.activeModal.close();
  }
}
