import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean;
  user: Observable<firebase.User>;

  constructor(private af: AngularFireAuth, private router: Router) {
    af.authState.subscribe(auth => {
      this.isAuthenticated = true;
    });
    this.user = this.af.authState;
  }

  getLoggedInUser() {
    return this.af.authState;
  }

  login(email: string, password: string) {
      const result = this.af.auth.signInWithEmailAndPassword(email, password);
      return result;
  }

  signUp(email: string, password: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, password)
    .then((authState) => {
        this.user = this.af.authState;
    });
  }

  logout() {
    this.af.auth.signOut();
    this.router.navigate(['/']);
  }
}
