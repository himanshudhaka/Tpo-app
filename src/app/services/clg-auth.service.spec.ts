import { TestBed } from '@angular/core/testing';

import { ClgAuthService } from './clg-auth.service';

describe('ClgAuthService', () => {
  let service: ClgAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClgAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
