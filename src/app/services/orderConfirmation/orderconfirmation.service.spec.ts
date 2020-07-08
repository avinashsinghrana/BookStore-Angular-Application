import { TestBed } from '@angular/core/testing';

import { OrderconfirmationService } from './orderconfirmation.service';

describe('OrderconfirmationService', () => {
  let service: OrderconfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderconfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
