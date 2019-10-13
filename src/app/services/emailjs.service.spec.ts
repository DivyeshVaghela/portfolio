import { TestBed } from '@angular/core/testing';

import { EmailjsService } from './emailjs.service';

describe('EmailjsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailjsService = TestBed.get(EmailjsService);
    expect(service).toBeTruthy();
  });
});
