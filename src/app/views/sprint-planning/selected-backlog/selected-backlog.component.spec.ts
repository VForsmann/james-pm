import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBacklogComponent } from './selected-backlog.component';

describe('SelectedBacklogComponent', () => {
  let component: SelectedBacklogComponent;
  let fixture: ComponentFixture<SelectedBacklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedBacklogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
