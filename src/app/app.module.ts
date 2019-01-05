import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HomeComponent } from './views/home/home.component';
import { SignInComponent } from './views/home/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CardComponent } from './shared/card/card.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProjectOverviewComponent } from './views/project-overview/project-overview.component';
import { StatusBarComponent } from './views/scrumboard/status-bar/status-bar.component';
import { ModalComponent } from './shared/modal/modal.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { ListEntryComponent } from './views/project-overview/list-entry/list-entry.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddProjectComponent } from './views/project-overview/add-project/add-project.component';
import { SignUpComponent } from './views/home/sign-up/sign-up.component';
import { MilestoneComponent } from './views/milestone/milestone.component';
import { SprintComponent } from './views/sprint/sprint.component';
import { UserstoryComponent } from './views/userstory/userstory.component';
import { BacklogComponent } from './views/backlog/backlog.component';
import { PlanningPokerComponent } from './views/planning-poker/planning-poker.component';
import { ScrumboardComponent } from './views/scrumboard/scrumboard.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    CardComponent,
    NavbarComponent,
    DashboardComponent,
    StatusBarComponent,
    ModalComponent,
    ProjectOverviewComponent,
    ListEntryComponent,
    AddProjectComponent,
    SignUpComponent,
    MilestoneComponent,
    SprintComponent,
    UserstoryComponent,
    BacklogComponent,
    PlanningPokerComponent,
    ScrumboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'james-pm'),
    AngularFireAuthModule,
    FormsModule,
    NgbModule,
    NgDragDropModule.forRoot(),
  ],
  entryComponents: [SignUpComponent],
  providers: [AuthService, AngularFirestore, NgbActiveModal, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
