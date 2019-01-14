import { Injectable } from '@angular/core';
import { ReferenceService } from './reference.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { UserstoryService } from './userstory.service';
import { Backlog } from '../model/backlog';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  constructor(
    private referenceServices: ReferenceService,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private userstoryService: UserstoryService
  ) {}

  getBacklogs(projectId) {
    const projRef = this.referenceServices.getProjectReference(projectId);
    return Observable.create(observer => {
      const backlogs = this.db
        .collection('backlogs', ref => ref.where('project', '==', projRef))
        .snapshotChanges();
      backlogs.subscribe(backlogs_data => {
        const backlog_list = [];
        // Map the backlogs
        backlogs_data.map(actions => {
          const backlogId = actions.payload.doc.id; // ['backlog'].id;
          const backlog = this.getBacklogWithIdValue(backlogId).subscribe(
            backlog_data => {
              const update_backlog = backlog_list.map(back => back.id);
              if (backlog_data) {
                if (backlog_data['user']) {
                  this.db
                    .collection('users')
                    .doc(backlog_data['user'].id)
                    .valueChanges()
                    .subscribe(res => {
                      backlog_data['userName'] =
                        res['firstname'] + ' ' + res['lastname'];
                    });
                } else {
                  backlog.unsubscribe();
                }
                backlog_data['id'] = backlogId;
                if (update_backlog.indexOf(backlogId) !== -1) {
                  backlog_list[backlog_list.indexOf(projectId)] = backlog_data;
                } else {
                  backlog_list.push(backlog_data);
                }
              }
              observer.next(backlog_list);
            }
          );
        });
      });
    });
  }

  getBacklogWithIdValue(backlogId): Observable<Partial<Backlog>> {
    const result: Observable<Partial<Backlog>> = this.db
      .collection('backlogs')
      .doc(backlogId)
      .valueChanges();
    return result;
  }

  addNewBacklog(backlog) {
    return this.db.collection('backlogs').add(backlog);
  }

  deleteBacklogAndUserstory(backlogId) {
    const backlogRef = this.db.collection('backlogs').doc(backlogId).ref;
    this.db
      .collection('backlogs')
      .doc(backlogId)
      .valueChanges()
      .subscribe(backlog_data => {
        if (backlog_data && backlog_data['type'] === 'Feature') {
          let story;
          this.db
            .collection('userstorys', ref =>
              ref.where('backlog', '==', backlogRef)
            )
            .snapshotChanges()
            .subscribe(userstory => {
              userstory.map(actions => {
                story = actions.payload.doc.data();
                story['id'] = actions.payload.doc.id;
                this.userstoryService.deleteUserstory(story);
              });
            });
        } else {
          this.db
            .collection('backlogs')
            .doc(backlogId)
            .delete();
        }
      });
  }

  addUserToBacklog(userId, backlogId) {
    return new Promise((resolve, reject) => {
      const update_user = {
        user: this.db.collection('user').doc(userId).ref
      };
      console.log(update_user, backlogId);
      this.db
        .collection('backlogs')
        .doc(backlogId)
        .update(update_user)
        .then(res => {
          resolve();
        });
    });
  }

  getTypes() {
    return this.db.collection('types').valueChanges();
  }

  editBacklog(backlog) {
    const backlogRef = this.db.collection('backlogs').doc(backlog.id).ref;
    this.db
      .collection('backlogs')
      .doc(backlog.id)
      .update({
        name: backlog.name,
        description: backlog.description,
        priority: backlog.priority
      })
      .then(res => {
        this.db
          .collection('userstorys', ref =>
            ref.where('backlog', '==', backlogRef)
          )
          .snapshotChanges()
          .subscribe(story => {
            story.map(actions => {
              this.db
                .collection('userstorys')
                .doc(actions.payload.doc.id)
                .update({
                  name: backlog.name,
                  description: backlog.description
                })
                .then(re => {
                  console.log(re);
                });
            });
          });
      });
  }

  updateBacklog(backlog) {
    if (!backlog.sprint) {
      backlog.sprint = null;
    }
    return this.db
      .collection('backlogs')
      .doc(backlog.id)
      .update({
        name: backlog.name,
        sprint: backlog.sprint,
        description: backlog.description,
        selected: backlog.selected
          ? backlog.selected
          : firestore.FieldValue.delete()
      });
  }

  getSelectedBacklogs(projectId): Observable<Backlog[]> {
    const projRef = this.referenceServices.getProjectReference(projectId);
    return Observable.create(observer => {
      const backlogs = this.db
        .collection('backlogs', ref =>
          ref.where('project', '==', projRef).where('selected', '==', true)
        )
        .snapshotChanges();
      backlogs.subscribe(backlogs_data => {
        const backlog_list = [];
        // Map the backlogs
        backlogs_data.map(actions => {
          const backlogId = actions.payload.doc.id; // ['backlog'].id;
          const backlog = this.getBacklogWithIdValue(backlogId).subscribe(
            backlog_data => {
              const update_backlog = backlog_list.map(back => back.id);
              if (backlog_data) {
                if (backlog_data['user']) {
                  this.db
                    .collection('users')
                    .doc(backlog_data['user'].id)
                    .valueChanges()
                    .subscribe(res => {
                      backlog_data['userName'] =
                        res['firstname'] + ' ' + res['lastname'];
                    });
                } else {
                  backlog.unsubscribe();
                }
                backlog_data['id'] = backlogId;
                if (update_backlog.indexOf(backlogId) !== -1) {
                  backlog_list[backlog_list.indexOf(projectId)] = backlog_data;
                } else {
                  backlog_list.push(backlog_data);
                }
              }
              observer.next(backlog_list);
            }
          );
        });
        observer.next(backlog_list);
      });
    });
  }
}
