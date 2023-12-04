import { TestBed } from '@angular/core/testing';

import { RedirectIfAlreadyAuthenticatedService } from './redirect-if-already-authenticated.service';

describe('RedirectIfAlreadyAuthenticatedService', () => {
  let service: RedirectIfAlreadyAuthenticatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectIfAlreadyAuthenticatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
