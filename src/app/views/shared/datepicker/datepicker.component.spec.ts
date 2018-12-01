import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ExpandOperator } from 'rxjs/internal/operators/expand';

describe('DatepickerComponent', () => {
    let datepickerComponent: DatepickerComponent;

    beforeEach(() => {
      datepickerComponent = new DatepickerComponent(new NgbDatepickerConfig());

    });

    it('should init date picker value', () => {
        const datepickerDate = new Date();
        datepickerComponent.initDate({
          year: datepickerDate.getFullYear(),
          month: datepickerDate.getMonth(),
          day: datepickerDate.getDate()
        });
        expect(datepickerComponent.model.year).toBe(datepickerDate.getFullYear());
        expect(datepickerComponent.model.month).toBe(datepickerDate.getMonth());
        expect(datepickerComponent.model.day).toBe(datepickerDate.getDate());
        expect(datepickerComponent.datePicked).toBe(true);

    });


    it('should done form-control', () => {
        datepickerComponent.datePicked = true;
        const result = datepickerComponent.openOrDone();
        expect(result).toBe('done form-control');

    });

    it('should open form-control', () => {
        datepickerComponent.datePicked = false;
        const result = datepickerComponent.openOrDone();
        expect(result).toBe('open form-control');

    });
});
