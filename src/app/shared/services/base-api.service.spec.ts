import {TestBed} from '@angular/core/testing';

import {BaseAPIService} from './base-api.service';

describe('BaseAPIService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: BaseAPIService = TestBed.get(BaseAPIService);
        expect(service).toBeTruthy();
    });
});
