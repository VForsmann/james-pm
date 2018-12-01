import { TestBed } from '@angular/core/testing';

import { BacklogService } from './backlog.service';

describe('BacklogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BacklogService = TestBed.get(BacklogService);
    expect(service).toBeTruthy();
  });
});
