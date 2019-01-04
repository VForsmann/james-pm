import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Project } from '../model/project';
import { ReferenceService } from './reference.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private db: AngularFirestore, private router: Router, private referenceService: ReferenceService) { }
  selectedProject: Project;
  async getProjects() {
    let result: Observable<DocumentChangeAction<{}>[]>;
    await this.referenceService.getCreatorReference().then((user) => {
      result = this.db.collection('user_projects', ref => ref.where('edit', '==', user)).snapshotChanges();
    });
    return result;
  }

  getProjectForReference(ref: string) {
    const user = this.referenceService.getCreatorReference();
    return this.db.collection('projects').doc(ref);
  }

  addNewProject(project) {
    return this.db.collection('projects').add(project).then(res => {
      const userProject = {
        user: this.referenceService.getCreatorReference(),
        project: 'test',
        role: 'test'
      };
      this.db.collection('user_projects').add(userProject);
    });
  }

  setSelectedProject(project: Project) {
    this.selectedProject = project;
  }
}
