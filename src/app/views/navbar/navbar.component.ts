import { Component, OnInit } from '@angular/core';
import { SignInComponent } from '../home/sign-in/sign-in.component';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  signInComponent = SignInComponent;
  isNavbarCollapsed = true;
  isAuthenticated: Observable<boolean>;
  project;

  constructor(private authService: AuthService,
    private af: AngularFireAuth,
    private projectService: ProjectService,
    private route: ActivatedRoute) { }

    ngOnInit() {
    this.isAuthenticated = this.authService.getAuthState();
    this.route.url.subscribe(url => {
      console.log(url);
    });
    let projectId = '';
    if (this.route.snapshot.paramMap.get('id')) {
      projectId = this.route.snapshot.paramMap.get('id');
      console.log(projectId);
      this.projectService.getProjectForId(projectId).subscribe(project => {
        console.log(project);
      });
    }
  }

  logout() {
    this.authService.logout();
  }

}
