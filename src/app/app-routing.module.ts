import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProjectOverviewComponent } from './views/project-overview/project-overview.component';
import { AuthGuard } from './auth.guard';
import { AddProjectComponent } from './views/project-overview/add-project/add-project.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectOverviewComponent }, // canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent }, // canActivate: [AuthGuard] }
  { path: 'addProject', component: AddProjectComponent } // canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
