import { TestBed } from '@angular/core/testing';

import { ValidateTokenInterceptor } from './validate-token.interceptor';

describe('ValidateTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ValidateTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ValidateTokenInterceptor = TestBed.inject(ValidateTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
