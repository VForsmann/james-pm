import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  @Input() name = '';
  task;
  tasks = [
    {
      name: 'JUNGÄÄÄÄ',
      status: 'other'
    },
    {
      name: 'JUNGÄÄÄÄ',
      status: 'analyse'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  onDragLeave(e: any) {
    this.task = e;
    console.log(this.task);
  }
  onDrop(e: any) {
    const index = this.tasks.indexOf(this.task);
    // e.dragData.status = this.name;
    console.log(index);
  }
}
