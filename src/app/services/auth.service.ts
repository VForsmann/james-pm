import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User;

  constructor(private af: AngularFireAuth, private router: Router) {
    af.authState.subscribe(auth => {
      this.user = auth;
    });
  }

  isAuthenticated() {
    return this.user != null;
  }

  getLoggedInUser() {
    return this.user;
  }

  login(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, password)
    .then((authState) => {
        this.user = authState.user;
    });
  }

  logout() {
    this.af.auth.signOut();
    this.router.navigate(['/']);
  }
}
