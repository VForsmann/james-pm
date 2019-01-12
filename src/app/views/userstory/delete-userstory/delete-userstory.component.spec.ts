import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserstoryComponent } from './delete-userstory.component';

describe('DeleteUserstoryComponent', () => {
  let component: DeleteUserstoryComponent;
  let fixture: ComponentFixture<DeleteUserstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUserstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
