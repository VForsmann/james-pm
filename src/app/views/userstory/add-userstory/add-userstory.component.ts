import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserstoryService } from 'src/app/services/userstory.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { StateService } from 'src/app/services/state.service';
import { Userstory } from 'src/app/model/userstory';

@Component({
  selector: 'app-add-userstory',
  templateUrl: './add-userstory.component.html',
  styleUrls: ['./add-userstory.component.scss']
})
export class AddUserstoryComponent implements OnInit {
  modalInput;
  userstorys;
  selectedUserstorys: Userstory[] = [];
  userstory = {
    name: '',
    description: '',
    epic: false,
    epicUserstory: null,
    project: null
  };

  constructor(
    private activeModal: NgbActiveModal,
    private userstoryService: UserstoryService,
    private referenceService: ReferenceService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.userstory.project = this.referenceService.getProjectReference(this.modalInput);
    this.stateService.getProjectId().subscribe(id => {
      this.userstorys = this.userstoryService.getUserstorysFromProjectId(id);
    });
  }

  onSubmit() {
    this.userstoryService.addNewUSerstory(this.userstory).then(userstory => {
      const userstoryRef = this.referenceService.getUserstoryReference(userstory.id);
      if (this.selectedUserstorys.length > 0 && this.userstory.epic) {
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

  toggleEpic() {
    this.userstory.epic = !this.userstory.epic;
    this.selectedUserstorys = [];
  }
}
