import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../../model/project/project';
import { Model } from 'src/app/model/model';
import { Router } from '@angular/router';
import { EditProjectComponent } from '../../edit-project/edit-project.component';

@Component({
  selector: 'app-list-entry',
  templateUrl: './list-entry.component.html',
  styleUrls: ['./list-entry.component.scss']
})
export class ListEntryComponent implements OnInit {
  editProjectComponent = EditProjectComponent;
  @Input() project: Project;
  constructor(private model: Model, private router: Router) {
   }

  ngOnInit() { }

  onProjectClicked() {
    this.model.me.selectedProject = this.project;
    this.router.navigate(['dashboard']);
  }

  onUpdateProjectClicked() {
    console.log(this.project);
    // this.router.navigate(['dashboard']);
  }

}
