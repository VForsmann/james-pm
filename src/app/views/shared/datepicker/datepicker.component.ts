import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [NgbDatepickerConfig]
})
export class DatepickerComponent implements OnInit {
  model: NgbDateStruct;
  datePicked = false;
  @Input() title: string;
  @Output() save = new EventEmitter<NgbDateStruct>();


  constructor(config: NgbDatepickerConfig) {
    const now = new Date();
    config.minDate = { year: 1920, month: 1, day: 1 };
    config.maxDate = { year: now.getFullYear(), month: 12, day: 31 };
  }


  ngOnInit() {
  }

  initDate(value: NgbDateStruct) {
    this.model = value;
    this.datePicked = true;
  }

  myFunc(event: NgbDateStruct) {
    this.model = event;
    this.datePicked = true;
    this.save.emit(this.model);
  }

  openOrDone() {
    return this.datePicked ? 'done form-control' : 'open form-control';
  }

}
