import { Injectable } from '@angular/core';
import { ReferenceService } from './reference.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  constructor(
    private referenceServices: ReferenceService,
    private db: AngularFirestore,
    private route: ActivatedRoute
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

  getBacklogWithIdValue(backlogId) {
    const result = this.db
      .collection('backlogs')
      .doc(backlogId)
      .valueChanges();
    return result;
  }

  addNewBacklog(backlog) {
    return this.db.collection('backlogs').add(backlog);
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

  updateBacklog(backlog) {
    return this.db
      .collection('backlogs')
      .doc(backlog.id)
      .update({
        name: backlog.name,
        description: backlog.description,
        selected: backlog.selected ? backlog.selected : firestore.FieldValue.delete()
      });
  }

  getSelectedBacklogs(projectId) {
    const projRef = this.referenceServices.getProjectReference(projectId);
    return Observable.create(observer => {
      const backlogs = this.db
        .collection('backlogs', ref => ref.where('project', '==', projRef).where('selected', '==', true))
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
}
