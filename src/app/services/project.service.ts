import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Project } from '../interfaces/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private db: AngularFirestore, private router: Router, public authService: AuthService) { }
  selectedProject;
  getProjects() {
    console.log('just a try');
    // Aktuell noch hardcoded, bis das irgendwie mit dem authuser eventuell funktioniert.
    // Zuerst die Referenz holen und damit dann die eigentliche Abfrage starten
    const user = this.db.collection('users').doc('gApsvyNMc8zP3KtC6MNr').ref;
    return this.db.collection('projects', ref => ref // .where('user', 'array-contains', user)
      .where('creator', '==', user)).snapshotChanges();
  }

  addNewProject(project: Project) {
    project.creator = this.db.collection('users').doc(project.creator).ref;
    return this.db.collection('projects').add(project);
  }

  setSelectedProject(project) {
    this.selectedProject = project;
  }

  getSelectedProject() {
    return this.selectedProject;
  }
}
