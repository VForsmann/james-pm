import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';
import { faTrash, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AddMemberComponent } from '../add-member/add-member.component';

@Component({
  selector: 'app-list-entry',
  templateUrl: './list-entry.component.html',
  styleUrls: ['./list-entry.component.scss']
})
export class ListEntryComponent implements OnInit {
  @Input() project;

  faTrash = faTrash;
  faEdit = faEdit;
  faUserPlus = faUserPlus;

  constructor(private router: Router, private projectService: ProjectService) {
   }

  editProjectComponent = EditProjectComponent;
  deleteProjectComponent = DeleteProjectComponent;
  addMemberComponent = AddMemberComponent;

  ngOnInit() { }

  onProjectClicked(event) {
    this.router.navigate(['dashboard', this.project.id]);
  }

  onUpdateProjectClicked() {}
}
