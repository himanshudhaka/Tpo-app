import { TestBed } from '@angular/core/testing';

import { StdAuthService } from './std-auth.service';

describe('StdAuthService', () => {
  let service: StdAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StdAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
