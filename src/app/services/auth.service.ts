import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private af: AngularFireAuth, private router: Router) {
    this.user = this.af.authState;
  }

  getLoggedInUser() {
    return this.af.authState;
  }

  getAuthState(): Observable<boolean> {
    return Observable.create(observer => {
      this.af.authState.subscribe(auth => {
        if (auth && auth.uid) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      });
    });
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
