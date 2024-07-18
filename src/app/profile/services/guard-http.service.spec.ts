import { TestBed } from '@angular/core/testing';

import { GuardHttpService } from './guard-http.service';

describe('GuardHttpService', () => {
  let service: GuardHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
