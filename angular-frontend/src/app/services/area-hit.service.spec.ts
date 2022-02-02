import { TestBed } from '@angular/core/testing';

import { AreaHitService } from './area-hit.service';

describe('AreaHitService', () => {
  let service: AreaHitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaHitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
