import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/model/user/user.service';

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

  constructor(public afAuth: AngularFireAuth, public router: Router, public userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.afAuth.auth.signInWithEmailAndPassword(this.auth.email, this.auth.password)
    .then(res => {
      this.userService.isAuthenticated = true;
      this.router.navigate(['projectOverview']);
    })
    .catch(err => this.errorMessage = err.message);
  }
}
