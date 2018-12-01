import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

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

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  onSubmit() {
    this.afAuth.auth.signInWithEmailAndPassword(this.auth.email, this.auth.password)
    .then()
    .catch(err => this.errorMessage = err.message);
  }
}
