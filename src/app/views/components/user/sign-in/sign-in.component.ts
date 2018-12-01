import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  auth = {
    email: '',
    password: ''
  };
  errorMessage = '';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.auth.email, this.auth.password)
    .then(() => console.log('Navigate'))
    .catch(err => this.errorMessage = err.message);
  }
}
