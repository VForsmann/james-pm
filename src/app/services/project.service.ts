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
  ) { }

  /**
   * returns Observable with containing project-Observable.
   */
  getProjects() {
    // get data from user project
    const user = this.referenceService.getCreatorReference();
    // returning Observer called when user_project or user project is chaning
    const result = Observable.create(observer => {
      user.subscribe(user_data => {
        let user_project;
        user_project = this.db
          .collection('user_projects', ref => ref.where('user', '==', user_data))
          .snapshotChanges();

        // get data from project
        user_project.subscribe(user_project_data => {
          const projects_list = [];
          // Map the user_projects
          user_project_data.map(actions => {
            const projectId = actions.payload.doc.data()['project'].id;
            /* const roleId = actions.payload.doc.data()['role'].id; */

            // change project observable
            let project = this.getProjectForId(projectId);
            project = project.pipe(
              map(project_data => {
                project_data['id'] = projectId;
                return project_data;
              })
            );
            // add the mapped projects
            projects_list.push(project);
          });
          // zip the project_list to one Observable and observe its data
          projects_list.forEach((proj) => {
            proj.subscribe((projc2) => {
              console.log(projc2);
            });
          });
          const projects = zip(...projects_list);
          projects.subscribe((projects_data) => {
            console.log('zipSubscribe');
            observer.next(projects_data);
          });
        });
      });
    });
    return result;
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
