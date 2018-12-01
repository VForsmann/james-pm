import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-list-entry',
  templateUrl: './list-entry.component.html',
  styleUrls: ['./list-entry.component.scss']
})
export class ListEntryComponent implements OnInit {
  @Input() project;
  constructor(private router: Router, private projectService: ProjectService) {
   }

  ngOnInit() { }

  onProjectClicked() {
    this.projectService.setSelectedProject(this.project);
    this.router.navigate(['dashboard']);
  }

  onUpdateProjectClicked() {
    // this.router.navigate(['dashboard']);
  }

}
