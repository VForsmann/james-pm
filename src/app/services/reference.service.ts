import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { first } from 'rxjs/operators';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(private db: AngularFirestore, private authService: AuthService) { }

  getCreatorReference() {
    let result: firebase.firestore.DocumentReference;
    const obsResult = Observable.create(observer => {
      this.authService.getLoggedInUser().subscribe((res) => {
        if (res && res.uid) {
          result = this.db.collection('user').doc(res.uid).ref;
          observer.next(result);
        }
      });
    });
    return obsResult;
  }

  getUserReference(userId) {
    return this.db.collection('user').doc(userId).ref;
  }

  getBacklogReference(backlogId) {
    return this.db.collection('backlogs').doc(backlogId).ref;
  }

  getProjectReference(projectId) {
    return this.db.collection('projects').doc(projectId).ref;
  }

  getUserstoryReference(userstoryId) {
    return this.db.collection('userstorys').doc(userstoryId).ref;
  }
}
