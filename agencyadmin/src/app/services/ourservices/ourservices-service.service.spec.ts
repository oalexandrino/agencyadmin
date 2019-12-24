import { TestBed } from '@angular/core/testing';

import { OurServicesService } from './ourservices-service.service';

describe('OurservicesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OurServicesService = TestBed.get(OurServicesService);
    expect(service).toBeTruthy();
  });
});
