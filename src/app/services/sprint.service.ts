import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
import { ProjectService } from './project.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sprint } from '../model/sprint';
import * as firestore from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class SprintService {
  constructor(
    private db: AngularFirestore,
    private referenceService: ReferenceService,
    private projectService: ProjectService
  ) {}

  getSprintsForProject(projectRef): Observable<Sprint[]> {
    return Observable.create(observer => {
      this.db
        .collection('sprints', ref => ref.where('project', '==', projectRef))
        .snapshotChanges()
        .subscribe(sprintsData => {
          const sprintList = [];
          sprintsData.map(actions => {
            const sprintId = actions.payload.doc.id;
            this.getSprintWithId(sprintId).subscribe(sprintData => {
              let updateSprint = sprintList.map(s => s.id);
              if (sprintData) {
                sprintData['id'] = sprintId;
                if (updateSprint.indexOf(sprintId) !== -1) {
                  sprintList[sprintList.indexOf(sprintId)] = sprintData;
                } else {
                  sprintList.push(sprintData);
                }
              } else {
                sprintList.splice(updateSprint.indexOf(sprintId), 1);
              }
              const sortedSprintList = sprintList.sort((a: any, b: any) => {
                if (a['start_date'] > b['start_date']) {
                  return -1;
                } else if (a['start_date'] < b['start_date']) {
                  return 1;
                } else {
                  return 0;
                }
              });
              observer.next(sortedSprintList);
              updateSprint = [];
            });
          });
        });
    });
  }

  getSprintWithId(sprintId: string): Observable<Partial<Sprint>> {
    const sprint = this.db
      .collection('sprints')
      .doc(sprintId)
      .valueChanges();
    return sprint;
  }

  getActualSprintFromProject(projectId: string) {
    const projectRef = this.referenceService.getProjectReference(projectId);
    let sprintRef;
    return new Promise(resolve => {
      this.db
        .collection('projects')
        .doc(projectId)
        .valueChanges()
        .subscribe(project_val => {
          const subs = this.db
            .collection('sprints', ref =>
              ref
                .where('project', '==', projectRef)
                .where('start_date', '<', Date.now() / 1000)
                .where(
                  'start_date',
                  '>',
                  (Date.now() - project_val['default_sprint_time_ms']) / 1000
                )
                .orderBy('start_date', 'desc')
                .limit(1)
            )
            .snapshotChanges()
            .subscribe(sprints => {
              sprints.map(actions => {
                sprintRef = actions.payload.doc.ref;
                subs.unsubscribe();
              });
              resolve(sprintRef);
            });
        });
    });
  }

  getSprintsFromProjectId(projectId: string): Observable<Sprint[]> {
    const projectRef = this.referenceService.getProjectReference(projectId);
    return this.getSprintsForProject(projectRef);
  }

  getNextSprintOrCreate(projectId: string) {
    const projectRef = this.referenceService.getProjectReference(projectId);
    let sprint;
    let nextRef;
    return new Promise(resolve => {
      this.db
        .collection('projects')
        .doc(projectId)
        .valueChanges()
        .subscribe(project_val => {
          const subs = this.db
            .collection('sprints', ref =>
              ref
                .where('project', '==', projectRef)
                .orderBy('start_date', 'desc')
                .limit(1)
            )
            .snapshotChanges()
            .subscribe(sprints => {
              sprints.map(actions => {
                sprint = actions.payload.doc.data();
                nextRef = actions.payload.doc.ref;
                subs.unsubscribe();
              });
              if (sprint['start_date'] > Date.now() / 1000) {
                resolve(nextRef);
              } else if (
                sprint['start_date'] >
                (Date.now() - project_val['default_sprint_time_ms']) / 1000
              ) {
                this.db
                  .collection('sprints')
                  .add({
                    project: projectRef,
                    start_date:
                      sprint['start_date'] +
                      project_val['default_sprint_time_ms'] / 1000
                  })
                  .then(res => {
                    resolve(res);
                  });
              } else {
                this.db
                  .collection('sprints')
                  .add({
                    project: projectRef,
                    start_date: Date.now() / 1000
                  })
                  .then(res => {
                    resolve(res);
                  });
              }
            });
        });
    });
  }
}
