import { TestBed } from '@angular/core/testing';

import { ClgGuardGuard } from './clg-guard.guard';

describe('ClgGuardGuard', () => {
  let guard: ClgGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClgGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
