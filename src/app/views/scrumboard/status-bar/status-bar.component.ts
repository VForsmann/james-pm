import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmTaskComponent } from '../confirm-task/confirm-task.component';
import { Observable } from 'rxjs';
import { ReferenceService } from 'src/app/services/reference.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  confirmTaskComponent = ConfirmTaskComponent;
  @Input() name;
  @Input() id;
  @Input() tasks = [];
  projectId;
  nameRef;
  count = 0;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private referenceService: ReferenceService
  ) {}

  ngOnInit() {
    this.nameRef = this.referenceService.taskStatusReference(this.id);
    this.projectId = this.route.snapshot.paramMap.get('id');
  }

  onDrop(e: any) {
    // Nur zum testen, nicht aufregen (Ändert den Status von dem Task) name => Status bzw. name vom Balken
    // e => Task den man bewegt
    if (e.dragData.status !== this.name) {
      e.dragData.status = this.name;
      this.taskService.updateTask(e.dragData);
    }
  }
}
