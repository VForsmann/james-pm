import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserstoryComponent } from './edit-userstory.component';

describe('EditUserstoryComponent', () => {
  let component: EditUserstoryComponent;
  let fixture: ComponentFixture<EditUserstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
