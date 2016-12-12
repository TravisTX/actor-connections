/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MoviedbService } from './moviedb.service';

describe('MoviedbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviedbService]
    });
  });

  it('should ...', inject([MoviedbService], (service: MoviedbService) => {
    expect(service).toBeTruthy();
  }));
});
