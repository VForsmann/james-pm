import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(private db: AngularFirestore, private authService: AuthService) { }

  getCreatorReference() {
    return this.db.collection('user').doc(this.authService.getLoggedInUser().uid).ref;
  }

  getUserReference(userId) {
    return this.db.collection('user').doc(userId).ref;
  }

  getBacklogReference(backlogId) {
    return this.db.collection('backlogs').doc(backlogId).ref;
  }
}
