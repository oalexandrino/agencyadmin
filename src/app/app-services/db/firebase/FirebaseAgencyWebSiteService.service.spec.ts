import { TestBed } from '@angular/core/testing';

import { FirebaseAgencyWebSiteService } from './FirebaseAgencyWebSiteService.service';

describe('AgencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseAgencyWebSiteService = TestBed.get(FirebaseAgencyWebSiteService);
    expect(service).toBeTruthy();
  });
});
