import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BacklogService } from 'src/app/services/backlog.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { UserstoryService } from 'src/app/services/userstory.service';
import { StateService } from 'src/app/services/state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-backlog',
  templateUrl: './add-backlog.component.html',
  styleUrls: ['./add-backlog.component.scss']
})
export class AddBacklogComponent implements OnInit {
  modalInput;
  backlog = {
    name: '',
    description: '',
    type: '',
    priority: 0,
    project: null
  };
  selectedUserstorys = [];
  userstory = {
    name: '',
    description: '',
    epic: false,
    userstorys: [],
    project: null,
    backlog: null
  };
  types: Observable<{}>;
  userstorys;
  constructor(
    public activeModal: NgbActiveModal,
    private backlogService: BacklogService,
    private referenceService: ReferenceService,
    private userstoryService: UserstoryService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.backlog.project = this.referenceService.getProjectReference(
      this.modalInput
    );
    this.userstory.project = this.referenceService.getProjectReference(
      this.modalInput
    );
    this.userstorys = this.userstoryService.getUserstorysFromProjectId(
      this.modalInput
    );
    this.types = this.backlogService.getTypes();
  }

  onSubmit() {
    this.backlogService.addNewBacklog(this.backlog).then(res => {
      if (this.backlog.type === 'Feature') {
        this.userstory.backlog = this.referenceService.getBacklogReference(res.id);
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
      }
      this.activeModal.close();
    });
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
