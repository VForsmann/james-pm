import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StateService } from './state.service';
import { ReferenceService } from './reference.service';
import { Milestone } from '../model/milestone';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  collection = 'milestones';

  constructor(private db: AngularFirestore,
    private stateService: StateService,
    private referenceService: ReferenceService) { }

  getMilestones(): Observable <Milestone[]> {
    const projectId = this.stateService.getProjectId().value;
    const project = this.referenceService.getProjectReference(projectId);

    return this.db.collection('milestones', ref => ref.where('project', '==', project)
    .orderBy('done')).valueChanges() as Observable <Milestone[]>;
  }
}
