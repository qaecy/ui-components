import { TestBed } from '@angular/core/testing';

import { CueUiService } from './cue-ui.service';

describe('CueUiService', () => {
  let service: CueUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CueUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
