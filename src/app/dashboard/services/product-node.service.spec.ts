import { TestBed } from '@angular/core/testing';

import { ProductNodeService } from './product-node.service';

describe('ProductNodeService', () => {
  let service: ProductNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
