import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserstoryService } from 'src/app/services/userstory.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { Userstory } from 'src/app/model/userstory';

@Component({
  selector: 'app-edit-userstory',
  templateUrl: './edit-userstory.component.html',
  styleUrls: ['./edit-userstory.component.scss']
})
export class EditUserstoryComponent implements OnInit {
  modalInput;
  userstorys: Userstory[] = [];
  selectedUserstorys: Userstory[] = [];
  loadedUserstory = [];
  userstoryRef;
  userstory: Userstory = {
    id: '',
    name: '',
    description: '',
    epic: null,
    epicUserstory: null,
    backlog: null,
    project: null
  };

  constructor(
    public activeModal: NgbActiveModal,
    private userstoryService: UserstoryService,
    private referenceService: ReferenceService
  ) {}

  ngOnInit() {
    this.userstory.id = this.modalInput.id;
    this.userstory.name = this.modalInput.name;
    this.userstory.description = this.modalInput.description;
    this.userstory.epic = this.modalInput.epic;
    this.userstory.epicUserstory = this.modalInput.epicUserstory;
    this.userstory.backlog = this.modalInput.backlog;
    this.userstory.project = this.modalInput.project;
    this.userstoryRef = this.referenceService.getUserstoryReference(
      this.userstory.id
    );
    if (this.userstory.epic) {
      this.userstoryService
        .getUserstorysFromProject(this.userstory.project)
        .subscribe(uss => {
          uss.forEach(us => {
            if (
              us.epicUserstory &&
              this.userstoryRef.isEqual(us.epicUserstory) &&
              !this.selectedUserstorys.includes(us)
            ) {
              this.selectedUserstorys.push(us);
              this.userstorys.push(us);
            } else if (
              !us.epic &&
              !this.userstorys.includes(us) &&
              !us.epicUserstory
            ) {
              this.userstorys.push(us);
            }
          });
        });
    }
  }

  onSubmit() {
    this.userstoryService.updateUserstory(this.userstory).then(userstory => {
      if (this.userstory.epic) {
        const userstoryRef = this.referenceService.getUserstoryReference(
          this.userstory.id
        );
        this.userstorys.forEach(us => {
          if (this.selectedUserstorys.includes(us)) {
            us.epicUserstory = userstoryRef;
            this.userstoryService.updateUserstory(us);
          } else {
            us.epicUserstory = null;
            this.userstoryService.updateUserstory(us);
          }
        });
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
}
