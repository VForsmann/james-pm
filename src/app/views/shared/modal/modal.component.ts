import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() component: Component;
  @Input() payload: any;
  @Output() modalResult = new EventEmitter<any>();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  async open() {
    try {
      const modalRef = await this.modalService.open(this.component);
      if (this.payload) { modalRef.componentInstance.modalInput = this.payload; }
      const result = await modalRef.result;
      this.modalResult.emit(result);
    } catch (err) {
      console.warn(err);
     }
  }
}
