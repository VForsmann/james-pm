import { TestBed } from '@angular/core/testing';

import { PlanningPokerService } from './planning-poker.service';

describe('PlanningPokerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanningPokerService = TestBed.get(PlanningPokerService);
    expect(service).toBeTruthy();
  });
});
