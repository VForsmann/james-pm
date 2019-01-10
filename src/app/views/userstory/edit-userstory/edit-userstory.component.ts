import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserstoryService } from 'src/app/services/userstory.service';
import { StateService } from 'src/app/services/state.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { Userstory } from 'src/app/model/userstory';

@Component({
  selector: 'app-edit-userstory',
  templateUrl: './edit-userstory.component.html',
  styleUrls: ['./edit-userstory.component.scss']
})
export class EditUserstoryComponent implements OnInit {
  modalInput;
  userstorys;
  selectedUserstorys = [];
  userstory: Userstory;

  constructor(
    private activeModal: NgbActiveModal,
    private userstoryService: UserstoryService,
    private referenceService: ReferenceService
  ) {}

  ngOnInit() {
    this.userstory = this.modalInput;
    console.log('user input:', this.userstory);
    if (this.userstory.epic) {
      this.userstorys = this.userstoryService.getUserstorysFromProject(this.userstory.project);
    }
  }

  onSubmit() {
    this.userstoryService.updateUserstory(this.userstory).then(userstory => {
      if (this.selectedUserstorys.length > 0 && this.userstory.epic) {
        const userstoryRef = this.referenceService.getUserstoryReference(this.userstory.id);
        console.log('try to update userepics!', userstoryRef);
        this.selectedUserstorys.forEach(selectedUserstory => {
          selectedUserstory.epicUserstory = userstoryRef;
          this.userstoryService.updateUserstory(selectedUserstory);
        });
      }
      this.activeModal.close();
      }
    );
  }

  toggleUserstory(userstory) {
    if (this.selectedUserstorys.includes(userstory)) {
      const index = this.selectedUserstorys.indexOf(userstory);
      this.selectedUserstorys.splice(index, 1);
    } else {
      this.selectedUserstorys.push(userstory);
    }
  }

}
