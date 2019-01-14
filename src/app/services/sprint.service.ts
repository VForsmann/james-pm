import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
import { ProjectService } from './project.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sprint } from '../model/sprint';

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

  getSprintsFromProjectId(projectId: string): Observable<Sprint[]> {
    const projectRef = this.referenceService.getProjectReference(projectId);
    return this.getSprintsForProject(projectRef);
  }

  getCurrentSprint(projectId: string) {
    const projectRef = this.referenceService.getProjectReference(projectId);
    return new Promise(resolve => {
      this.db
        .collection('sprints', ref =>
          ref.where('project', '==', projectRef).where('state', '==', 'current')
        )
        .snapshotChanges()
        .subscribe(metaSprint => {
          if (metaSprint[0]) {
            const sprintId = metaSprint[0].payload.doc.id;
            this.getSprintWithId(sprintId).subscribe(sprintData => {
              this.projectService
                .getProjectForId(projectId)
                .subscribe(project => {
                  if (
                    sprintData.start_date.seconds +
                      project.default_sprint_time_ms / 1000 <
                    Date.now() / 1000
                  ) {
                    sprintData.state = '';
                    this.updateSprint(sprintData as Sprint);
                    this.getNextSprint(projectId).then(sprint => {
                      resolve(sprint);
                    });
                  } else {
                    sprintData.id = sprintId;
                    resolve(sprintData);
                  }
                });
            });
          }
        });
    });
  }

  getNextSprint(projectId: string) {
    const projectRef = this.referenceService.getProjectReference(projectId);
    return new Promise<Sprint>(resolve => {
      this.db
        .collection('sprints', ref =>
          ref.where('project', '==', projectRef).where('state', '==', 'next')
        )
        .snapshotChanges()
        .subscribe(metaSprint => {
          if (metaSprint[0]) {
            const sprintId = metaSprint[0].payload.doc.id;
            this.getSprintWithId(sprintId).subscribe(sprintData => {
              sprintData.id = sprintId;
              if (sprintData.start_date.seconds < Date.now() / 1000) {
                sprintData.state = 'current';
                this.updateSprint(sprintData as Sprint);
                console.log('this is the next current sprint:', sprintData);
                resolve(sprintData as Sprint);
              } else if (sprintData.start_date.seconds < Date.now() / 1000) {
                console.log('this is the next sprint:', sprintData);
                resolve(sprintData as Sprint);
              } else {
                console.log('there is no next sprint, i create a new one');
                // this.addNextSprint(projectId).then(
                //   nextSprint => resolve(nextSprint),
                //   error => reject(error)
                // );
              }
            });
          }
        });
    });
  }

  addNextSprint(projectId: string) {
    // const projectRef = this.referenceService.getProjectReference(projectId);
    // return new Promise<Sprint>((resolve, reject) => {
    //   let endTimestamp = Date.now() / 1000;
    //   this.projectService.getProjectForId(projectId).subscribe(project => {
    //     this.getCurrentSprint(projectId)
    //       .then(
    //         currentSprint =>
    //           (endTimestamp =
    //             currentSprint.start_date +
    //             project.default_sprint_time_ms / 1000)
    //       )
    //       .then(() => console.log('add new sprint'));
    //   });
    // });
  }

  updateSprint(sprint: Sprint) {
    return this.db
      .collection('sprints')
      .doc(sprint.id)
      .update({
        state: sprint.state
      });
  }
}
