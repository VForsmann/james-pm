import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Project } from '../model/project';
import { ReferenceService } from './reference.service';

@Injectable({
  providedIn: 'root'
})
export class UserstoryService {

  constructor(private db: AngularFirestore, private router: Router, private referenceService: ReferenceService) { }

  getUserstorysFromProject(project) {
    return this.db.collection('userstorys', ref => ref.where('project', '==', project)).snapshotChanges();
  }
}
