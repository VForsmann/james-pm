import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(private db: AngularFirestore, private authService: AuthService) { }

  async getCreatorReference() {
    let result: firebase.firestore.DocumentReference;
    await this.authService.getLoggedInUser().pipe(first()).toPromise().then((res) => {
      result = this.db.collection('user').doc(res.uid).ref;
    });
    return result;
  }

  getUserReference(userId) {
    return this.db.collection('user').doc(userId).ref;
  }

  getBacklogReference(backlogId) {
    return this.db.collection('backlogs').doc(backlogId).ref;
  }
}
