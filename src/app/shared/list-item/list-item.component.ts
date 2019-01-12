import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Userstory } from 'src/app/model/userstory';

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
  @Input() userstory: Userstory;
  @Input() epic: boolean;
  @Input() sprint: boolean;
  @Input() delete: Component;
  @Input() add: Component;
  @Input() edit: Comment;
  @Input() click: Function;
  @Input() addPayload;
  @Input() editPayload;
  @Input() deletePayload;
  @Input() clickPayload;
  @Input() backlog: string;
  @Input() backlogType: string;
  @Input() priority: string;

  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;
  hasBacklog = false;

  constructor() { }

  ngOnInit() {
    if (this.backlog) {
      this.hasBacklog = true;
    }
  }

  hasButton(): boolean {
    let result = false;
    if (this.add || this.edit || this.delete) {
      result = true;
    }
    return result;
  }

}
