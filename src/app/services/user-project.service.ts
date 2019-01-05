import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProjectService {

  constructor(private db: AngularFirestore, private router: Router, private referenceService: ReferenceService) { }

  async getUserProjects() {
    let result: Observable<DocumentChangeAction<{}>[]>;
    await this.referenceService.getCreatorReference().then((user) => {
      result = this.db.collection('user_projects', ref => ref.where('edit', '==', user)).snapshotChanges();
    });
    return result;
  }
}
