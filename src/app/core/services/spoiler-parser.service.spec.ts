import { TestBed } from '@angular/core/testing';
import { SpoilerParserService } from './spoiler-parser.service';

describe('SpoilerParserService', () => {
  let service: SpoilerParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpoilerParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have parseSpoiler method', () => {
    expect(service.parseSpoiler).toBeDefined();
  });

  it('should have validateStructure method', () => {
    expect(service.validateStructure).toBeDefined();
  });
});
