import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent implements OnInit {

  @Input() modalInput;

  projectName: string = '';

  constructor(public activeModal: NgbActiveModal, private projectService: ProjectService) { }

  ngOnInit() {
    console.log(this.modalInput)
  }

  onSubmit(){
    this.projectService.deleteProject(this.modalInput.id);
    this.activeModal.close();
  }
}
