import { TestBed } from '@angular/core/testing';

import { DatabeseService } from './databese.service';

describe('DatabeseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabeseService = TestBed.get(DatabeseService);
    expect(service).toBeTruthy();
  });
});
