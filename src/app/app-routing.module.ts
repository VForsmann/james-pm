import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProjectOverviewComponent } from './views/project-overview/project-overview.component';
import { AuthGuard } from './auth.guard';
import { BacklogComponent } from './views/backlog/backlog.component';
import { SprintComponent } from './views/sprint/sprint.component';
import { ScrumboardComponent } from './views/scrumboard/scrumboard.component';
import { UserstoryComponent } from './views/userstory/userstory.component';
import { BacklogTasksComponent } from './views/backlog/backlog-tasks/backlog-tasks.component';
import { RoadmapComponent } from './views/roadmap/roadmap.component';
import { TaskComponent } from './views/task/task.component';
import { SprintPlanningComponent } from './views/sprint-planning/sprint-planning.component';
import { PlanningPokerComponent } from './views/planning-poker/planning-poker.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectOverviewComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/backlogs', component: BacklogComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/backlog/:bid', component: BacklogTasksComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/userstorys', component: UserstoryComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/scrum', component: ScrumboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/sprints', component: SprintComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/sprint-planning', component: SprintPlanningComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/sprint-planning/planning-poker', component: PlanningPokerComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/roadmap', component: RoadmapComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id/tasks', component: TaskComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
