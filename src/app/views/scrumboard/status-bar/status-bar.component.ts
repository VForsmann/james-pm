import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  @Input() name;
  @Input() id;

  tasks = [
    {name: 'Test', description: 'Test', status: 'To Do'},
    {name: 'Test 2', description: 'Test 2', status: 'Done'}
  ];

  count = 0;

  constructor(private taskService: TaskService, private stateService: StateService) { }

  ngOnInit() {
    const projectId = this.stateService.getProjectId().value;
  }

  onDrop(e: any) {
    // Nur zum testen, nicht aufregen (Ändert den Status von dem Task) name => Status bzw. name vom Balken
    // e => Task den man bewegt
    // e.dragData.status = this.name;
  }
}
