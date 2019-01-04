import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  @Input() name = '';
  @Input() tasks;
  constructor() { }
  ngOnInit() { }


  onDrop(e: any) {
    // Nur zum testen, nicht aufregen (Ändert den Status von dem Task) name => Status bzw. name vom Balken
    // e => Task den man bewegt
    e.dragData.status = this.name;
  }
}
