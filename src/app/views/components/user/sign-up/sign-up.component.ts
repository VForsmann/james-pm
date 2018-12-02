import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user';

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

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSubmit() {
    this.activeModal.close();
  }
}
