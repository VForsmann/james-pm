import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-entry',
  templateUrl: './list-entry.component.html',
  styleUrls: ['./list-entry.component.scss']
})
export class ListEntryComponent implements OnInit {
  @Input() project;
  constructor(private router: Router) {
   }

  ngOnInit() { }

  onProjectClicked() {
    this.router.navigate(['dashboard']);
  }

  onUpdateProjectClicked() {
    // this.router.navigate(['dashboard']);
  }

}
