import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(private af: AngularFireAuth, private db: AngularFirestore, private authService: AuthService) { }

  getCreatorReference() {
    this.af.authState.subscribe(auth => {
      return this.db.collection('user').doc(auth.uid).ref;
    });
  }

  getUserReference(userId) {
    return this.db.collection('user').doc(userId).ref;
  }

  getBacklogReference(backlogId) {
    return this.db.collection('backlogs').doc(backlogId).ref;
  }
}
