import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFirestore} from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';

@Injectable({
  providedIn: 'root'
})
export class UserProjectService {

  constructor(private db: AngularFirestore, private router: Router, private referenceService: ReferenceService) { }

  getUserProjects() {
    const user = this.referenceService.getCreatorReference();
    const userProjectsCol = this.db.collection('user_projects', ref => ref.where('edit', '==', user));
    return userProjectsCol.snapshotChanges();
  }
}
