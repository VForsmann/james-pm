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

  constructor(
    private db: AngularFirestore,
    private referenceService: ReferenceService
  ) { }

  /**
   * returns Observable with containing project-Observable.
   */
  getProjects(): Observable<Project[]> {
    // get data from user project
    const user = this.referenceService.getCreatorReference();
    // returning Observer called when user_project or user project is chaning
    return Observable.create(observer => {
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
            const project = this.getProjectForId(projectId);

            project.subscribe((project_data) => {
              const update_project = projects_list.map(pro => pro.id);
              project_data['id'] = projectId;
              if (update_project.indexOf(projectId) !== -1) {
                projects_list[update_project.indexOf(projectId)] = project_data;
              } else {
                projects_list.push(project_data);
              }
              observer.next(projects_list);
            });
          });
        });
      });
    });
  }

  getProjectForId(projId: string): Observable<{}> {
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

  getRole(role_name: String) {
    return this.db.collection('roles', ref => ref.where('role', '==', role_name)).snapshotChanges();
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
        this.referenceService.getCreatorReference().subscribe((user_data) => {
          this.getRole('scrum master').subscribe((innerRes) => {
            let role;
            innerRes.map(actions => {
              role = actions.payload.doc.ref;
            });
            const user_project = {
              project: res,
              user: user_data,
              role: role
            };
            this.db.collection('user_projects').add(user_project).then(re => {
              console.log('Projekt angelegt');
            });
          });
        });
      });
  }

  addMemberToProject(projectId, userEmail, roleName = 'developer') {
    this.db.collection('users', ref => ref.where('email', '==', userEmail)).snapshotChanges().subscribe(res => {
      this.getRole(roleName).subscribe(innerRes => {
        let user;
        let role;
        res.map(actions => {
          user = this.db.collection('user').doc(actions.payload.doc.id).ref;
        });
        innerRes.map(actions => {
          role = actions.payload.doc.ref;
        });
        const userProject = {
          user: user,
          project: this.referenceService.getProjectReference(projectId),
          role: role
        };
        this.db.collection('user_projects').add(userProject);
      });
    });
  }
}
