import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserstoryService } from 'src/app/services/userstory.service';
import { Userstory } from 'src/app/model/userstory';

@Component({
  selector: 'app-delete-userstory',
  templateUrl: './delete-userstory.component.html',
  styleUrls: ['./delete-userstory.component.scss']
})
export class DeleteUserstoryComponent implements OnInit {
  modalInput;
  userstory: Userstory;

  constructor(public activeModal: NgbActiveModal, private userstoryService: UserstoryService) { }

  ngOnInit() {
    this.userstory = this.modalInput;
  }

  onSubmit() {
    this.userstoryService.deleteUserstory(this.userstory);
    this.activeModal.close();
  }

}
