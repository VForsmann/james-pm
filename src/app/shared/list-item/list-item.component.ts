import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user';
import { faTrash, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';

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
  @Input() delete: Component;
  @Input() add: Component;
  @Input() edit: Comment;
  @Input() click: Function;

  faTrash = faTrash;
  faEdit = faEdit;
  faUserPlus = faUserPlus;

  constructor() { }

  ngOnInit() {
  }

  hasButton(): boolean {
    let result = false;
    if (this.add || this.edit || this.delete) {
      result = true;
    }
    return result;
  }

}
