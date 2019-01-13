import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { StateService } from './state.service';
import { ReferenceService } from './reference.service';
import { MilestoneFirebase } from '../model/milestone';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  collection = 'milestones';

  constructor(private db: AngularFirestore,
    private stateService: StateService,
    private referenceService: ReferenceService) { }

  getMilestones(): Observable<DocumentChangeAction<MilestoneFirebase>[]> {
    const projectId = this.stateService.getProjectId().value;
    const project = this.referenceService.getProjectReference(projectId);

    return this.db.collection('milestones', ref => ref.where('project', '==', project)
    .orderBy('done')).snapshotChanges() as Observable<DocumentChangeAction<MilestoneFirebase>[]>;
  }

  addMilestone(milestone: MilestoneFirebase) {
    const projectId = this.stateService.getProjectId().value;
    const project = this.referenceService.getProjectReference(projectId);
    this.db.collection('milestones').add({...milestone, project: project});
  }
}
