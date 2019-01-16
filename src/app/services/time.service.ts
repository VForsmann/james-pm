import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private db: AngularFirestore) { }

  getDefaultSprintTimes() {
    return this.db
    .collection('sprint_default_times')
    .valueChanges();
  }

  getDefaultSprintForProject(projectId) {
    return new Promise(resolve => {
      this.db.collection('projects').doc(projectId).valueChanges().subscribe(res => {
        resolve(res);
      });
    });
  }
}
