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

  it('should have exportSave method', () => {
    expect(service.exportSave).toBeDefined();
  });

  it('should have importSave method', () => {
    expect(service.importSave).toBeDefined();
  });

  it('should have validateSave method', () => {
    expect(service.validateSave).toBeDefined();
  });
});
