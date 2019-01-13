import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from 'src/app/services/state.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { BacklogService } from 'src/app/services/backlog.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  modalInput;
  task = {
    name: '',
    description: '',
    backlog: undefined,
    project: undefined
  };
  backlogs;
  constructor(
    private taskService: TaskService,
    private activeModal: NgbActiveModal,
    private referenceService: ReferenceService,
    private backlogService: BacklogService
    ) { }

  ngOnInit() {
    this.task.project = this.referenceService.getProjectReference(this.modalInput);
    this.backlogs = this.backlogService.getBacklogs(this.modalInput);
  }

  onSubmit() {
    this.taskService.addNewTask(this.task);
    this.activeModal.close();
  }

}
