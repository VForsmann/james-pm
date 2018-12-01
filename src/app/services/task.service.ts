import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private db: AngularFirestore) { }
  selectedTasks;
  getTasks() {
    // Man muss zuerst die Documentreference holen um nach der Referenz zu selektieren
    const backlogRef = this.db.collection('backlogs').doc('Jbhi2Z7NmyIZ4fNRCkRW').ref;
    // Aktuell noch hardcoded, bis das irgendwie mit dem authuser eventuell funktioniert.
    return this.db.collection('tasks', ref => ref
    .where('backlog', '==', backlogRef)).snapshotChanges();
  }

  updateTask(task) {
    const taskDoc = this.db.collection('tasks').doc(task);
    // Aktuell noch hardcoded, bis das irgendwie mit dem authuser eventuell funktioniert.
    // const user = this.db.collection('').doc('gApsvyNMc8zP3KtC6MNr').ref;
  }
}
