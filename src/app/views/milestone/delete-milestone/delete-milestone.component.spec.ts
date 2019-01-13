import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMilestoneComponent } from './delete-milestone.component';

describe('DeleteMilestoneComponent', () => {
  let component: DeleteMilestoneComponent;
  let fixture: ComponentFixture<DeleteMilestoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMilestoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
