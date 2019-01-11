import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserstoryComponent } from './add-userstory.component';

describe('AddUserstoryComponent', () => {
  let component: AddUserstoryComponent;
  let fixture: ComponentFixture<AddUserstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
