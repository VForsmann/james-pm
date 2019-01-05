import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from '../model/project';
import { ReferenceService } from './reference.service';
import { map } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  selectedProject: Project;

  constructor(
    private db: AngularFirestore,
    private referenceService: ReferenceService
  ) {}


  // TODO @Tim schau hier bitte mal drüber und bitte refactorn. ASAP ;)
  getProjects() {
    // get data from user project
    let userProjectCol;
    let obsProjects = [];
    let result = null;
    const obsUser = this.referenceService.getCreatorReference();
    const obsResult = Observable.create(observer => {
      obsUser.subscribe(user => {
        userProjectCol = this.db
          .collection('user_projects', ref => ref.where('user', '==', user))
          .snapshotChanges();

        // get data from project
        userProjectCol.subscribe(userProject => {
          userProject.map(actions => {
            const projectId = actions.payload.doc.data()['project'].id;
            // TODO Ach ja, füge die Rolle dem Project hinzu
            const roleId = actions.payload.doc.data()['role'].id;
            console.log(roleId);
            let obsProject = this.getProjectForId(projectId);
            obsProject = obsProject.pipe(
              map(project => {
                project['id'] = projectId;
                return project;
              })
            );
            obsProjects.push(obsProject);
            result = zip(...obsProjects);
            obsProjects = [];
            observer.next(result);
          });
        });
      });
    });
    return obsResult;
  }

  getProjectForId(projId: string) {
    return this.db
      .collection('projects')
      .doc(projId)
      .valueChanges();
  }

  getRoleForId(roleId: string) {
    return this.db
      .collection('roles')
      .doc(roleId)
      .valueChanges();
  }

  getProjectForReference(ref: string) {
    const user = this.referenceService.getCreatorReference();
    return this.db.collection('projects').doc(ref);
  }

  addNewProject(project) {
    return this.db
      .collection('projects')
      .add(project)
      .then(res => {
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
