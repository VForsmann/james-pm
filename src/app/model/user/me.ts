import { Model } from '../model';
import { User } from './user';
import { Project } from '../project/project';
import { Router } from '@angular/router';

export class Me extends User {
    password: string;
    projects: Project[] = [];
    selectedProject: Project;

    constructor(public model: Model, public router: Router) {
        super(model, router);
    }

    /**
     * Is called by setUser and sets the general Data
     * @param record0 is the first entry of the resultset containing in the Promise
     */
    setUserData(record0: any) {
        if (record0) {
            this.rId = record0['id'];
            const user = record0.fields;
            this.email = user['Email'];
            this.firstname = user['Firstname'];
            this.id = user['ID'];
            this.lastname = user['Lastname'];
            this.password = user['Password'];
        } else {
            throw new Error('Parameter undefined');
        }
    }

    /**
     * Sets the projects of the user
     * @param projectArray Promise which is containing Projects
     */
    async setProjects(projectsData: Promise<any>) {
        const projects = await projectsData;
        projects.records.forEach(projectData => {
            const project = new Project(this.model, this.router);
            project.setProjectData(projectData);
            this.projects.push(project);
        });
    }
}
