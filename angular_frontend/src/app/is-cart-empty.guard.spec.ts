import { TestBed } from '@angular/core/testing';

import { IsCartEmptyGuard } from './is-cart-empty.guard';

describe('IsCartEmptyGuard', () => {
  let guard: IsCartEmptyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsCartEmptyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
