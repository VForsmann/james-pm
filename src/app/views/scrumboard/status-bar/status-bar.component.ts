import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  @Input() name;
  @Input() id;

  title: string;
  constructor() { }

  ngOnInit() {}

  onDrop(e: any) {
    // Nur zum testen, nicht aufregen (Ändert den Status von dem Task) name => Status bzw. name vom Balken
    // e => Task den man bewegt
    // e.dragData.status = this.name;
  }
}
