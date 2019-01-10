import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from 'src/app/services/state.service';
import { ReferenceService } from 'src/app/services/reference.service';

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
    project: undefined
  };
  constructor(
    private taskService: TaskService,
    private activeModal: NgbActiveModal,
    private stateService: StateService,
    private referenceService: ReferenceService
    ) { }

  ngOnInit() {
    this.task.project = this.referenceService.getProjectReference(this.modalInput);
  }

  onSubmit() {
    console.log(this.task);
    this.taskService.addNewTask(this.task);
    this.activeModal.close();
  }

}
