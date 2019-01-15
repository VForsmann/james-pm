import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
import { Observable } from 'rxjs';
import { TaskStatusesService } from './task-statuses.service';
import { Task } from '../model/task';
import { SprintService } from './sprint.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  selectedTasks;

  constructor(
    private db: AngularFirestore,
    private referenceService: ReferenceService,
    private taskStatusService: TaskStatusesService,
    private sprintService: SprintService
  ) {}

  getTasksForStatus(statusId) {
    // Man muss zuerst die Documentreference holen um nach der Referenz zu selektieren
    const backlogRef = this.referenceService.getBacklogReference(
      'Jbhi2Z7NmyIZ4fNRCkRW'
    );
    return this.db
      .collection('tasks', ref => ref.where('backlog', '==', backlogRef))
      .snapshotChanges();
  }

  updateTask(uptask) {
    const taskId = uptask['id'];
    let finished = true;
    this.db
      .collection('tasks')
      .doc(taskId)
      .update(uptask)
      .then(updated_task => {
        const sub = this.db
          .collection('tasks', ref =>
            ref.where('backlog', '==', uptask['backlog'])
          )
          .valueChanges()
          .subscribe(tasks => {
            tasks.map(task => {
              if (task['status'] !== 'Done') {
                finished = false;
              }
            });
            if (finished) {
              this.db.collection('backlogs').doc(uptask['backlog'].id).update({finished: Date.now() / 1000});
              sub.unsubscribe();
            } else {
              this.db.collection('backlogs').doc(uptask['backlog'].id).update({finished: null});
              sub.unsubscribe();
            }
            finished = true;
          });
      });
  }

  getAllTasks(projectId) {
    const projectRef = this.referenceService.getProjectReference(projectId);
    let backlog;
    let tasks_list = [];
    return Observable.create(observer => {
      this.sprintService.getActualSprintFromProject(projectId).then(res => {
        if (!res) {
        } else {
          this.db
            .collection('backlogs', ref => ref.where('sprint', '==', res))
            .snapshotChanges()
            .subscribe(backlogs => {
              backlogs.map(actions => {
                backlog = actions.payload.doc.ref;
                const subs = this.db
                  .collection('tasks', ref =>
                    ref.where('backlog', '==', backlog)
                  )
                  .snapshotChanges()
                  .subscribe(tasks_data => {
                    tasks_data.map(act => {
                      const update_task = act.payload.doc.data();
                      if (update_task['user']) {
                        this.referenceService
                          .getUserReference(update_task['user'].id)
                          .get()
                          .then(user_data => {
                            const username =
                              user_data.data().firstname +
                              ' ' +
                              user_data.data().lastname;
                            update_task['username'] = username;
                            // observer.next(update_task);
                          });
                      }
                      observer.next(update_task);
                    });
                  });
              });
              tasks_list = [];
            });
        }
      });
    });
  }

  getTasksForBacklog(backlogId): Observable<Task[]> {
    const backlogRef = this.referenceService.getBacklogReference(backlogId);
    return Observable.create(observer => {
      this.db
        .collection('tasks', ref => ref.where('backlog', '==', backlogRef))
        .snapshotChanges()
        .subscribe(tasks_data => {
          const tasks_list = [];
          tasks_data.map(actions => {
            const taskId = actions.payload.doc.id;
            this.getTaskWithId(taskId).subscribe(task_data => {
              let update_task = tasks_list.map(t => t.id);
              if (tasks_data && task_data) {
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

  // Die Methode wird vom Scrumboard benutzt !Nicht Löschen!
  testGetTasks(projectId) {
    let task_list = [];
    const projectRef = this.referenceService.getProjectReference(projectId);
    return Observable.create(observer => {
      this.db
        .collection('tasks', ref => ref.where('project', '==', projectRef))
        .snapshotChanges()
        .subscribe(task_data => {
          task_data.map(actions => {
            const taskId = actions.payload.doc.id;
            const update_task = actions.payload.doc.data();
            task_list.push(update_task);
            if (update_task['user']) {
              this.referenceService
                .getUserReference(update_task['user'].id)
                .get()
                .then(user_data => {
                  const username =
                    user_data.data().firstname +
                    ' ' +
                    user_data.data().lastname;
                  update_task['username'] = username;
                  update_task['id'] = taskId;
                  task_list.push(update_task);
                });
            } else {
              update_task['id'] = taskId;
              task_list.push(update_task);
            }
          });
          observer.next(task_list);
          task_list = [];
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
    return this.db
      .collection('tasks')
      .doc(taskId)
      .update(task);
  }

  addUserToTask(task) {
    return new Promise((resolve, reject) => {
      this.referenceService.getCreatorReference().subscribe(res => {
        const taskId = task['id'];
        this.db
          .collection('tasks')
          .doc(taskId)
          .update({ user: res, status: task['status'] })
          .then(re => {
            resolve(true);
          });
      });
    });
  }

  // Wird benutzt um Tasks zu erstellen
  addNewTask(task) {
    this.db
      .collection('task_statuses', ref => ref.where('order', '==', 1))
      .snapshotChanges()
      .subscribe(status_data => {
        status_data.map(actions => {
          task['status'] = 'To Do';
        });
        return this.db
          .collection('tasks')
          .add(task)
          .then(res => {
            this.db
              .collection('tasks')
              .doc(res.id)
              .update({ id: res.id });
          });
      });
  }

  deleteTask(task) {
    return this.db
      .collection('tasks')
      .doc(task.id)
      .delete();
  }

  deleteWithTaskId(taskId) {
    return this.db
      .collection('tasks')
      .doc(taskId)
      .delete();
  }
}

// getAllTasksWithoutBacklog(projectId) {
//   const projectRef = this.referenceService.getProjectReference(projectId);
//   return Observable.create(observer => {
//     this.db
//       .collection('tasks', ref => ref.where('project', '==', projectRef))
//       .snapshotChanges()
//       .subscribe(tasks_data => {
//         const tasks_list = [];
//         tasks_data.map(actions => {
//           const taskId = actions.payload.doc.id;
//           const subs = this.getTaskWithId(taskId).subscribe(task_data => {
//             let update_task = tasks_list.map(t => t.id);
//             if (tasks_data) {
//               task_data['id'] = taskId;
//               if (update_task.indexOf(taskId) !== -1) {
//                 tasks_list[tasks_list.indexOf(taskId)] = task_data;
//               } else if (task_data['backlog'] === undefined) {
//                 tasks_list.push(task_data);
//               }
//             } else {
//               tasks_list.splice(update_task.indexOf(taskId), 1);
//             }
//             observer.next(tasks_list);
//             update_task = [];
//           });
//         });
//       });
//   });
// }
