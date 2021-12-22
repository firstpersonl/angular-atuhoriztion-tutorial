import { TestBed } from '@angular/core/testing';

import { RouterCanActiveFilterService } from './router-can-active-filter.service';

describe('RouterCanActiveFilterService', () => {
  let service: RouterCanActiveFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterCanActiveFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
