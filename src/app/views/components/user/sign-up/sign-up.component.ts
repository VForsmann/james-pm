import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Input()
  modalInput;

  errorMessage: string;
  user: User = {firstname: '', lastname: '', password: '', email: ''};

  constructor(public activeModal: NgbActiveModal,
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  async onSubmit() {
    await this.authService.signUp(this.user.email, this.user.password);
    await this.userService.createUser(this.authService.getLoggedInUser().uid , this.user);
    this.activeModal.close();
    this.router.navigate(['projects']);
  }
}
