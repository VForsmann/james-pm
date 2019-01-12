import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { StateService } from 'src/app/services/state.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmTaskComponent } from '../confirm-task/confirm-task.component';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  confirmTaskComponent = ConfirmTaskComponent;
  @Input() name;
  @Input() id;
  projectId;
  tasks = [
    { name: 'Test', description: 'Test', status: 'To Do' },
    { name: 'Test 2', description: 'Test 2', status: 'Done' }
  ];

  count = 0;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.tasks = this.taskService.getAllTasks(this.projectId);
  }

  onDrop(e: any) {
    // Nur zum testen, nicht aufregen (Ändert den Status von dem Task) name => Status bzw. name vom Balken
    // e => Task den man bewegt
    if (e.dragData.status !== this.name) {
      // e.dragData.status = this.name;
      this.taskService.updateTask(e.dragData, this.name);
    }
  }
}
