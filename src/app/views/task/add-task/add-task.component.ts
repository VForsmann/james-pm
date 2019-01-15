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
  modalInput: { projectId: string, backlogId: string };
  task = {
    name: '',
    description: '',
    backlog: undefined,
    project: undefined
  };
  backlogs;
  constructor(
    private taskService: TaskService,
    public activeModal: NgbActiveModal,
    private referenceService: ReferenceService,
    private backlogService: BacklogService
    ) { }

  ngOnInit() {
    console.log(this.modalInput);
    if (this.modalInput.backlogId) {
      this.task.backlog = this.modalInput.backlogId;
    }
    this.task.project = this.referenceService.getProjectReference(this.modalInput.projectId);
    this.backlogs = this.backlogService.getBacklogsForSprint(this.modalInput.projectId);
  }

  onSubmit() {
    this.task.backlog = this.referenceService.getBacklogReference(this.task.backlog);
    this.taskService.addNewTask(this.task);
    this.activeModal.close();
  }

}
