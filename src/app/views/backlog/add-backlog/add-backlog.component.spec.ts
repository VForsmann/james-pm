import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBacklogComponent } from './add-backlog.component';

describe('AddBacklogComponent', () => {
  let component: AddBacklogComponent;
  let fixture: ComponentFixture<AddBacklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBacklogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
