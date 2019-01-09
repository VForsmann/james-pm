import { Component, OnInit } from '@angular/core';
import { SignInComponent } from '../home/sign-in/sign-in.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { StateService } from 'src/app/services/state.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  signInComponent = SignInComponent;
  isNavbarCollapsed = true;
  isAuthenticated: Observable<boolean>;
  project = null;

  constructor(
    private authService: AuthService,
    private stateService: StateService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

    ngOnInit() {
    this.isAuthenticated = this.authService.getAuthState();

    this.stateService.getProjectId().subscribe(id => {
      if (id && id !== '') {
        this.projectService.getProjectForId(id).subscribe(project => {
          this.project = project;
        });
      } else {
        this.project = null;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  navigateDashboard() {
    this.router.navigate(['dashboard']);
  }

  navigateBacklogs() {
    this.router.navigate(['backlog']);
  }

  navigateSprints() {
    this.router.navigate(['sprint']);
  }

  navigateUserStorys() {
    this.router.navigate(['userstory']);
  }

  navigateScrumBoard() {
    this.router.navigate(['scrum']);
  }

}
