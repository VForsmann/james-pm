import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserstoryService } from 'src/app/services/userstory.service';
import { StateService } from 'src/app/services/state.service';
import { ReferenceService } from 'src/app/services/reference.service';

@Component({
  selector: 'app-edit-userstory',
  templateUrl: './edit-userstory.component.html',
  styleUrls: ['./edit-userstory.component.scss']
})
export class EditUserstoryComponent implements OnInit {
  userstorys;
  selectedUserstorys = [];
  userstory = {
    name: '',
    description: '',
    epic: false,
    userstorys: [],
    project: null
  };

  constructor(
    private activeModal: NgbActiveModal,
    private userstoryService: UserstoryService,
    private referenceService: ReferenceService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.stateService.getProjectId().subscribe(id => {
      this.userstory.project = this.referenceService.getProjectReference(id);
      this.userstorys = this.userstoryService.getUserstorysFromProjectId(id);
    });
  }

  onSubmit() {
    if (this.selectedUserstorys.length > 0) {
      this.selectedUserstorys.forEach(selectedUserstory => {
        const usersotryRef = this.referenceService.getUserstoryReference(
          selectedUserstory.id
        );
        this.userstory.userstorys.push(usersotryRef);
      });
    } else if (this.userstory.epic) {
      this.userstory.epic = false;
    }
    this.userstoryService.addNewUSerstory(this.userstory);
    this.activeModal.close();
  }

  toggleUserstory(userstory) {
    if (this.selectedUserstorys.includes(userstory)) {
      const index = this.selectedUserstorys.indexOf(userstory);
      this.selectedUserstorys.splice(index, 1);
    } else {
      this.selectedUserstorys.push(userstory);
    }
  }

  toggleEpic() {
    console.log('toggle!', this.selectedUserstorys.length);
    this.userstory.epic = !this.userstory.epic;
    this.selectedUserstorys = [];
  }

}
