import { Project } from '../project/project';
import { Model } from '../model';
import { User } from '../user/user';

export class Task {
    project?: Project;
    user?: User;
    name: string;
    description: string;
    status: string;
    startDate: string;
    endDate: string;
    rId?: string;
    id?: Number;

    constructor(public model: Model) { }

    /**
     * Sets Task Data
     * @param projectData Promise containing Task Data
     */
    async setTaskData(taskData: any) {
        this.rId = taskData['id'];
        const task = taskData.fields;
        this.name = task['Name'];
        this.id = task['ID'];
        this.description = task['Description'];
        this.status = task['Status'][0];
        this.startDate = task['StartDate'];
        this.endDate = task['EndDate'];
        this.setReferenceData(task['Project'][0], task['User'] ? task['User'][0] : undefined);
    }

    setReferenceData(projectRId: string, userRId: string) {
        this.project = this.model.me.projects.find((project) => project.rId === projectRId);
        if (userRId) {
            this.user = this.project.editors.find((editor) => editor.rId === userRId);
        }
    }

    update(callback: Function) {
        callback(this);
    }

    async create(callback: Function) {
        callback(this);
        await this.model.taskService.POSTTask(this).then(res => { })
        .catch(err => {
            const index = this.model.me.selectedProject.tasks.indexOf(this);
            this.model.me.selectedProject.tasks.splice(index, 1);
        });
    }

    delete(callback: Function) {
        callback(this);
        // await this.model.taskService.DELETETask(this);
    }
}
