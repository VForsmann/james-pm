import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private db: AngularFirestore,
    private referenceService: ReferenceService
  ) {}
  selectedTasks;
  getTasks() {
    // Man muss zuerst die Documentreference holen um nach der Referenz zu selektieren
    const backlogRef = this.referenceService.getBacklogReference(
      'Jbhi2Z7NmyIZ4fNRCkRW'
    );
    return this.db
      .collection('tasks', ref => ref.where('backlog', '==', backlogRef))
      .snapshotChanges();
  }

  updateTask(task) {
    const taskDoc = this.db.collection('tasks').doc(task);
    // Aktuell noch hardcoded, bis das irgendwie mit dem authuser eventuell funktioniert.
    // const user = this.db.collection('').doc('gApsvyNMc8zP3KtC6MNr').ref;
  }

  getAllTasks(projectId) {
    const projectRef = this.referenceService.getProjectReference(projectId);
    return Observable.create(observer => {
      this.db
        .collection('tasks', ref => ref.where('project', '==', projectRef))
        .snapshotChanges()
        .subscribe(tasks_data => {
          const tasks_list = [];
          tasks_data.map(actions => {
            const taskId = actions.payload.doc.id;
            const subs = this.getTaskWithId(taskId).subscribe(task_data => {
              let update_task = tasks_list.map(t => t.id);
                console.log('wtf');
                if (tasks_data) {
                  task_data['id'] = taskId;
                  if (update_task.indexOf(taskId) !== -1) {
                    tasks_list[tasks_list.indexOf(taskId)] = task_data;
                  } else if (task_data['backlog'] === undefined) {
                    tasks_list.push(task_data);
                  }
                } else {
                  tasks_list.splice(update_task.indexOf(taskId), 1);
                }
                observer.next(tasks_list);
                update_task = [];
            });
          });
        });
    });
  }

  getTasksForBacklog(backlogId) {
    const backlogRef = this.referenceService.getBacklogReference(backlogId);
    return Observable.create(observer => {
      const tasks = this.db
        .collection('tasks', ref => ref.where('backlog', '==', backlogRef))
        .snapshotChanges()
        .subscribe(tasks_data => {
          const tasks_list = [];
          tasks_data.map(actions => {
            const taskId = actions.payload.doc.id;
            const task = this.getTaskWithId(taskId).subscribe(task_data => {
              const update_task = tasks_list.map(t => t.id);
              if (tasks_data) {
                task_data['id'] = taskId;
                if (update_task.indexOf(taskId) !== -1) {
                  tasks_list[tasks_list.indexOf(taskId)] = task_data;
                } else {
                  tasks_list.push(task_data);
                }
                task.unsubscribe();
                observer.next(tasks_list);
              }
            });
          });
        });
    });
  }

  getTaskWithId(taskId) {
    const result = this.db
      .collection('tasks')
      .doc(taskId)
      .valueChanges();
    return result;
  }

  addTaskToBacklog(task, backlogId) {
    task['backlog'] = this.referenceService.getBacklogReference(backlogId);
    console.log(task);
    return this.db
      .collection('tasks')
      .doc(task['id'])
      .update(task);
  }

  removeTaskFromBacklog(task, backlogId) {
    // task['backlog'] = this.referenceService.getBacklogReference(backlogId);
    // console.log(task);
    // return this.db
    //   .collection('tasks')
    //   .doc(task['id']).update({
    //     backlog: firebase.firestore.FieldValue.delete();
    // });
  }
}
