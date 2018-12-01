import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HomeComponent } from './views/home/home.component';
import { SignInComponent } from './views/components/user/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './views/navbar/navbar.component';
import { FooterComponent } from './views/footer/footer.component';
import { ModalComponent } from './views/shared/modal/modal.component';
import { CardComponent } from './views/shared/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './model/user/user.service';
import { ProjectService } from './model/project/project.service';
import { TaskService } from './model/task/task.service';
import { Model } from './model/model';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { StatusBarComponent } from './views/components/status-bar/status-bar.component';
import { LoadingComponent } from './views/components/loading/loading.component';
import { ProjectOverviewComponent } from './views/project-overview/project-overview.component';
import { ListEntryComponent } from './views/components/project/list-entry/list-entry.component';
import { SignUpComponent } from './views/components/user/sign-up/sign-up.component';
import { DatepickerComponent } from './views/shared/datepicker/datepicker.component';
import { EditProjectComponent } from './views/components/edit-project/edit-project.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ModalComponent,
    CardComponent,
    SignInComponent,
    DashboardComponent,
    StatusBarComponent,
    LoadingComponent,
    ProjectOverviewComponent,
    ListEntryComponent,
    SignUpComponent,
    DatepickerComponent,
    EditProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'james-pm'),
    AngularFireModule,
    AngularFireAuthModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgDragDropModule.forRoot(),
    FormsModule,
    NgbModule
  ],
  providers: [NgbActiveModal, UserService, ProjectService, TaskService, Model, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
