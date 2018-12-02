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
import { AuthService } from './services/auth.service';
import { CardComponent } from './views/shared/card/card.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProjectOverviewComponent } from './views/project-overview/project-overview.component';
import { StatusBarComponent } from './views/components/status-bar/status-bar.component';
import { ModalComponent } from './views/shared/modal/modal.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { ListEntryComponent } from './views/components/project/list-entry/list-entry.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
import { SignUpComponent } from './views/components/user/sign-up/sign-up.component';

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
    SignUpComponent,
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
  providers: [AuthService, AngularFirestore, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
