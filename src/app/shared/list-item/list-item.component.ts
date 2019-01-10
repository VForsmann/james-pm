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
  @Input() payload;
  @Input() backlog: string;
  @Input() draggable: boolean; // wird noch nicht benutzt (muss irgendwie mit ngIf eingebaut werden)

  faTrash = faTrash;
  faEdit = faEdit;
  faUserPlus = faUserPlus;
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
