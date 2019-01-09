import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TaskStatus } from '../model/taskStatus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusesService {

  constructor(private db: AngularFirestore) { }

  getTaskStatuses(): Observable<TaskStatus[]> {
    return this.db.collection('task_statuses', ref => ref.orderBy('order'))
    .valueChanges() as Observable<TaskStatus[]>;
  }
}
