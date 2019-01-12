import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ReferenceService } from './reference.service';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private db: AngularFirestore,
    private router: Router,
    private referenceService: ReferenceService) { }

  getSprintsForProjectId(projectId) {
    return this.db
    .collection('userstorys', ref => ref.where('project', '==', projectId))
    .snapshotChanges();
  }

  addNewSprint(sprint) {
    
  }
}
