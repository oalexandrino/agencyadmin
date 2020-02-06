import { TestBed } from '@angular/core/testing';

import { MongoAgencyWebSiteService } from './MongoAgencyWebSiteService.service';

describe('MongoAgencyWebSiteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MongoAgencyWebSiteService = TestBed.get(MongoAgencyWebSiteService);
    expect(service).toBeTruthy();
  });
});
