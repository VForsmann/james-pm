import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/model/user/user.service';
import { Model } from 'src/app/model/model';
import { User } from 'src/app/model/user/user';
import { Me } from 'src/app/model/user/me';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  me: Me;
  userService: UserService;
  constructor(private model: Model) {
    this.me = model.me;
    this.userService = model.userService;
  }

  ngOnInit() { }
}
