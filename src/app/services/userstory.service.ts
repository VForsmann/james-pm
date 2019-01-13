import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
import { Observable } from 'rxjs';
import { Userstory } from '../model/userstory';

@Injectable({
  providedIn: 'root'
})
export class UserstoryService {
  constructor(
    private db: AngularFirestore,
    private referenceService: ReferenceService
  ) {}

  getUserstorysFromProject(project): Observable<Userstory[]> {
    return Observable.create(observer => {
      this.db
        .collection('userstorys', ref => ref.where('project', '==', project))
        .snapshotChanges()
        .subscribe(userstorysData => {
          const userstoryList = [];
          userstorysData.map(actions => {
            const userstoryId = actions.payload.doc.id;
            this.getUserstoryWithId(userstoryId).subscribe(userstoryData => {
              let updateUserstory = userstoryList.map(u => u.id);
              if (userstoryData) {
                userstoryData['id'] = userstoryId;
                if (updateUserstory.indexOf(userstoryId) !== -1) {
                  userstoryList[
                    userstoryList.indexOf(userstoryId)
                  ] = userstoryData;
                } else {
                  userstoryList.push(userstoryData);
                }
              } else {
                userstoryList.splice(updateUserstory.indexOf(userstoryId), 1);
              }
              observer.next(userstoryList);
              updateUserstory = [];
            });
          });
        });
    });
  }

  getUserstoryWithId(userstoryId): Observable<any> {
    const userstory = this.db
      .collection('userstorys')
      .doc(userstoryId)
      .valueChanges();
    return userstory;
  }

  getUserstorysFromProjectId(projectId: string): Observable<Userstory[]> {
    const projectRef = this.referenceService.getProjectReference(projectId);
    return this.getUserstorysFromProject(projectRef);
  }

  addNewUSerstory(userstory) {
    return this.db.collection('userstorys').add(userstory);
  }

  updateUserstory(userstory: Userstory) {
    return this.db
      .collection('userstorys')
      .doc(userstory.id)
      .update({
        name: userstory.name,
        description: userstory.description,
        epic: userstory.epic,
        project: userstory.project,
        epicUserstory: userstory.epicUserstory
      } as Partial<Userstory>);
  }

  deleteUserstory(userstory: Userstory) {
    const userstoryRef = this.referenceService.getUserstoryReference(
      userstory.id
    );
    return this.db
      .doc(userstory.backlog)
      .snapshotChanges()
      .subscribe(bl => {
        const blId = bl.payload.id;
        this.db
          .collection('backlogs')
          .doc(blId)
          .delete()
          .then(() => {
            this.db
              .collection('userstorys', ref =>
                ref.where('epicUserstory', '==', userstoryRef)
              )
              .snapshotChanges()
              .subscribe(us => {
                us.map(actions => {
                  const usId = actions.payload.doc.id;
                  this.db
                    .collection('userstorys')
                    .doc(usId)
                    .update({ epicUserstory: null } as Partial<Userstory>);
                });
              });
            return this.db
              .collection('userstorys')
              .doc(userstory.id)
              .delete();
          });
      });
  }
}
