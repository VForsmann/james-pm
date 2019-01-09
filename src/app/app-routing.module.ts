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
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectOverviewComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'backlogs', component: BacklogComponent, canActivate: [AuthGuard] },
      { path: 'backlog/:bid', component: BacklogComponent, canActivate: [AuthGuard] },
      { path: 'userstorys', component: UserstoryComponent, canActivate: [AuthGuard] },
      { path: 'scrum', component: ScrumboardComponent, canActivate: [AuthGuard] },
      { path: 'sprints', component: SprintComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'addProject', component: AddProjectComponent, canActivate: [AuthGuard] },
  { path: 'editProject', component: EditProjectComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
