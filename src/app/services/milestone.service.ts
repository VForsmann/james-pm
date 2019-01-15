import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { StateService } from './state.service';
import { ReferenceService } from './reference.service';
import { MilestoneFirebase } from '../model/milestone';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  collection = 'milestones';

  constructor(private db: AngularFirestore,
    private stateService: StateService,
    private referenceService: ReferenceService) { }

  getMilestones(projectId: string) {
    const project = this.referenceService.getProjectReference(projectId);

    return this.db.collection('milestones', ref => ref.where('project', '==', project)
    .orderBy('done')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as MilestoneFirebase;
          const id = a.payload.doc.id;
          return {id, ...data} as MilestoneFirebase;
        });
      })
    );
  }

  addMilestone(milestone: MilestoneFirebase) {
    const projectId = this.stateService.getProjectId().value;
    const project = this.referenceService.getProjectReference(projectId);
    this.db.collection('milestones').add({...milestone, project: project});
  }

  deleteMilestone(milestoneId: string) {
    this.db.collection('milestones').doc(milestoneId).delete();
  }
}
