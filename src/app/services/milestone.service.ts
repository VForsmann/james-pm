import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StateService } from './state.service';
import { ReferenceService } from './reference.service';
import { MilestoneFirebase } from '../model/milestone-firebase';
import { Observable } from 'rxjs';
import { MilestoneAngular } from '../model/milestone-angular';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  collection = 'milestones';

  constructor(private db: AngularFirestore,
    private stateService: StateService,
    private referenceService: ReferenceService) { }

  getMilestones(): Observable <MilestoneFirebase[]> {
    const projectId = this.stateService.getProjectId().value;
    const project = this.referenceService.getProjectReference(projectId);

    return this.db.collection('milestones', ref => ref.where('project', '==', project)
    .orderBy('done')).valueChanges() as Observable <MilestoneFirebase[]>;
  }

  addMilestone(milestone: MilestoneFirebase){
    const projectId = this.stateService.getProjectId().value;
    const project = this.referenceService.getProjectReference(projectId);
    this.db.collection('milestones').add({...milestone, project: project});
  }
}
