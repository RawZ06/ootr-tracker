import { TestBed } from '@angular/core/testing';
import { SaveLoadService } from './save-load.service';

describe('SaveLoadService', () => {
  let service: SaveLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have exportJSON method', () => {
    expect(service.exportJSON).toBeDefined();
  });

  it('should have importJSON method', () => {
    expect(service.importJSON).toBeDefined();
  });

  it('should have validateChecksum method', () => {
    expect(service.validateChecksum).toBeDefined();
  });
});
