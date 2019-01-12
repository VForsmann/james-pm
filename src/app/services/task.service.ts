import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  selectedTasks;

  constructor(
    private db: AngularFirestore,
    private referenceService: ReferenceService
  ) {}

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
    this.db.collection('task_statuses').snapshotChanges().subscribe(res => {
      res.map(obj => {
        if (task.status === obj.payload.doc.data()['status']) {
          task.status = obj.payload.doc.ref;
        }
      });
      this.db
      .collection('tasks')
      .doc(task['id'])
      .update(task);
    });
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
              this.referenceService
                .taskStatusReference(task_data['status'].id)
                .get()
                .then(status => {
                  let update_task = tasks_list.map(t => t.id);
                  if (tasks_data) {
                    task_data['id'] = taskId;
                    task_data['status'] = status.data().status;
                    if (update_task.indexOf(taskId) !== -1) {
                      tasks_list[tasks_list.indexOf(taskId)] = task_data;
                    } else {
                      tasks_list.push(task_data);
                    }
                  } else {
                    tasks_list.splice(update_task.indexOf(taskId), 1);
                  }
                  update_task = [];
                  observer.next(tasks_list);
                });
            });
          });
        });
    });
  }

  getAllTasksWithoutBacklog(projectId) {
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
              let update_task = tasks_list.map(t => t.id);
              if (tasks_data) {
                task_data['id'] = taskId;
                if (update_task.indexOf(taskId) !== -1) {
                  tasks_list[tasks_list.indexOf(taskId)] = task_data;
                } else {
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

  getTaskWithId(taskId) {
    const result = this.db
      .collection('tasks')
      .doc(taskId)
      .valueChanges();
    return result;
  }


  addTaskToBacklog(task, backlogId) {
    task['backlog'] = this.referenceService.getBacklogReference(backlogId);
    const taskId = task['id'];
    delete task['id'];
    return this.db
      .collection('tasks')
      .doc(taskId)
      .update(task);
  }

  // War noch von allgmeinen task erstellen
  addNewTask(task) {
    this.db
      .collection('task_statuses', ref => ref.where('order', '==', 1))
      .snapshotChanges()
      .subscribe(status_data => {
        status_data.map(actions => {
          task['status'] = this.db
            .collection('task_statuses')
            .doc(actions.payload.doc.id).ref;
        });
        return this.db.collection('tasks').add(task);
      });
  }
}
