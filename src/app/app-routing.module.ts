import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProjectOverviewComponent } from './views/project-overview/project-overview.component';
import { AuthGuard } from './auth.guard';
import { AddProjectComponent } from './views/project-overview/add-project/add-project.component';
import { EditProjectComponent } from './views/project-overview/edit-project/edit-project.component';
import { BacklogComponent } from './views/backlog/backlog.component';
import { SprintComponent } from './views/sprint/sprint.component';
import { ScrumboardComponent } from './views/scrumboard/scrumboard.component';
import { UserstoryComponent } from './views/userstory/userstory.component';
import { AddBacklogComponent } from './views/backlog/add-backlog/add-backlog.component';
import { EditBacklogComponent } from './views/backlog/edit-backlog/edit-backlog.component';
import { BacklogTasksComponent } from './views/backlog/backlog-tasks/backlog-tasks.component';
import { RoadmapComponent } from './views/roadmap/roadmap.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectOverviewComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/backlogs', component: BacklogComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/backlog/:bid', component: BacklogTasksComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/userstorys', component: UserstoryComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/scrum', component: ScrumboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/sprints', component: SprintComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/roadmap', component: RoadmapComponent, canActivate: [AuthGuard] },
  { path: 'addProject', component: AddProjectComponent, canActivate: [AuthGuard] },
  { path: 'editProject', component: EditProjectComponent, canActivate: [AuthGuard] },
  { path: 'addBacklog', component: AddBacklogComponent, canActivate: [AuthGuard] },
  { path: 'editBacklog', component: EditBacklogComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
