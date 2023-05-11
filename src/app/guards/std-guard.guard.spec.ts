import { TestBed } from '@angular/core/testing';

import { StdGuardGuard } from './std-guard.guard';

describe('StdGuardGuard', () => {
  let guard: StdGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StdGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
