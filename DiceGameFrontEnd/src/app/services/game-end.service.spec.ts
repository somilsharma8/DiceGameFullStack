import { TestBed } from '@angular/core/testing';

import { GameEndService } from './game-end.service';

describe('GameEndService', () => {
  let service: GameEndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameEndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
