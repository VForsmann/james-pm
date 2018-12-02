import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private db: AngularFirestore, private referenceService: ReferenceService) { }
  selectedTasks;
  getTasks() {
    // Man muss zuerst die Documentreference holen um nach der Referenz zu selektieren
    const backlogRef = this.referenceService.getBacklogReference('Jbhi2Z7NmyIZ4fNRCkRW');
    return this.db.collection('tasks', ref => ref
    .where('backlog', '==', backlogRef)).snapshotChanges();
  }

  updateTask(task) {
    const taskDoc = this.db.collection('tasks').doc(task);
    // Aktuell noch hardcoded, bis das irgendwie mit dem authuser eventuell funktioniert.
    // const user = this.db.collection('').doc('gApsvyNMc8zP3KtC6MNr').ref;
  }
}
