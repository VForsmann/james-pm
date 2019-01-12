import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-task',
  templateUrl: './confirm-task.component.html',
  styleUrls: ['./confirm-task.component.scss']
})
export class ConfirmTaskComponent implements OnInit {
  modalInput;
  constructor(
    private taskService: TaskService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  onConfirm() {
    const task = this.modalInput;
    if (!task['user']) {
      task['status'] = 'To Do';
      this.taskService.addUserToTask(task).then(res => {
        console.log('Developer wurde dem Projekt hinzugefügt');
      });
    } else {
      console.log('Besitzt schon einen Developer');
    }
    this.activeModal.close();
  }

  onClose() {
    this.activeModal.close();
  }
}
