import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() status: string;
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() expenditure: number;
  @Input() user: User;
  @Input() userstory;
  @Input() epic: boolean;
  @Input() sprint: boolean;

  constructor() { }

  ngOnInit() {
  }

}
