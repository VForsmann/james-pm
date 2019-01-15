import { Component, OnInit, Input } from '@angular/core';
import { BacklogService } from 'src/app/services/backlog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-backlog',
  templateUrl: './delete-backlog.component.html',
  styleUrls: ['./delete-backlog.component.scss']
})
export class DeleteBacklogComponent implements OnInit {
  modalInput;
  constructor(
    private backlogService: BacklogService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  onSubmit() {
    // console.log(this.modalInput);
    this.backlogService.deleteBacklogAndUserstory(this.modalInput['id']);
    this.activeModal.close();
  }
}
