import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ProjectOverviewComponent } from './views/project-overview/project-overview.component';
import { SignUpComponent } from './views/components/user/sign-up/sign-up.component';
import { EditProjectComponent } from './views/components/edit-project/edit-project.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'editProject', component: EditProjectComponent, canActivate: [AuthGuard] },
  { path: 'signUp', component: SignUpComponent},
  { path: 'projectOverview', component: ProjectOverviewComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
