import { User } from '../user/user';
import { Model } from '../model';
import { Task } from '../task/task';
import { Router } from '@angular/router';

export class Project {
    name: string;
    creationDate: string;
    creationUser: User;
    editors: User[] = [];
    id: Number;
    rId: string;
    description: string;
    tasks: Task[] = [];

    constructor(public model: Model, public router: Router) { }

    /**
     * Sets Project Data
     * @param projectData Promise containing Project Data
     */
    setProjectData(projectData: any) {
        this.rId = projectData['id'];
        const project = projectData.fields;
        this.name = project['Name'];
        this.creationDate = project['CreationDate'];
        this.name = project['Name'];
        this.id = project['ID'];
        this.description = project['Description'];
    }

    async setEditors(editorsData: Promise<any>) {
        const editors = await editorsData;
        editors.records.forEach((element) => {
            const user = new User(this.model, this.router);
            user.setUserData(element);
            this.editors.push(user);
        });
    }

    addEditors(user: User) {
        this.editors.push(user);
    }

    async setTasks(taskData: Promise<any>) {
        await taskData.then((result) => {
            result.records.forEach((element) => {
                const task = new Task(this.model);
                task.setTaskData(element);
                this.tasks.push(task);
            });
        });
    }

    update(callback: Function) {
        callback(this);
    }

    async create(callback: Function) {
        callback(this);
        await this.model.projectService.POSTProject(this);
    }

    delete(callback: Function) {
        callback(this);

    }
}
