import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signUpComponent = SignUpComponent;
  auth = {
    email: '',
    password: ''
  };
  errorMessage = '';

  constructor(public authService: AuthService, private router: Router, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.auth.email, this.auth.password)
    .then(() => {
      this.router.navigate(['projects']);
    })
    .catch(err => this.errorMessage = err.message);
  }
}
