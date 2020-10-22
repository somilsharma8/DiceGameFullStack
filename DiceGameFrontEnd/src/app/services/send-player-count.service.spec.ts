import { TestBed } from '@angular/core/testing';

import { SendPlayerCountService } from './send-player-count.service';

describe('SendPlayerCountService', () => {
  let service: SendPlayerCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendPlayerCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
