import { TestBed, inject } from '@angular/core/testing';

import { FunctionService } from './function.service';

describe('FunctionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunctionService]
    });
  });

  it('should be created', inject([FunctionService], (service: FunctionService) => {
    expect(service).toBeTruthy();
  }));
});
