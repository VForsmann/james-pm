import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';

@Injectable({
  providedIn: 'root'
})
export class UserstoryService {

  constructor(private db: AngularFirestore, private router: Router, private referenceService: ReferenceService) { }

  getUserstorysFromProject(project) {
    return this.db.collection('userstorys', ref => ref.where('project', '==', project)).valueChanges();
  }

  getUserstorysFromProjectId(projectId: string) {
    const projectRef = this.referenceService.getProjectReference(projectId);
    return this.db.collection('userstorys', ref => ref.where('project', '==', projectRef)).valueChanges();
  }
}
