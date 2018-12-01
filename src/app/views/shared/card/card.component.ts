import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() image: string;
  @Input() title: string;
  @Input() text: string;
  @Input() start: string;
  @Input() end: string;
  @Input() amount: string;
  @Input() color = 'bg-warning';
  @Input() component: Component;

  constructor() { }

  ngOnInit() {
  }

}
