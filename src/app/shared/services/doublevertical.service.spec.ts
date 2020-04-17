import { TestBed } from '@angular/core/testing';

import { DoubleverticalService } from './doublevertical.service';

describe('DoubleverticalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoubleverticalService = TestBed.get(DoubleverticalService);
    expect(service).toBeTruthy();
  });
});
