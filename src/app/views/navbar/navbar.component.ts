import { Component, OnInit } from '@angular/core';
import { SignInComponent } from '../home/sign-in/sign-in.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  signInComponent = SignInComponent;
  isNavbarCollapsed = true;
  constructor() { }

  ngOnInit() {
  }

}
