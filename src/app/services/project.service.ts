import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Project } from '../model/project';
import { ReferenceService } from './reference.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  selectedProject: Project;

  constructor(private db: AngularFirestore, private router: Router, private referenceService: ReferenceService) { }
  getProjects() {
    const user = this.referenceService.getCreatorReference();
    const userProjectsCol = this.db.collection('user_projects', ref => ref.where('edit', '==', user));
    return userProjectsCol.snapshotChanges();
  }

  getEditorProjects() {
    const user = this.referenceService.getCreatorReference();
    return this.db.collection('projects', ref => ref
      .where('editors', 'array-contains', user)).snapshotChanges();
  }

  addNewProject(project: Project) {
    project.creator = this.referenceService.getCreatorReference();
    return this.db.collection('projects').add(project);
  }

  setSelectedProject(project: Project) {
    this.selectedProject = project;
  }
}
