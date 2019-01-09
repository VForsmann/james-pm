import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusesService {

  constructor(private db: AngularFirestore) { }

  getTaskStatuses() {
    return this.db.collection('task_statuses', ref => ref.orderBy('order'))
    .snapshotChanges();
  }
}
