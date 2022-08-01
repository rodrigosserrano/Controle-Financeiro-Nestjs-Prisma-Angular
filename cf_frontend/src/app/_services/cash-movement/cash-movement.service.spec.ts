import { TestBed } from '@angular/core/testing';

import { CashMovementService } from './cash-movement.service';

describe('CashMovementService', () => {
  let service: CashMovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashMovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
